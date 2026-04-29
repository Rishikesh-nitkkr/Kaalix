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
        return 100 + (Math.max(1, Math.min(100, level)) * 20);
    }

    public int calculateDailyTXP(DailyLogRequest actions) {
        int txp = 0;
        txp += Math.floor(actions.studyHours()) * 20;
        txp += actions.dsaCount() * 15;
        if (actions.workout()) {
            txp += 15;
        }
        if (actions.wakeOnTime()) {
            txp += 10;
        }
        if (actions.noDistractions()) {
            txp += 10;
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
        return txp;
    }

    public int calculateScore(int completedTasks, int totalTasks) {
        if (totalTasks <= 0) {
            return 0;
        }
        int safeCompleted = Math.max(0, Math.min(completedTasks, totalTasks));
        return (int) Math.round((safeCompleted * 100.0) / totalTasks);
    }

    public Rank calculateRank(int score, int level, int streak) {
        if (level >= 99 && score >= 95 && streak >= 30) {
            return Rank.ELITE_RANKER;
        }
        if (score >= 96) {
            return Rank.SSS;
        }
        if (score >= 92) {
            return Rank.SS;
        }
        if (score >= 85) {
            return Rank.S;
        }
        if (score >= 75) {
            return Rank.A;
        }
        if (score >= 65) {
            return Rank.B;
        }
        if (score >= 50) {
            return Rank.C;
        }
        if (score >= 30) {
            return Rank.D;
        }
        return Rank.E;
    }

    @Transactional
    public UserStatusResponse submitDailyLog(DailyLogRequest request) {
        UserProgress user = getOrCreateUser(request.userKey(), request.name());
        LocalDate date = request.date() == null ? LocalDate.now() : request.date();
        int streak = updateStreak(user, date);
        int streakBonus = streakBonus(streak);
        int dailyTxp = calculateDailyTXP(request) + streakBonus;
        int score = calculateScore(request.tasksCompleted(), request.totalTasks());

        applyLevelUpdate(user, dailyTxp);
        user.setStreak(streak);
        user.setRank(calculateRank(score, user.getLevel(), streak));
        user.setLastActiveDate(date);
        user = userRepository.save(user);

        DailyLog log = dailyLogRepository.findByUserUserKeyAndDate(user.getUserKey(), date).orElseGet(DailyLog::new);
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
        dailyLogRepository.save(log);

        return toStatus(user, score);
    }

    @Transactional(readOnly = true)
    public UserStatusResponse getUserStatus(String userKey) {
        UserProgress user = userRepository.findByUserKey(userKey).orElseGet(() -> {
            UserProgress created = new UserProgress();
            created.setUserKey(userKey);
            created.setName("Hunter");
            created.setNextLevelXp(calculateNextLevelXP(1));
            created.setRank(Rank.E);
            return userRepository.save(created);
        });
        int score = dailyLogRepository.findByUserUserKeyAndDate(userKey, LocalDate.now()).map(DailyLog::getScore).orElse(0);
        return toStatus(user, score);
    }

    @Transactional
    public UserStatusResponse resetUser(ResetUserRequest request) {
        UserProgress user = getOrCreateUser(request.userKey(), request.name());
        user.setLevel(1);
        user.setTxp(0);
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

    private void applyLevelUpdate(UserProgress user, int earnedTxp) {
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

    private UserStatusResponse toStatus(UserProgress user, int score) {
        int nextLevelXp = Math.max(1, user.getNextLevelXp());
        int progress = (int) Math.round((user.getTxp() * 100.0) / nextLevelXp);
        return new UserStatusResponse(
                user.getLevel(),
                user.getRank().name(),
                user.getTxp(),
                nextLevelXp,
                user.getStreak(),
                score,
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
