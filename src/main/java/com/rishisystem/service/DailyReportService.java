package com.rishisystem.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DailyReportService {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    public Map<String, Object> generate(Map<String, Object> state) {
        Map<String, Object> profile = mapAt(state, "profile");
        Map<String, Object> dailyLog = mapAt(state, "dailyLog");
        List<Map<String, Object>> studySessions = listAt(state, "studySessions");
        List<Map<String, Object>> reels = listAt(state, "reels");
        List<Map<String, Object>> timetable = listAt(state, "timetable");
        List<Map<String, Object>> socialLogs = listAt(state, "socialLogs");
        List<Map<String, Object>> emotionLogs = listAt(state, "emotionLogs");
        List<Map<String, Object>> wardrobeLogs = listAt(state, "wardrobeLogs");

        double studyHours = doubleAt(dailyLog, "studyHours");
        double codingHours = doubleAt(dailyLog, "codingHours");
        double exerciseMinutes = doubleAt(dailyLog, "exerciseMinutes");
        String mood = stringAt(dailyLog, "mood", "Calm");
        List<String> positives = splitEntries(stringAt(dailyLog, "positiveActions", ""));
        List<String> negatives = splitEntries(stringAt(dailyLog, "negativeActions", ""));
        List<Map<String, Object>> doneTasks = timetable.stream().filter(task -> "done".equalsIgnoreCase(stringAt(task, "status", ""))).toList();
        List<Map<String, Object>> pendingTasks = timetable.stream().filter(task -> "pending".equalsIgnoreCase(stringAt(task, "status", ""))).toList();
        List<Map<String, Object>> skippedTasks = timetable.stream().filter(task -> "skip".equalsIgnoreCase(stringAt(task, "status", ""))).toList();
        List<Map<String, Object>> productiveReels = reels.stream().filter(reel -> boolAt(reel, "productive")).toList();
        List<Map<String, Object>> distractingReels = reels.stream().filter(reel -> !boolAt(reel, "productive")).toList();

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("bestThing", buildBestThing(studyHours, codingHours, exerciseMinutes, doneTasks, productiveReels));
        report.put("worstThing", buildWorstThing(negatives, skippedTasks, distractingReels));
        report.put("missedToday", pendingTasks.isEmpty()
                ? "You cleared your key tasks. Keep the same standard tomorrow."
                : "Pending carryover: " + pendingTasks.stream().limit(3).map(task -> stringAt(task, "title", "Task")).collect(Collectors.joining(", ")));
        report.put("learnedToday", buildLearning(studySessions, productiveReels, socialLogs));
        report.put("moodDriver", buildMoodDriver(mood, emotionLogs, negatives, positives));
        report.put("positiveActions", buildPositiveActions(positives, doneTasks, productiveReels));
        report.put("negativeActions", buildNegativeActions(negatives, skippedTasks, distractingReels));
        report.put("improveTomorrow", buildImprovement(studyHours, codingHours, exerciseMinutes, pendingTasks, mood));
        report.put("foodSuggestion", exerciseMinutes >= 30
                ? "Keep recovery strong with protein, water, and a lighter late dinner."
                : "Stabilize energy with clean meals, more water, and less random snacking.");
        report.put("studySuggestion", studyHours + codingHours >= 3
                ? "Repeat today’s deep-work structure and finish with 20 minutes of revision."
                : "Start earlier tomorrow with one protected 90-minute study block before distractions build.");
        report.put("behaviorSuggestion", mood.toLowerCase(Locale.ENGLISH).contains("angry")
                ? "Slow the reaction cycle: pause, breathe, write one sentence, then respond."
                : "Keep protecting calm focus and avoid switching tasks too often.");
        report.put("outfitSuggestion", buildOutfitSuggestion(wardrobeLogs));
        report.put("entertainmentSuggestion", distractingReels.size() > productiveReels.size()
                ? "Use entertainment only after study and health blocks are complete, capped at 30 minutes."
                : "A controlled entertainment slot is fine after priorities are finished.");
        report.put("updatedTimetable", buildTomorrowTimetable(profile, dailyLog, timetable, productiveReels));
        report.put("jarvisClosing", "Tomorrow is won by protecting the first serious block of the day and keeping your standards high.");
        return report;
    }

    private String buildBestThing(double studyHours, double codingHours, double exerciseMinutes,
                                  List<Map<String, Object>> doneTasks, List<Map<String, Object>> productiveReels) {
        if (studyHours + codingHours >= 3) {
            return "You protected serious learning time and treated your future like a real priority.";
        }
        if (exerciseMinutes >= 30) {
            return "You invested in physical energy, which supports every other stat in the system.";
        }
        if (!doneTasks.isEmpty()) {
            return "You completed " + doneTasks.size() + " planned tasks instead of drifting through the day.";
        }
        if (!productiveReels.isEmpty()) {
            return "You turned content into useful insight instead of passive scrolling.";
        }
        return "You showed up and captured data, which is the first step toward control.";
    }

    private String buildWorstThing(List<String> negatives, List<Map<String, Object>> skippedTasks,
                                   List<Map<String, Object>> distractingReels) {
        if (!negatives.isEmpty()) {
            return "The biggest drag today was " + negatives.get(0) + ".";
        }
        if (!skippedTasks.isEmpty()) {
            return "You let planned tasks slip, especially " + stringAt(skippedTasks.get(0), "title", "a key task") + ".";
        }
        if (!distractingReels.isEmpty()) {
            return "Distraction content started taking attention that should have gone to recovery or deep work.";
        }
        return "There was no major collapse, but the day still needs sharper execution.";
    }

    private String buildLearning(List<Map<String, Object>> studySessions, List<Map<String, Object>> productiveReels,
                                 List<Map<String, Object>> socialLogs) {
        if (!productiveReels.isEmpty()) {
            return stringAt(productiveReels.get(productiveReels.size() - 1), "lessonLearned", "Convert insight into action quickly.");
        }
        if (!studySessions.isEmpty()) {
            Map<String, Object> lastSession = studySessions.get(studySessions.size() - 1);
            return "You reinforced " + stringAt(lastSession, "topic", stringAt(lastSession, "subject", "your study topic")) + " through focused practice.";
        }
        if (!socialLogs.isEmpty()) {
            return stringAt(socialLogs.get(socialLogs.size() - 1), "lesson", "Your environment shapes your standards more than you think.");
        }
        return "Small consistent actions shape identity more reliably than rare bursts of intensity.";
    }

    private String buildMoodDriver(String mood, List<Map<String, Object>> emotionLogs,
                                   List<String> negatives, List<String> positives) {
        if (!emotionLogs.isEmpty()) {
            Map<String, Object> latest = emotionLogs.get(emotionLogs.size() - 1);
            return "Your mood leaned " + mood + " and was influenced most by " + stringAt(latest, "trigger", "unclear triggers") + ".";
        }
        if (!negatives.isEmpty()) {
            return "Your mood leaned " + mood + " and was pulled down by " + negatives.get(0) + ".";
        }
        if (!positives.isEmpty()) {
            return "Your mood leaned " + mood + " and improved through " + positives.get(0) + ".";
        }
        return "Your mood leaned " + mood + ". Keep logging triggers so patterns become easier to manage.";
    }

    private List<String> buildPositiveActions(List<String> positives, List<Map<String, Object>> doneTasks,
                                              List<Map<String, Object>> productiveReels) {
        List<String> combined = new ArrayList<>(positives);
        doneTasks.stream().limit(3).map(task -> "Completed: " + stringAt(task, "title", "Task")).forEach(combined::add);
        productiveReels.stream().limit(2).map(reel -> "Learned from: " + stringAt(reel, "category", "useful content")).forEach(combined::add);
        if (combined.isEmpty()) {
            combined.add("You stayed engaged enough to record the day instead of ignoring it.");
        }
        return combined.stream().limit(5).collect(Collectors.toList());
    }

    private List<String> buildNegativeActions(List<String> negatives, List<Map<String, Object>> skippedTasks,
                                              List<Map<String, Object>> distractingReels) {
        List<String> combined = new ArrayList<>(negatives);
        skippedTasks.stream().limit(2).map(task -> "Skipped: " + stringAt(task, "title", "Task")).forEach(combined::add);
        distractingReels.stream().limit(2).map(reel -> "Distraction risk: " + stringAt(reel, "titleOrCaption", "content")).forEach(combined::add);
        if (combined.isEmpty()) {
            combined.add("No strong negative trend was logged today.");
        }
        return combined.stream().limit(5).collect(Collectors.toList());
    }

    private String buildImprovement(double studyHours, double codingHours, double exerciseMinutes,
                                    List<Map<String, Object>> pendingTasks, String mood) {
        if (studyHours + codingHours < 2) {
            return "Tomorrow needs one early deep-work block that starts before social media or passive browsing.";
        }
        if (exerciseMinutes < 20) {
            return "Add movement earlier in the day so energy does not depend on motivation later.";
        }
        if (!pendingTasks.isEmpty()) {
            return "Reduce plan overload. Preserve high-priority tasks and cut low-value extras when the day slips.";
        }
        if (mood.toLowerCase(Locale.ENGLISH).contains("angry") || mood.toLowerCase(Locale.ENGLISH).contains("sad")) {
            return "Keep tomorrow simpler, calmer, and more structured so emotion does not run the schedule.";
        }
        return "Repeat the same structure tomorrow, but tighten transitions between tasks.";
    }

    private String buildOutfitSuggestion(List<Map<String, Object>> wardrobeLogs) {
        if (!wardrobeLogs.isEmpty()) {
            Map<String, Object> latest = wardrobeLogs.get(wardrobeLogs.size() - 1);
            int rating = (int) Math.round(doubleAt(latest, "rating"));
            if (rating >= 4) {
                return "Reuse your high-confidence outfit formula: clean fit, minimal clutter, and sharp grooming.";
            }
        }
        return "Prepare tomorrow’s outfit tonight so the morning starts with less friction and more confidence.";
    }

    private List<Map<String, Object>> buildTomorrowTimetable(Map<String, Object> profile,
                                                             Map<String, Object> dailyLog,
                                                             List<Map<String, Object>> timetable,
                                                             List<Map<String, Object>> productiveReels) {
        List<Map<String, Object>> tomorrow = timetable.stream()
                .map(task -> copyTask(task, stringAt(task, "time", "06:00"), stringAt(task, "title", "Task"), stringAt(task, "priority", "MEDIUM")))
                .sorted(Comparator.comparing(task -> parseTime(stringAt(task, "time", "23:59"))))
                .collect(Collectors.toCollection(ArrayList::new));

        if (tomorrow.isEmpty()) {
            tomorrow.add(copyTask(Map.of(), "06:00", "Wake + water + sunlight", "HIGH"));
            tomorrow.add(copyTask(Map.of(), "06:30", "Workout / mobility", "HIGH"));
            tomorrow.add(copyTask(Map.of(), "09:00", "Deep work study block", "HIGH"));
            tomorrow.add(copyTask(Map.of(), "14:00", "DSA practice", "HIGH"));
            tomorrow.add(copyTask(Map.of(), "21:30", "Reflection + sleep prep", "MEDIUM"));
        }

        int delay = Math.max(0, minutesBetween(stringAt(profile, "plannedWakeTime", "06:00"), stringAt(dailyLog, "wakeTime", "06:00")));
        if (delay > 30) {
            tomorrow = tomorrow.stream()
                    .map(task -> copyTask(task,
                            shiftTime(stringAt(task, "time", "06:00"), delay),
                            stringAt(task, "task", stringAt(task, "title", "Task")),
                            stringAt(task, "priority", "MEDIUM")))
                    .collect(Collectors.toCollection(ArrayList::new));
        }

        Map<String, Map<String, Object>> insightTasks = new LinkedHashMap<>();
        productiveReels.forEach(reel -> {
            String category = stringAt(reel, "category", "");
            switch (category) {
                case "Books / Reading" -> insightTasks.putIfAbsent("reading", copyTask(Map.of(), "20:30", "Read 10 pages", "MEDIUM"));
                case "Psychology", "Spiritual / Calm Mind" -> insightTasks.putIfAbsent("reflection", copyTask(Map.of(), "21:15", "Reflection / journaling", "MEDIUM"));
                case "Fitness" -> insightTasks.putIfAbsent("fitness", copyTask(Map.of(), "06:30", "Workout / mobility", "HIGH"));
                case "Food / Health" -> insightTasks.putIfAbsent("food", copyTask(Map.of(), "13:00", "Healthy meal reminder", "HIGH"));
                case "Communication Skills" -> insightTasks.putIfAbsent("communication", copyTask(Map.of(), "19:00", "Speaking practice", "MEDIUM"));
                case "Study / DSA", "Productivity" -> insightTasks.putIfAbsent("study", copyTask(Map.of(), "17:30", "Revision or planning block", "HIGH"));
                case "Anime", "Movies" -> insightTasks.putIfAbsent("entertainment", copyTask(Map.of(), "22:00", "Controlled entertainment slot", "LOW"));
                default -> {
                }
            }
        });

        for (Map<String, Object> insightTask : insightTasks.values()) {
            String title = stringAt(insightTask, "task", "Task");
            boolean exists = tomorrow.stream().anyMatch(task -> stringAt(task, "task", "").equalsIgnoreCase(title));
            if (!exists) {
                tomorrow.add(insightTask);
            }
        }

        tomorrow.sort(Comparator.comparing(task -> parseTime(stringAt(task, "time", "23:59"))));
        if (tomorrow.size() > 8) {
            tomorrow = tomorrow.stream().filter(task -> !"LOW".equalsIgnoreCase(stringAt(task, "priority", "MEDIUM"))).collect(Collectors.toCollection(ArrayList::new));
        }
        return tomorrow;
    }

    private Map<String, Object> copyTask(Map<String, Object> task, String time, String title, String priority) {
        Map<String, Object> copy = new LinkedHashMap<>();
        copy.put("time", time);
        copy.put("task", title);
        copy.put("priority", priority);
        copy.put("category", stringAt(task, "category", ""));
        return copy;
    }

    private int minutesBetween(String planned, String actual) {
        LocalTime start = parseTime(planned);
        LocalTime end = parseTime(actual);
        return Math.max(0, end.toSecondOfDay() / 60 - start.toSecondOfDay() / 60);
    }

    private String shiftTime(String time, int delay) {
        return parseTime(time).plusMinutes(delay).format(TIME_FORMATTER);
    }

    private LocalTime parseTime(String value) {
        try {
            return LocalTime.parse(value, TIME_FORMATTER);
        } catch (Exception ignored) {
            return LocalTime.of(6, 0);
        }
    }

    private Map<String, Object> mapAt(Map<String, Object> source, String key) {
        Object value = source.get(key);
        if (!(value instanceof Map<?, ?> map)) {
            return new LinkedHashMap<>();
        }
        Map<String, Object> result = new LinkedHashMap<>();
        map.forEach((innerKey, innerValue) -> {
            if (innerKey != null) {
                result.put(String.valueOf(innerKey), innerValue);
            }
        });
        return result;
    }

    private List<Map<String, Object>> listAt(Map<String, Object> source, String key) {
        Object value = source.get(key);
        if (!(value instanceof List<?> list)) {
            return new ArrayList<>();
        }
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object item : list) {
            if (item instanceof Map<?, ?> map) {
                Map<String, Object> normalized = new LinkedHashMap<>();
                map.forEach((innerKey, innerValue) -> {
                    if (innerKey != null) {
                        normalized.put(String.valueOf(innerKey), innerValue);
                    }
                });
                result.add(normalized);
            }
        }
        return result;
    }

    private String stringAt(Map<String, Object> source, String key, String fallback) {
        Object value = source.get(key);
        if (value == null) {
            return fallback;
        }
        String text = String.valueOf(value).trim();
        return text.isEmpty() ? fallback : text;
    }

    private double doubleAt(Map<String, Object> source, String key) {
        Object value = source.get(key);
        if (value instanceof Number number) {
            return number.doubleValue();
        }
        if (value == null) {
            return 0;
        }
        try {
            return Double.parseDouble(String.valueOf(value));
        } catch (NumberFormatException ignored) {
            return 0;
        }
    }

    private boolean boolAt(Map<String, Object> source, String key) {
        Object value = source.get(key);
        if (value instanceof Boolean flag) {
            return flag;
        }
        return value != null && Boolean.parseBoolean(String.valueOf(value));
    }

    private List<String> splitEntries(String value) {
        List<String> entries = new ArrayList<>();
        for (String item : value.split("[\\n,]")) {
            String trimmed = item.trim();
            if (!trimmed.isBlank()) {
                entries.add(trimmed);
            }
        }
        return entries;
    }
}
