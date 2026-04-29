package com.rishisystem.model;

import java.util.List;

public record ReelAnalysisResponse(
        String reelLink,
        String platform,
        String titleOrCaption,
        List<String> keywords,
        String category,
        String meaning,
        String usefulness,
        String summary,
        String lessonLearned,
        String actionItem,
        String avoid,
        String priorityLevel,
        boolean affectTimetable,
        boolean productive,
        String productiveLabel,
        String suggestedTaskTitle,
        int suggestedDurationMinutes,
        String suggestedTimeWindow,
        String rationale
) {
}
