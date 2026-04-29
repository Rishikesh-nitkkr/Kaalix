package com.rishisystem.service;

import com.rishisystem.model.ReelAnalysisRequest;
import com.rishisystem.model.ReelAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ReelAnalysisService {

    private static final Set<String> STOP_WORDS = Set.of(
            "about", "after", "again", "almost", "also", "because", "before", "being", "between", "could",
            "every", "from", "have", "into", "just", "like", "make", "more", "much", "only", "over",
            "really", "should", "some", "than", "that", "their", "there", "these", "they", "this",
            "today", "very", "want", "when", "where", "which", "while", "with", "your", "youtube",
            "instagram", "reel", "short", "video", "title", "caption", "notes", "transcript"
    );

    private static final Map<String, List<String>> CATEGORY_KEYWORDS = new LinkedHashMap<>();
    private static final Map<String, CategoryProfile> CATEGORY_PROFILES = new LinkedHashMap<>();

    static {
        CATEGORY_KEYWORDS.put("Books / Reading", List.of("book", "books", "read", "reading", "pages", "author", "novel", "chapter", "library"));
        CATEGORY_KEYWORDS.put("Psychology", List.of("psychology", "mind", "mindset", "emotion", "trauma", "trigger", "reaction", "behavior", "self-awareness"));
        CATEGORY_KEYWORDS.put("Movies", List.of("movie", "cinema", "film", "director", "scene", "screenplay", "storytelling"));
        CATEGORY_KEYWORDS.put("Anime", List.of("anime", "manga", "character", "arc", "training", "discipline", "hero"));
        CATEGORY_KEYWORDS.put("Fitness", List.of("fitness", "workout", "gym", "exercise", "training", "cardio", "muscle", "steps", "protein"));
        CATEGORY_KEYWORDS.put("Study / DSA", List.of("study", "dsa", "leetcode", "coding", "interview", "array", "graph", "tree", "algorithm", "system design", "revision"));
        CATEGORY_KEYWORDS.put("Communication Skills", List.of("communication", "speaking", "conversation", "public speaking", "confidence", "networking", "presentation"));
        CATEGORY_KEYWORDS.put("Fashion / Outfit", List.of("fashion", "outfit", "style", "wardrobe", "dress", "shirt", "shoes", "grooming"));
        CATEGORY_KEYWORDS.put("Food / Health", List.of("food", "meal", "diet", "nutrition", "health", "hydration", "sleep", "vitamin", "junk"));
        CATEGORY_KEYWORDS.put("Motivation", List.of("motivation", "discipline", "focus", "goal", "purpose", "consistency", "grind", "hustle"));
        CATEGORY_KEYWORDS.put("Spiritual / Calm Mind", List.of("spiritual", "meditation", "calm", "peace", "mindfulness", "gratitude", "prayer", "silence"));
        CATEGORY_KEYWORDS.put("Productivity", List.of("productivity", "planner", "routine", "schedule", "systems", "time block", "deep work", "efficiency"));
        CATEGORY_KEYWORDS.put("Negative / Time Waste", List.of("drama", "gossip", "meme", "troll", "fight", "celebrity", "endless scrolling", "time waste", "doomscroll", "toxic"));

        CATEGORY_PROFILES.put("Books / Reading", new CategoryProfile(
                "This reel is encouraging knowledge-building through books and structured reading.",
                "Useful because reading improves depth, focus, vocabulary, and strategic thinking over time.",
                "Read at least 10 pages or 20 minutes daily.",
                "Add a focused reading slot and capture one takeaway after finishing.",
                "Avoid collecting book ideas without actually sitting down to read.",
                "HIGH", true, true, "Reading block", 20, "Evening"
        ));
        CATEGORY_PROFILES.put("Psychology", new CategoryProfile(
                "This reel is pointing toward self-awareness, emotional control, or behavior patterns.",
                "Useful because understanding your reactions helps you make calmer decisions under pressure.",
                "Notice your triggers and choose a better response instead of reacting automatically.",
                "Add a reflection or journaling task after emotionally heavy moments.",
                "Avoid using psychology content only to label others instead of improving yourself.",
                "HIGH", true, true, "Reflection journal", 15, "Night"
        ));
        CATEGORY_PROFILES.put("Movies", new CategoryProfile(
                "This reel is centered on film, storytelling, or movie-based inspiration.",
                "Useful when it sharpens taste, storytelling sense, or gives controlled recreation.",
                "Use movies as planned recreation or extract one storytelling lesson.",
                "Keep movie time inside a defined entertainment slot.",
                "Avoid letting entertainment leak into deep work hours.",
                "LOW", false, false, "Entertainment slot", 45, "Night"
        ));
        CATEGORY_PROFILES.put("Anime", new CategoryProfile(
                "This reel draws inspiration from anime themes like training, character growth, or perseverance.",
                "Useful when it pushes discipline, resilience, and identity-building without taking over the day.",
                "Translate inspiration into one action, not just hype.",
                "Keep a small motivation note or a controlled reward slot.",
                "Avoid binge-watching when a short note or controlled break would do the job.",
                "LOW", false, true, "Motivation review", 10, "Morning"
        ));
        CATEGORY_PROFILES.put("Fitness", new CategoryProfile(
                "This reel is about training, movement, strength, or physical health.",
                "Useful because body energy directly affects discipline, mood, and focus.",
                "Train consistently, even if the session is short.",
                "Add a workout, walk, or mobility block to the timetable.",
                "Avoid skipping movement because the ideal full workout is not possible.",
                "HIGH", true, true, "Workout block", 30, "Morning"
        ));
        CATEGORY_PROFILES.put("Study / DSA", new CategoryProfile(
                "This reel is pushing learning, coding, problem-solving, or interview preparation.",
                "Useful because skill growth compounds when you convert ideas into regular practice.",
                "Review the concept, then solve one targeted problem today.",
                "Add a deep-work study block or a DSA practice slot.",
                "Avoid watching study content that feels productive but replaces actual solving.",
                "HIGH", true, true, "DSA practice", 45, "Afternoon"
        ));
        CATEGORY_PROFILES.put("Communication Skills", new CategoryProfile(
                "This reel is teaching better speaking, listening, or social presence.",
                "Useful because communication upgrades amplify opportunities in study, work, and relationships.",
                "Practice one speaking drill or one intentional conversation today.",
                "Add a speaking practice or conversation review slot.",
                "Avoid consuming confidence tips without practicing them aloud.",
                "MEDIUM", true, true, "Speaking practice", 20, "Evening"
        ));
        CATEGORY_PROFILES.put("Fashion / Outfit", new CategoryProfile(
                "This reel is about presentation, outfit choices, or grooming.",
                "Useful because personal presentation can boost confidence and social clarity when kept intentional.",
                "Prepare simple, clean outfits that fit your goals and occasion.",
                "Add a wardrobe planning reminder before busy days.",
                "Avoid turning style into endless comparison or impulsive buying.",
                "LOW", false, true, "Outfit planning", 10, "Night"
        ));
        CATEGORY_PROFILES.put("Food / Health", new CategoryProfile(
                "This reel is guiding food quality, recovery, or sustainable health habits.",
                "Useful because clean food, hydration, and sleep support every other life stat.",
                "Improve one meal, one hydration habit, or one sleep routine tonight.",
                "Add a healthy meal reminder or hydration checkpoint.",
                "Avoid extreme diet swings that are hard to sustain.",
                "HIGH", true, true, "Healthy meal prep", 20, "Afternoon"
        ));
        CATEGORY_PROFILES.put("Motivation", new CategoryProfile(
                "This reel is trying to boost drive, courage, or urgency.",
                "Useful when it moves you toward immediate action instead of temporary excitement.",
                "Turn motivation into one measurable task within the next few hours.",
                "Add a focused action step while energy is high.",
                "Avoid stacking motivational content without execution.",
                "MEDIUM", true, true, "Execution sprint", 25, "Morning"
        ));
        CATEGORY_PROFILES.put("Spiritual / Calm Mind", new CategoryProfile(
                "This reel is about inner calm, meaning, mindfulness, or spiritual steadiness.",
                "Useful because calm attention improves emotional control and reduces impulsive decisions.",
                "Make space for stillness, breath, gratitude, or prayer.",
                "Add a calm-down or reflection slot to the routine.",
                "Avoid consuming peaceful content while keeping an otherwise chaotic day.",
                "MEDIUM", true, true, "Calm mind reset", 15, "Night"
        ));
        CATEGORY_PROFILES.put("Productivity", new CategoryProfile(
                "This reel is focused on systems, planning, scheduling, or getting more from your day.",
                "Useful when it reduces friction and helps you follow through consistently.",
                "Refine one system and use it today instead of redesigning everything.",
                "Add a planning or review block to tighten execution.",
                "Avoid over-optimizing the plan instead of doing the task.",
                "HIGH", true, true, "Planning review", 15, "Morning"
        ));
        CATEGORY_PROFILES.put("Negative / Time Waste", new CategoryProfile(
                "This reel looks more like distraction than growth.",
                "Useful only as a warning sign that attention is drifting away from your priorities.",
                "Reduce exposure and protect the next study or health block.",
                "Do not add this to the timetable; replace it with a reset task.",
                "Avoid repeated checking, emotional drama, and passive endless scrolling.",
                "LOW", false, false, "Scroll reset", 10, "Now"
        ));
    }

    public ReelAnalysisResponse analyze(ReelAnalysisRequest request) {
        String fullText = Stream.of(
                        safe(request.title()),
                        safe(request.caption()),
                        safe(request.transcript()),
                        safe(request.notes()),
                        safe(request.link()))
                .filter(value -> !value.isBlank())
                .collect(Collectors.joining(" "))
                .toLowerCase(Locale.ENGLISH);

        String category = detectCategory(fullText);
        CategoryProfile profile = CATEGORY_PROFILES.getOrDefault(category, CATEGORY_PROFILES.get("Productivity"));
        List<String> keywords = extractKeywords(fullText, category);
        String titleOrCaption = firstNonBlank(request.title(), request.caption(), request.notes(), "Untitled insight");
        String platform = detectPlatform(request.link());
        String summary = buildSummary(titleOrCaption, category, keywords, profile);
        String productiveLabel = profile.productive() ? "Productive" : "Distraction Risk";
        String rationale = profile.productive()
                ? "This is worth keeping only if you act on it quickly and protect your core priorities."
                : "Treat this as controlled entertainment or a distraction warning, not a main task.";

        return new ReelAnalysisResponse(
                safe(request.link()),
                platform,
                titleOrCaption,
                keywords,
                category,
                profile.meaning(),
                profile.usefulness(),
                summary,
                profile.lesson(),
                profile.action(),
                profile.avoid(),
                profile.priority(),
                profile.affectTimetable(),
                profile.productive(),
                productiveLabel,
                profile.taskTitle(),
                profile.durationMinutes(),
                profile.timeWindow(),
                rationale
        );
    }

    private String detectCategory(String text) {
        Map<String, Integer> scores = new LinkedHashMap<>();
        CATEGORY_KEYWORDS.forEach((category, words) -> scores.put(category, scoreCategory(text, words)));

        if (containsAny(text, List.of("doomscroll", "mindless", "wasting time", "celebrity fight", "toxic drama"))) {
            scores.merge("Negative / Time Waste", 4, Integer::sum);
        }
        if (containsAny(text, List.of("book", "read")) && containsAny(text, List.of("habit", "daily"))) {
            scores.merge("Books / Reading", 2, Integer::sum);
        }
        if (containsAny(text, List.of("anime", "character")) && containsAny(text, List.of("discipline", "training", "mindset"))) {
            scores.merge("Anime", 2, Integer::sum);
        }
        if (containsAny(text, List.of("routine", "schedule", "systems")) && containsAny(text, List.of("focus", "execution", "time block"))) {
            scores.merge("Productivity", 2, Integer::sum);
        }

        return scores.entrySet().stream()
                .max(Comparator.comparingInt(Map.Entry::getValue))
                .filter(entry -> entry.getValue() > 0)
                .map(Map.Entry::getKey)
                .orElse("Productivity");
    }

    private int scoreCategory(String text, List<String> words) {
        int score = 0;
        for (String word : words) {
            if (text.contains(word.toLowerCase(Locale.ENGLISH))) {
                score += word.contains(" ") ? 2 : 1;
            }
        }
        return score;
    }

    private List<String> extractKeywords(String text, String category) {
        LinkedHashSet<String> selected = new LinkedHashSet<>();
        CATEGORY_KEYWORDS.getOrDefault(category, List.of()).stream()
                .filter(text::contains)
                .limit(4)
                .forEach(selected::add);

        Arrays.stream(text.replaceAll("[^a-z0-9 ]", " ").split("\\s+"))
                .filter(token -> token.length() >= 5)
                .filter(token -> !STOP_WORDS.contains(token))
                .limit(12)
                .forEach(selected::add);

        return new ArrayList<>(selected).stream().limit(6).collect(Collectors.toList());
    }

    private String buildSummary(String titleOrCaption, String category, List<String> keywords, CategoryProfile profile) {
        String keywordText = keywords.isEmpty() ? "clear habit cues" : String.join(", ", keywords);
        return titleOrCaption + " fits the " + category + " bucket and highlights " + keywordText + ". " + profile.lesson();
    }

    private String detectPlatform(String link) {
        String lowered = safe(link).toLowerCase(Locale.ENGLISH);
        if (lowered.contains("instagram")) {
            return "Instagram Reel";
        }
        if (lowered.contains("youtube") || lowered.contains("youtu.be")) {
            return "YouTube Short";
        }
        return "Manual Entry";
    }

    private boolean containsAny(String text, List<String> words) {
        return words.stream().anyMatch(text::contains);
    }

    private String safe(String value) {
        return value == null ? "" : value.trim();
    }

    private String firstNonBlank(String... values) {
        return Arrays.stream(values)
                .filter(value -> value != null && !value.isBlank())
                .map(String::trim)
                .findFirst()
                .orElse("");
    }

    private record CategoryProfile(
            String meaning,
            String usefulness,
            String lesson,
            String action,
            String avoid,
            String priority,
            boolean affectTimetable,
            boolean productive,
            String taskTitle,
            int durationMinutes,
            String timeWindow
    ) {
    }
}
