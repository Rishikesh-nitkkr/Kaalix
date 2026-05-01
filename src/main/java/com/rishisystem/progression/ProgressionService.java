package com.rishisystem.progression;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ProgressionService {

    private final UserProgressRepository userRepository;
    private final DailyLogRepository dailyLogRepository;

    public ProgressionService(UserProgressRepository userRepository, DailyLogRepository dailyLogRepository) {
        this.userRepository = userRepository;
        this.dailyLogRepository = dailyLogRepository;
    }

    public int calculateNextLevelXP(int level) {
        int safeLevel = Math.max(1, Math.min(100, level));
        return 100 + (safeLevel * 25) + (safeLevel * safeLevel * 2);
    }

    public int calculateDailyTXP(DailyLogRequest actions) {
        int txp = 0;
        txp += calculateTXP("STUDY", Math.floor(actions.studyHours() * 60 / 25.0), actions.priority(), actions.focus(), actions.completion(), 0);
        txp += calculateTXP("DSA", actions.dsaCount(), actions.priority(), actions.focus(), actions.completion(), 0);
        if (actions.workout()) {
            txp += calculateTXP("WORKOUT", 1, actions.priority(), actions.focus(), actions.completion(), 0);
        }
        if (actions.wakeOnTime()) {
            txp += calculateTXP("WAKE_ON_TIME", 1, actions.priority(), actions.focus(), actions.completion(), 0);
        }
        if (actions.noDistractions()) {
            txp += calculateTXP("JOURNAL", 1, "LOW", "NORMAL", "COMPLETED", 0);
        }
        if (actions.wastedTime() > 2) {
            txp -= 20;
        }
        if (actions.skipStudy()) {
            txp -= 15;
        }
        if (actions.lateWake()) {
            txp -= 5;
        }
        if (actions.overthinkingAnger()) {
            txp -= 10;
        }
        return Math.max(-60, txp);
    }

    public int calculateTXP(String actionType, double quantity, String priority, String focus, String completion, int streak) {
        double base = baseValue(actionType) * Math.max(0, quantity);
        return (int) Math.round(applyMultipliers(base, priority, focus, completion, streak));
    }

    public double applyMultipliers(double base, String priority, String focus, String completion, int streak) {
        return base * priorityMultiplier(priority) * focusMultiplier(focus) * completionMultiplier(completion) * streakMultiplier(streak);
    }

    public int calculateScore(int completedTasks, int totalTasks) {
        if (totalTasks <= 0) {
            return 0;
        }
        int safeCompleted = Math.max(0, Math.min(completedTasks, totalTasks));
        return (int) Math.round((safeCompleted * 100.0) / totalTasks);
    }

    public Rank calculateRank(int score, int level, int streak) {
        int safeScore = Math.max(0, Math.min(100, score));
        Rank base;
        if (level >= 99 && safeScore >= 95 && streak >= 30) {
            base = Rank.ELITE_RANKER;
        } else if (safeScore >= 96) {
            base = Rank.SSS;
        } else if (safeScore >= 92) {
            base = Rank.SS;
        } else if (safeScore >= 85) {
            base = Rank.S;
        } else if (safeScore >= 75) {
            base = Rank.A;
        } else if (safeScore >= 65) {
            base = Rank.B;
        } else if (safeScore >= 50) {
            base = Rank.C;
        } else if (safeScore >= 30) {
            base = Rank.D;
        } else {
            base = Rank.E;
        }

        if (streak >= 5) {
            base = upgradeRank(base);
        } else if (streak < 2) {
            base = decayRank(base);
        }
        return capRankForLevel(base, level);
    }

    @Transactional
    public UserStatusResponse submitDailyLog(DailyLogRequest request) {
        UserProgress user = getOrCreateUser(request.userKey(), request.name());
        LocalDate date = request.date() == null ? LocalDate.now() : request.date();
        resetDailyIfNeeded(user, date);
        int streak = updateStreak(user, date);
        int streakBonus = streakBonus(streak);
        int rawDailyTxp = calculateDailyTXP(request) + streakBonus;
        int score = calculateScore(request.tasksCompleted(), request.totalTasks());
        DailyLog log = dailyLogRepository.findByUserUserKeyAndDate(user.getUserKey(), date).orElseGet(DailyLog::new);
        int previousTxpForDate = log.getId() == null ? 0 : log.getTxpEarned();
        int dailyTxp = clampDailyTXP(rawDailyTxp, user.getLevel());
        int txpDelta = dailyTxp - previousTxpForDate;

        updateDailyTXP(user, txpDelta, date);
        updateTotalTXP(user, txpDelta);
        updateLevel(user, txpDelta);
        user.setStreak(streak);
        user.setRank(calculateRank(score, user.getLevel(), streak));
        user.setLastActiveDate(date);
        user = userRepository.save(user);

        log.setUser(user);
        log.setDate(date);
        log.setStudyHours(request.studyHours());
        log.setDsaCount(request.dsaCount());
        log.setWorkout(request.workout());
        log.setWakeOnTime(request.wakeOnTime());
        log.setNoDistractions(request.noDistractions());
        log.setSkipStudy(request.skipStudy());
        log.setLateWake(request.lateWake());
        log.setOverthinkingAnger(request.overthinkingAnger());
        log.setWastedTime(request.wastedTime());
        log.setTasksCompleted(Math.max(0, request.tasksCompleted()));
        log.setTotalTasks(Math.max(0, request.totalTasks()));
        log.setScore(score);
        log.setTxpEarned(dailyTxp);
        log.setDailyTxp(dailyTxp);
        log.setActionsData(request.actionsData());
        dailyLogRepository.save(log);

        return toStatus(user, score);
    }

    @Transactional
    public UserStatusResponse rewardTxp(RewardTxpRequest request) {
        UserProgress user = getOrCreateUser(request.userKey(), request.name());
        LocalDate today = LocalDate.now();
        resetDailyIfNeeded(user, today);
        int calculated = request.actionType() == null || request.actionType().isBlank()
                ? Math.max(0, request.amount())
                : calculateTXP(request.actionType(), Math.max(1, request.amount()), request.priority(), request.focus(), request.completion(), user.getStreak());
        int reward = Math.max(0, calculated);
        int allowed = Math.max(0, maxDailyTXP(user.getLevel()) - user.getDailyTxp());
        int applied = Math.min(reward, allowed);
        updateDailyTXP(user, applied, today);
        updateTotalTXP(user, applied);
        updateLevel(user, applied);
        user.setLastActiveDate(today);
        user = userRepository.save(user);
        int score = dailyLogRepository.findByUserUserKeyAndDate(user.getUserKey(), today).map(DailyLog::getScore).orElse(0);
        return toStatus(user, score);
    }

    @Transactional
    public UserStatusResponse getUserStatus(String userKey) {
        UserProgress user = userRepository.findByUserKey(userKey).orElseGet(() -> {
            UserProgress created = new UserProgress();
            created.setUserKey(userKey);
            created.setName("Hunter");
            created.setNextLevelXp(calculateNextLevelXP(1));
            created.setRank(Rank.E);
            return userRepository.save(created);
        });
        resetDailyIfNeeded(user, LocalDate.now());
        user = userRepository.save(user);
        int score = dailyLogRepository.findByUserUserKeyAndDate(userKey, LocalDate.now()).map(DailyLog::getScore).orElse(0);
        return toStatus(user, score);
    }

    @Transactional
    public UserStatusResponse resetUser(ResetUserRequest request) {
        UserProgress user = getOrCreateUser(request.userKey(), request.name());
        user.setLevel(1);
        user.setTxp(0);
        user.setTotalTxp(0);
        user.setDailyTxp(0);
        user.setNextLevelXp(calculateNextLevelXP(1));
        user.setRank(Rank.E);
        user.setStreak(0);
        user.setLastActiveDate(null);
        user.setRankSeedLocked(false);
        dailyLogRepository.findAll().stream()
                .filter(log -> log.getUser().getId().equals(user.getId()))
                .forEach(dailyLogRepository::delete);
        return toStatus(userRepository.save(user), 0);
    }

    private UserProgress getOrCreateUser(String userKey, String name) {
        return userRepository.findByUserKey(userKey).orElseGet(() -> {
            UserProgress user = new UserProgress();
            user.setUserKey(userKey);
            user.setName((name == null || name.isBlank()) ? "Hunter" : name.trim());
            user.setNextLevelXp(calculateNextLevelXP(1));
            user.setRank(Rank.E);
            return userRepository.save(user);
        });
    }

    private int updateStreak(UserProgress user, LocalDate date) {
        LocalDate last = user.getLastActiveDate();
        if (last == null) {
            return 1;
        }
        if (last.equals(date)) {
            return Math.max(1, user.getStreak());
        }
        if (last.plusDays(1).equals(date)) {
            return user.getStreak() + 1;
        }
        return 1;
    }

    private int streakBonus(int streak) {
        if (streak > 0 && streak % 30 == 0) {
            return 200;
        }
        if (streak > 0 && streak % 7 == 0) {
            return 50;
        }
        if (streak > 0 && streak % 3 == 0) {
            return 20;
        }
        return 0;
    }

    private void updateDailyTXP(UserProgress user, int earnedTxp, LocalDate date) {
        resetDailyIfNeeded(user, date);
        int updated = user.getDailyTxp() + earnedTxp;
        user.setDailyTxp(clampNumber(updated, -60, maxDailyTXP(user.getLevel())));
    }

    private void updateTotalTXP(UserProgress user, int earnedTxp) {
        user.setTotalTxp(Math.max(0, user.getTotalTxp() + earnedTxp));
    }

    private void updateLevel(UserProgress user, int earnedTxp) {
        int level = Math.max(1, Math.min(100, user.getLevel()));
        int txp = Math.max(0, user.getTxp() + earnedTxp);
        int nextLevelXp = calculateNextLevelXP(level);
        while (level < 100 && txp >= nextLevelXp) {
            txp -= nextLevelXp;
            level++;
            nextLevelXp = calculateNextLevelXP(level);
        }
        if (level >= 100) {
            level = 100;
            txp = Math.min(txp, nextLevelXp);
        }
        user.setLevel(level);
        user.setTxp(txp);
        user.setNextLevelXp(nextLevelXp);
    }

    private int maxDailyTXP(int level) {
        return 100 + (Math.max(1, Math.min(100, level)) * 2);
    }

    private int clampDailyTXP(int value, int level) {
        return clampNumber(value, -60, maxDailyTXP(level));
    }

    private int clampNumber(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }

    private void resetDailyIfNeeded(UserProgress user, LocalDate date) {
        LocalDate last = user.getLastActiveDate();
        if (last == null || !last.equals(date)) {
            user.setDailyTxp(0);
        }
        if (last != null && last.plusDays(1).isBefore(date)) {
            user.setStreak(0);
        }
    }

    private Rank capRankForLevel(Rank rank, int level) {
        Rank maxRank;
        if (level < 11) {
            maxRank = Rank.D;
        } else if (level < 26) {
            maxRank = Rank.C;
        } else if (level < 51) {
            maxRank = Rank.B;
        } else if (level < 76) {
            maxRank = Rank.A;
        } else if (level < 90) {
            maxRank = Rank.S;
        } else if (level < 99) {
            maxRank = Rank.SS;
        } else {
            maxRank = Rank.ELITE_RANKER;
        }
        return rank.ordinal() > maxRank.ordinal() ? maxRank : rank;
    }

    private Rank upgradeRank(Rank rank) {
        int nextOrdinal = Math.min(Rank.ELITE_RANKER.ordinal(), rank.ordinal() + 1);
        return Rank.values()[nextOrdinal];
    }

    private Rank decayRank(Rank rank) {
        int nextOrdinal = Math.max(Rank.E.ordinal(), rank.ordinal() - 1);
        return Rank.values()[nextOrdinal];
    }

    private int baseValue(String actionType) {
        String normalized = normalize(actionType);
        return switch (normalized) {
            case "STUDY" -> 10;
            case "CODING" -> 12;
            case "DSA", "DSA_PROBLEM" -> 15;
            case "WORKOUT" -> 15;
            case "READING" -> 8;
            case "JOURNAL" -> 6;
            case "WAKE_ON_TIME", "WAKE" -> 10;
            default -> 10;
        };
    }

    private double priorityMultiplier(String priority) {
        return switch (normalize(priority)) {
            case "LOW" -> 0.7;
            case "HIGH" -> 1.3;
            case "CRITICAL" -> 1.6;
            default -> 1.0;
        };
    }

    private double focusMultiplier(String focus) {
        return switch (normalize(focus)) {
            case "DISTRACTED" -> 0.6;
            case "DEEP" -> 1.3;
            case "FLOW" -> 1.5;
            default -> 1.0;
        };
    }

    private double completionMultiplier(String completion) {
        return switch (normalize(completion)) {
            case "NOT_DONE" -> 0.0;
            case "PARTIAL" -> 0.5;
            case "EXCEEDED" -> 1.2;
            default -> 1.0;
        };
    }

    private double streakMultiplier(int streak) {
        if (streak >= 30) {
            return 1.25;
        }
        if (streak >= 15) {
            return 1.15;
        }
        if (streak >= 7) {
            return 1.1;
        }
        if (streak >= 3) {
            return 1.05;
        }
        return 1.0;
    }

    private String normalize(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        return value.trim().toUpperCase().replace('-', '_').replace(' ', '_');
    }

    private UserStatusResponse toStatus(UserProgress user, int score) {
        int nextLevelXp = Math.max(1, user.getNextLevelXp());
        int progress = (int) Math.round((user.getTxp() * 100.0) / nextLevelXp);
        return new UserStatusResponse(
                user.getLevel(),
                user.getRank().name(),
                user.getTxp(),
                user.getDailyTxp(),
                user.getTotalTxp(),
                nextLevelXp,
                nextLevelXp,
                user.getStreak(),
                score,
                Math.max(0, Math.min(100, progress)),
                tierForLevel(user.getLevel()),
                Math.max(0, Math.min(100, progress)),
                user.getRank().color(),
                levelTitle(user.getLevel())
        );
    }

    private String tierForLevel(int level) {
        if (level <= 10) {
            return "Beginner";
        }
        if (level <= 25) {
            return "Builder";
        }
        if (level <= 50) {
            return "Performer";
        }
        if (level <= 75) {
            return "Elite";
        }
        return "Monarch";
    }

    private String levelTitle(int level) {
        return tierForLevel(level) + " LVL " + level;
    }
}
