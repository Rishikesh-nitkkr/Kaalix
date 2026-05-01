package com.rishisystem.reels;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.util.List;

public final class ReelDtos {
    private ReelDtos() {}

    public record ReelAnalyzeRequest(@NotBlank String userId, @NotBlank String platform, @NotBlank String url,
                                     String caption, String notes, String title) {}

    public record ReelResponse(Long id, String userId, String platform, String url, String title, String caption,
                               List<String> keywords, String category, String summary, String lesson,
                               String actionItem, String priority, boolean shouldUpdateTimetable,
                               Instant createdAt) {}
}
