package com.rishisystem.progression;

public record UserStatusResponse(
        int level,
        String rank,
        int txp,
        int dailyTXP,
        int totalTXP,
        int nextLevelXP,
        int nextLevelTXP,
        int streak,
        int score,
        int progress,
        String tier,
        int progressPercentage,
        String rankColor,
        String levelTitle
) {
}
