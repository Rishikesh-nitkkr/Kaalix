package com.rishisystem.progression;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record DailyLogRequest(
        @NotBlank String userKey,
        String name,
        LocalDate date,
        @Min(0) double studyHours,
        @Min(0) int dsaCount,
        boolean workout,
        boolean wakeOnTime,
        boolean noDistractions,
        boolean skipStudy,
        boolean lateWake,
        boolean overthinkingAnger,
        @Min(0) double wastedTime,
        @Min(0) int tasksCompleted,
        @Min(0) int totalTasks
) {
}
