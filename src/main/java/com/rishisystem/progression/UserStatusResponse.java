package com.rishisystem.progression;

public record UserStatusResponse(
        int level,
        String rank,
        int txp,
        int nextLevelXP,
        int streak,
        int score,
        String tier,
        int progressPercentage,
        String rankColor,
        String levelTitle
) {
}
