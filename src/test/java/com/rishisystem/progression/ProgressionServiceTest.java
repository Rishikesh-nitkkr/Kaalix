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
        DailyLogRequest request = new DailyLogRequest("level-up", "Hunter", LocalDate.now(), 8, 4, true, true, true, false, false, false, 0, 10, 10);

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.level()).isGreaterThan(1);
        assertThat(status.txp()).isLessThan(status.nextLevelXP());
        assertThat(status.score()).isEqualTo(100);
    }

    @Test
    void mapsRankFromPerformanceScore() {
        assertThat(progressionService.calculateRank(20, 1, 1)).isEqualTo(Rank.E);
        assertThat(progressionService.calculateRank(78, 27, 5)).isEqualTo(Rank.A);
        assertThat(progressionService.calculateRank(94, 70, 9)).isEqualTo(Rank.SS);
        assertThat(progressionService.calculateRank(99, 99, 30)).isEqualTo(Rank.ELITE_RANKER);
    }

    @Test
    void handlesNegativeTxpAndZeroTasks() {
        DailyLogRequest request = new DailyLogRequest("negative", "Hunter", LocalDate.now(), 0, 0, false, false, false, true, true, true, 3, 0, 0);

        UserStatusResponse status = progressionService.submitDailyLog(request);

        assertThat(status.txp()).isZero();
        assertThat(status.score()).isZero();
        assertThat(status.rank()).isEqualTo("E");
    }

    @Test
    void incrementsAndResetsStreak() {
        progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 1), 1, 1, true, true, true, false, false, false, 0, 3, 3));
        UserStatusResponse dayTwo = progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 2), 1, 1, true, true, true, false, false, false, 0, 3, 3));
        UserStatusResponse broken = progressionService.submitDailyLog(new DailyLogRequest("streak", "Hunter", LocalDate.of(2026, 4, 5), 1, 1, true, true, true, false, false, false, 0, 3, 3));

        assertThat(dayTwo.streak()).isEqualTo(2);
        assertThat(broken.streak()).isEqualTo(1);
    }
}
