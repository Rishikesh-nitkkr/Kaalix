package com.rishisystem.progression;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record RewardTxpRequest(
        @NotBlank String userKey,
        String name,
        @Min(0) int amount,
        String reason,
        String actionType,
        String priority,
        String focus,
        String completion
) {
}
