package com.rishisystem.progression;

import jakarta.validation.constraints.NotBlank;

public record ResetUserRequest(
        @NotBlank String userKey,
        String name
) {
}
