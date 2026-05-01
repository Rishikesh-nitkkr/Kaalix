package com.rishisystem.progression;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:kaalix-test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class ProgressionServiceTest {

    @Autowired
    ProgressionService progressionService;

    @Autowired
    UserProgressRepository userRepository;

    @Autowired
    DailyLogRepository dailyLogRepository;

    @BeforeEach
    void clean() {
        dailyLogRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void calculatesLevelUpWithCarryForward() {
        UserProgress user = new UserProgress();
        user.setUserKey("level-up");
        user.setName("Hunter");
        user.setLevel(1);
        user.setTxp(100);
        user.setNextLevelXp(progressionService.calculateNextLevelXP(1));
        userRepository.save(user);

        DailyLogRequest request = new DailyLogRequest("level-up", "Hunter", LocalDate.now(), 1, 2, false, false, false, false, false, false, 0, 10, 10, "MEDIUM", "NORMAL", "COMPLETED", "{}");

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.level()).isEqualTo(2);
        assertThat(status.txp()).isLessThan(status.nextLevelXP());
        assertThat(status.score()).isEqualTo(100);
    }

    @Test
    void mapsRankFromPerformanceScore() {
        assertThat(progressionService.calculateRank(20, 1, 1)).isEqualTo(Rank.E);
        assertThat(progressionService.calculateRank(78, 27, 5)).isEqualTo(Rank.B);
        assertThat(progressionService.calculateRank(94, 70, 9)).isEqualTo(Rank.A);
        assertThat(progressionService.calculateRank(99, 99, 30)).isEqualTo(Rank.ELITE_RANKER);
    }

    @Test
    void levelUpCarriesForwardAfterExactFormulaRequirement() {
        UserProgress user = new UserProgress();
        user.setUserKey("carry-forward");
        user.setName("Hunter");
        user.setLevel(1);
        user.setTxp(100);
        user.setNextLevelXp(127);
        userRepository.save(user);

        DailyLogRequest request = new DailyLogRequest("carry-forward", "Hunter", LocalDate.now(), 1, 2, false, false, false, false, false, false, 0, 1, 1, "MEDIUM", "NORMAL", "COMPLETED", "{}");

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.level()).isEqualTo(2);
        assertThat(status.txp()).isEqualTo(23);
        assertThat(status.nextLevelXP()).isEqualTo(158);
        assertThat(status.totalTXP()).isEqualTo(50);
    }

    @Test
    void handlesMultipleLevelJumpsWithWhileLoop() {
        UserProgress user = new UserProgress();
        user.setUserKey("multi-level");
        user.setName("Hunter");
        user.setLevel(1);
        user.setTxp(300);
        user.setNextLevelXp(progressionService.calculateNextLevelXP(1));
        userRepository.save(user);

        DailyLogRequest request = new DailyLogRequest("multi-level", "Hunter", LocalDate.now(), 1, 2, false, false, false, false, false, false, 0, 10, 10, "MEDIUM", "NORMAL", "COMPLETED", "{}");

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.level()).isGreaterThan(2);
        assertThat(status.txp()).isLessThan(status.nextLevelXP());
    }

    @Test
    void resubmittingSameDailyLogDoesNotDoubleCountTxp() {
        DailyLogRequest request = new DailyLogRequest("idempotent-day", "Hunter", LocalDate.now(), 1, 1, false, false, false, false, false, false, 0, 1, 1, "MEDIUM", "NORMAL", "COMPLETED", "{}");

        UserStatusResponse first = progressionService.submitDailyLog(request);
        UserStatusResponse second = progressionService.submitDailyLog(request);

        assertThat(second.level()).isEqualTo(first.level());
        assertThat(second.txp()).isEqualTo(first.txp());
    }

    @Test
    void directRewardsUseSameCarryForwardLogic() {
        UserProgress user = new UserProgress();
        user.setUserKey("reward");
        user.setName("Hunter");
        user.setLevel(10);
        user.setTxp(500);
        user.setNextLevelXp(progressionService.calculateNextLevelXP(10));
        userRepository.save(user);

        UserStatusResponse second = progressionService.rewardTxp(new RewardTxpRequest("reward", "Hunter", 80, "Task complete", null, null, null, null));

        assertThat(second.level()).isEqualTo(11);
        assertThat(second.txp()).isEqualTo(30);
        assertThat(second.nextLevelXP()).isEqualTo(progressionService.calculateNextLevelXP(11));
        assertThat(second.dailyTXP()).isEqualTo(80);
    }

    @Test
    void handlesNegativeTxpAndZeroTasks() {
        DailyLogRequest request = new DailyLogRequest("negative", "Hunter", LocalDate.now(), 0, 0, false, false, false, true, true, true, 3, 0, 0, "LOW", "DISTRACTED", "NOT_DONE", "{}");

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.txp()).isZero();
        assertThat(status.score()).isZero();
        assertThat(status.rank()).isEqualTo("E");
    }

    @Test
    void incrementsAndResetsStreak() {
        progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 1), 1, 1, true, true, true, false, false, false, 0, 3, 3, "MEDIUM", "NORMAL", "COMPLETED", "{}"));
        UserStatusResponse dayTwo = progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 2), 1, 1, true, true, true, false, false, false, 0, 3, 3, "MEDIUM", "NORMAL", "COMPLETED", "{}"));
        UserStatusResponse broken = progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 5), 1, 1, true, true, true, false, false, false, 0, 3, 3, "MEDIUM", "NORMAL", "COMPLETED", "{}"));

        assertThat(dayTwo.streak()).isEqualTo(2);
        assertThat(broken.streak()).isEqualTo(1);
    }
}
