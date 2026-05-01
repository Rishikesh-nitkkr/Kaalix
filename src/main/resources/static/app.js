const USERS_KEY = "rishi-system-users";
const SESSION_KEY = "rishi-system-session";
const STORAGE_PREFIX = "rishi-system-state:";
const UI_KEY = "kaalix-ui";
const AUDIO = {
    login: "loginSound",
    task: "taskSound",
    study: "studySound",
    bg: "bgMusic"
};
const QUOTES = [
    "Master time. Master yourself.",
    "Discipline is built when nobody is watching.",
    "Small actions repeated daily create power.",
    "You are not behind. You are being forged.",
    "Control the day before the day controls you."
];
const WARDROBE_CATEGORIES = ["All Items", "Shirts", "T-shirts", "Pants", "Jeans", "Shoes", "Watches", "Accessories", "Jackets", "Hoodies", "Others"];
const WARDROBE_COUNT_CATEGORIES = ["Shirts", "Pants", "Shoes", "Accessories", "Watches", "Jackets"];
const DEFAULT_MUSIC_QUEUE = [
    {
        id: "statue-god-theme",
        title: "Statue of God Theme",
        artist: "Solo Leveling OST Cover",
        source: "Local",
        url: "/assets/statue-of-god-theme.mp3",
        cover: "/assets/kaalix-logo.png",
        tags: ["Focus", "Shadow", "OST"],
        duration: "3:48",
        liked: false
    },
    {
        id: "shadow-focus",
        title: "Shadow Focus",
        artist: "KAALIX System",
        source: "LOCAL",
        url: "/assets/study-mode.mp3",
        cover: "/assets/kaalix-portrait.png",
        tags: ["Focus", "Study", "Low distraction"],
        duration: "4:04",
        liked: false
    },
    {
        id: "arise-alert",
        title: "Arise Alert",
        artist: "KAALIX System",
        source: "LOCAL",
        url: "/assets/task-complete.mp3",
        cover: "/assets/kaalix-logo.png",
        tags: ["Motivation", "Reward"],
        duration: "1:06",
        liked: false
    }
];
const PLAYLISTS = [
    { id: "focus-mode", name: "Focus Mode", tracks: 24, mood: "Study", cover: "/assets/kaalix-logo.png", songIds: ["shadow-focus", "statue-god-theme"] },
    { id: "workout", name: "Workout", tracks: 18, mood: "Fitness", cover: "/assets/kaalix-portrait.png", songIds: ["arise-alert", "statue-god-theme"] },
    { id: "study-flow", name: "Study Flow", tracks: 21, mood: "DSA", cover: "/assets/kaalix-logo.png", songIds: ["shadow-focus"] },
    { id: "motivation", name: "Motivation", tracks: 19, mood: "Level Up", cover: "/assets/kaalix-portrait.png", songIds: ["arise-alert", "statue-god-theme"] },
    { id: "calm-mind", name: "Calm Mind", tracks: 16, mood: "Recovery", cover: "/assets/kaalix-logo.png", songIds: ["shadow-focus"] },
    { id: "anime-vibes", name: "Solo Leveling / Anime Vibes", tracks: 15, mood: "Shadow", cover: "/assets/kaalix-portrait.png", songIds: ["statue-god-theme", "arise-alert"] },
    { id: "custom-playlist", name: "Custom Playlist", tracks: 0, mood: "Custom", cover: "/assets/kaalix-logo.png", songIds: [] },
    { id: "recently-imported", name: "Recently Imported", tracks: 0, mood: "Fresh imports", cover: "/assets/kaalix-logo.png", songIds: [] }
];
const ICONS = {
    play: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>`,
    next: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5l9 7-9 7zM17 5h2v14h-2z"/></svg>`,
    prev: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5l-9 7 9 7zM5 5h2v14H5z"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5h-2V6.4l-4.7 4.7-1.4-1.4L17.6 5H16zM4 7h4.5l10 10H21v2h-3.5l-10-10H4zm10.3 5.9 1.4 1.4L19 11v-1.5h2V15h-5.5v-2H17.6zM4 17h4.5l2.1-2.1 1.4 1.4L9.3 19H4z"/></svg>`,
    repeat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10l-2-2 1.4-1.4L21 8l-4.6 4.4L15 11l2-2H7a3 3 0 0 0-3 3H2a5 5 0 0 1 5-5zm10 10H7l2 2-1.4 1.4L3 16l4.6-4.4L9 13l-2 2h10a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5z"/></svg>`,
    volume: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zm12.5-.5a5 5 0 0 1 0 7l1.4 1.4a7 7 0 0 0 0-9.8z"/></svg>`,
    queue: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h12v2H4zm0 5h12v2H4zm0 5h8v2H4zm14-4 4 3-4 3z"/></svg>`,
    like: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-4.9-8-11a4.7 4.7 0 0 1 8-3.3A4.7 4.7 0 0 1 20 10c0 6.1-8 11-8 11z"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-4.9-8-11a4.7 4.7 0 0 1 8-3.3A4.7 4.7 0 0 1 20 10c0 6.1-8 11-8 11z"/></svg>`,
    upload: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l5 5h-3v6h-4V8H7zm-7 14h14v3H5z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.4 5 12.6 12.6-1.4 1.4L5 6.4zm12.6 1.4L6.4 19 5 17.6 17.6 5z"/></svg>`
};

let currentUser = null;
let state = null;
let importedTimetable = [];
let importedWeek = null;
let importedFile = null;
let importedConfirmed = false;
let uiState = loadUiState();
let runtimeMusicUrls = [];
let focusTimer = null;
let focusRemainingSeconds = 25 * 60;
let focusTotalSeconds = 25 * 60;
let focusStartedAt = null;
const EMPTY_DAILY_LOG = {
    wakeTime: "",
    sleepTime: "",
    studyHours: 0,
    codingHours: 0,
    exerciseMinutes: 0,
    mood: "Calm",
    habitChecklist: [],
    habits: "",
    positiveActions: "",
    negativeActions: "",
    emotionTrigger: "",
    emotionReaction: "",
    betterResponse: "",
    reflectionNote: ""
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    applyUiState();
    bindNavigation();
    bindAuth();
    bindForms();
    bindInteractions();
    bindSystemControls();
    bindCursor();
    restoreSession();
    checkHealth();
}

function bindNavigation() {
    document.querySelectorAll(".nav-item").forEach((button) => {
        button.addEventListener("click", () => switchScreen(button.dataset.screen));
    });
}

function bindAuth() {
    document.querySelectorAll(".auth-tab").forEach((button) => {
        button.addEventListener("click", () => setAuthTab(button.dataset.authTab));
    });

    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const user = loadUsers().find((item) => item.email === email && item.password === password);
        if (!user) {
            showToast("Login failed. Check email and password.");
            return;
        }
        currentUser = user;
        saveSession(user.email);
        state = loadState(user.email);
        finishLogin();
        playSound("login");
        showToast("Welcome back.");
    });

    document.getElementById("signupForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        if (!name || !email || !password) {
            showToast("Please complete all signup fields.");
            return;
        }
        const users = loadUsers();
        if (users.some((item) => item.email === email)) {
            showToast("Account already exists. Please login.");
            setAuthTab("login");
            return;
        }
        const user = { name, email, password, username: email.split("@")[0] };
        users.push(user);
        saveUsers(users);
        currentUser = user;
        state = createDefaultState(user);
        persistState();
        saveSession(email);
        finishLogin();
        playSound("login");
        showToast("Profile created.");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem(SESSION_KEY);
        currentUser = null;
        state = null;
        document.getElementById("authOverlay").classList.remove("hidden");
        switchScreen("dashboard");
        showToast("Logged out.");
    });
}

function bindForms() {
    document.getElementById("profileForm").addEventListener("submit", (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        const name = document.getElementById("profileName").value.trim();
        const username = document.getElementById("profileUsername").value.trim();
        const email = document.getElementById("profileEmail").value.trim().toLowerCase();
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (!name || !username || !email.includes("@")) {
            showToast("Profile needs a valid name, username, and email.");
            return;
        }
        const users = loadUsers();
        if (users.some((item) => item.email === email && item.email !== currentUser.email)) {
            showToast("That email is already used.");
            return;
        }
        if (newPassword || confirmPassword || currentPassword) {
            if (currentPassword !== currentUser.password) {
                showToast("Current password is incorrect.");
                return;
            }
            if (newPassword.length < 6 || newPassword !== confirmPassword) {
                showToast("New passwords must match and be at least 6 characters.");
                return;
            }
            currentUser.password = newPassword;
        }
        const previousEmail = currentUser.email;
        state.profile.name = name;
        state.profile.username = username;
        state.profile.email = email;
        state.profile.title = document.getElementById("profileTitleInput").value.trim() || state.profile.title;
        state.profile.bodyType = document.getElementById("bodyType").value.trim();
        state.profile.fitnessStats = document.getElementById("fitnessStats").value.trim();
        state.profile.relationshipStatus = document.getElementById("relationshipStatus").value.trim();
        state.profile.lifestyleHabits = document.getElementById("lifestyleHabits").value.trim();
        state.profile.customAttributes = document.getElementById("customAttributes").value.trim();
        state.profile.plannedWakeTime = document.getElementById("plannedWakeTime").value || state.profile.plannedWakeTime;
        state.profile.plannedSleepTime = document.getElementById("plannedSleepTime").value || state.profile.plannedSleepTime;
        state.profile.mission = document.getElementById("profileMission").value.trim() || state.profile.mission;
        state.profile.themePreference = document.getElementById("themePreference").value;
        uiState.musicEnabled = document.getElementById("prefMusic").checked;
        uiState.quoteVoiceEnabled = document.getElementById("prefQuoteVoice").checked;
        currentUser.name = state.profile.name;
        currentUser.username = username;
        currentUser.email = email;
        saveUsers(users.map((item) => item.email === previousEmail ? currentUser : item));
        if (previousEmail !== email) {
            const oldState = localStorage.getItem(STORAGE_PREFIX + previousEmail);
            if (oldState) {
                localStorage.setItem(STORAGE_PREFIX + email, oldState);
                localStorage.removeItem(STORAGE_PREFIX + previousEmail);
            }
            saveSession(email);
        }
        event.target.querySelectorAll("input[type='password']").forEach((input) => input.value = "");
        saveUiState();
        applyUiState();
        persistState();
        showToast("Profile updated.");
    });

    document.getElementById("dailyTrackerForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        state.dailyLog = {
            wakeTime: document.getElementById("wakeTime").value || state.dailyLog.wakeTime,
            sleepTime: document.getElementById("sleepTime").value || state.dailyLog.sleepTime,
            studyHours: Number(document.getElementById("studyHours").value || 0),
            codingHours: Number(document.getElementById("codingHours").value || 0),
            exerciseMinutes: Number(document.getElementById("exerciseMinutes").value || 0),
            mood: document.getElementById("dailyMood").value,
            habitChecklist: checkedDailyHabits(),
            habits: document.getElementById("habits").value.trim(),
            positiveActions: document.getElementById("positiveActions").value.trim(),
            negativeActions: document.getElementById("negativeActions").value.trim(),
            emotionTrigger: document.getElementById("emotionTrigger").value.trim(),
            emotionReaction: document.getElementById("emotionReaction").value.trim(),
            betterResponse: document.getElementById("betterResponse").value.trim(),
            reflectionNote: document.getElementById("reflectionNote").value.trim()
        };
        adaptTimetableFromDailyLog();
        state.report = localDailyReport();
        await syncDailyProgression();
        persistState();
        playSound("task");
        showToast(`Daily log saved. ${calculateDailyTxpPreview()} TXP projected.`);
    });

    document.getElementById("studyForm").addEventListener("submit", (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        state.studySessions.unshift({
            id: uid(),
            subject: document.getElementById("studySubject").value.trim(),
            topic: document.getElementById("studyTopic").value.trim(),
            timeSpent: Number(document.getElementById("studyMinutes").value || 0),
            questionsSolved: Number(document.getElementById("questionsSolved").value || 0),
            platform: document.getElementById("studyPlatform").value.trim() || "Manual",
            confidence: document.getElementById("studyConfidence").value,
            createdAt: new Date().toISOString()
        });
        event.target.reset();
        document.getElementById("studyConfidence").value = "Medium";
        persistState();
        showToast("Study session added.");
    });

    document.getElementById("socialForm").addEventListener("submit", saveFriendLog);
    document.getElementById("friendPhotoInput")?.addEventListener("change", uploadFriendPhoto);
    document.getElementById("friendClearBtn")?.addEventListener("click", clearFriendForm);
    document.getElementById("friendExportBtn")?.addEventListener("click", exportFriendHistory);
    document.getElementById("socialList")?.addEventListener("click", handleFriendAction);

    document.getElementById("legacySocialForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        state.socialLogs.unshift({
            id: uid(),
            person: document.getElementById("socialPerson").value.trim(),
            place: document.getElementById("socialPlace").value.trim(),
            impact: document.getElementById("socialImpact").value,
            lesson: document.getElementById("socialLesson").value.trim(),
            createdAt: new Date().toISOString()
        });
        event.target.reset();
        persistState();
        showToast("Social log saved.");
    });

    document.getElementById("styleForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        state.wardrobeLogs.unshift({
            id: uid(),
            outfit: document.getElementById("outfitDetails").value.trim(),
            occasion: document.getElementById("outfitOccasion").value.trim(),
            rating: Number(document.getElementById("outfitRating").value || 0),
            notes: document.getElementById("outfitNotes").value.trim(),
            createdAt: new Date().toISOString()
        });
        event.target.reset();
        document.getElementById("outfitRating").value = "4";
        persistState();
        showToast("Outfit saved.");
    });

    document.getElementById("reelPlatformGrid")?.addEventListener("click", handleReelPlatformSelect);
    document.getElementById("reelFallbackToggle")?.addEventListener("click", () => document.getElementById("reelFallbackFields")?.classList.toggle("hidden"));
    document.getElementById("reelScreenshot")?.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        const label = document.getElementById("screenshotName");
        if (label) label.textContent = file ? file.name : "No screenshot selected";
    });

    document.getElementById("reelForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        const payload = {
            userId: currentUser?.email || "local",
            platform: document.getElementById("reelPlatform")?.value || "Instagram",
            url: document.getElementById("reelLink").value.trim(),
            link: document.getElementById("reelLink").value.trim(),
            title: document.getElementById("reelTitle").value.trim(),
            caption: document.getElementById("reelCaption").value.trim(),
            transcript: document.getElementById("reelTranscript")?.value.trim() || "",
            notes: document.getElementById("reelNotes").value.trim(),
            screenshotName: document.getElementById("screenshotName")?.textContent === "No screenshot selected" ? "" : document.getElementById("screenshotName")?.textContent
        };
        if (!payload.url) {
            showToast("Paste a public link first.");
            return;
        }
        setAnalyzeButton(true);
        const analysis = await analyzeReel(payload);
        const reelEntry = { id: uid(), createdAt: new Date().toISOString(), ...analysis };
        state.reels.unshift(reelEntry);
        if (document.getElementById("autoAddToTimetable").checked && reelEntry.affectTimetable) {
            addInsightTask(reelEntry, true);
        }
        event.target.reset();
        document.getElementById("reelPlatform").value = payload.platform;
        document.getElementById("autoAddToTimetable").checked = true;
        if (document.getElementById("screenshotName")) document.getElementById("screenshotName").textContent = "No screenshot selected";
        setAnalyzeButton(false);
        persistState();
        showToast("Link analyzed and saved.");
    });
}

function bindInteractions() {
    document.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (button && !button.disabled && !button.closest(".auth-tabs")) {
            playClickSound();
        }
    });

    document.querySelector(".quick-actions").addEventListener("click", async (event) => {
        const button = event.target.closest("[data-quick]");
        if (!button || !state) {
            return;
        }
        const action = button.dataset.quick;
        if (action === "study") {
            state.dailyLog.studyHours = Number(state.dailyLog.studyHours || 0) + 1;
        }
        if (action === "coding") {
            state.dailyLog.codingHours = Number(state.dailyLog.codingHours || 0) + 1;
        }
        if (action === "workout") {
            state.dailyLog.exerciseMinutes = Number(state.dailyLog.exerciseMinutes || 0) + 20;
        }
        if (action === "waste") {
            const negatives = splitEntries(state.dailyLog.negativeActions);
            negatives.push("Wasted time on passive scrolling");
            state.dailyLog.negativeActions = negatives.join(", ");
        }
        persistState();
        await syncDailyProgression();
        populateForms();
        showToast("Quick log applied.");
    });

    document.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-task-action]");
        if (!button || !state) {
            return;
        }
        const task = state.timetable.find((item) => item.id === button.dataset.taskId);
        if (!task) {
            return;
        }
        task.status = button.dataset.taskAction;
        if (button.dataset.taskAction === "done" && !task.rewarded) {
            task.rewarded = true;
            playSound("task");
            await rewardTXP(taskRewardAmount(task), `Task completed: ${task.title}`);
            return;
        }
        if (button.dataset.taskAction !== "done") {
            task.rewarded = false;
        }
        persistState();
        await syncDailyProgression();
    });

    document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-start-task-timer]");
        if (!button || !state) return;
        const task = state.timetable.find((item) => item.id === button.dataset.startTaskTimer);
        if (task) {
            document.getElementById("timerMode").value = /study|dsa|coding/i.test(task.category + task.title) ? "deep" : "focus";
            document.getElementById("timerHours").value = "0";
            document.getElementById("timerMinutes").value = task.priority === "HIGH" ? "50" : "25";
            configureTimerFromInputs();
            openFocusModal();
        }
    });

    document.getElementById("goalQuestList")?.addEventListener("change", async (event) => {
        await handleGoalToggle(event);
    });
    document.getElementById("goalsPageList")?.addEventListener("change", handleGoalToggle);

    document.getElementById("reelLibrary").addEventListener("click", (event) => {
        const button = event.target.closest("[data-reel-action]");
        if (!button || !state) {
            return;
        }
        const reel = state.reels.find((item) => item.id === button.dataset.reelId);
        if (!reel) return;
        if (button.dataset.reelAction === "add") {
            addInsightTask(reel, false);
            persistState();
        }
        if (button.dataset.reelAction === "delete") {
            state.reels = state.reels.filter((item) => String(item.id) !== String(reel.id));
            fetch(`/api/reels/${reel.id}`, { method: "DELETE" }).catch(() => {});
            persistState();
            showToast("Reel insight deleted.");
        }
    });

    document.querySelectorAll("[data-generate-report], #generateReportBtn").forEach((button) => button.addEventListener("click", async () => {
        if (!state) {
            return;
        }
        setReportButtons(true);
        state.report = await generateDailyReport(state);
        setReportButtons(false);
        persistState();
        switchScreen("report");
        showToast("Daily report generated.");
    }));

    document.getElementById("reportOutput").addEventListener("click", (event) => {
        const button = event.target.closest("[data-report-action='apply']");
        if (!button || !state?.report?.updatedTimetable) {
            return;
        }
        state.timetable = state.report.updatedTimetable.map((item) => ({
            id: uid(),
            time: item.time,
            title: item.task,
            priority: item.priority || "MEDIUM",
            category: item.category || "Planned",
            status: "pending",
            xp: item.priority === "HIGH" ? 50 : item.priority === "LOW" ? 15 : 30,
            source: "report"
        }));
        persistState();
        switchScreen("dashboard");
        showToast("Tomorrow timetable applied.");
    });
}

function openGoalModal() {
    renderGoalSystem();
    document.getElementById("goalModal")?.classList.remove("hidden");
}

function closeGoalModal() {
    document.getElementById("goalModal")?.classList.add("hidden");
}

async function handleGoalToggle(event) {
    const input = event.target.closest("[data-goal-task]");
    if (!input || !state) {
        return;
    }
    const task = state.timetable.find((item) => item.id === input.dataset.goalTask);
    if (!task) {
        return;
    }
    const wasDone = task.status === "done";
    task.status = input.checked ? "done" : "pending";
    if (input.checked && !wasDone && !task.rewarded) {
        task.rewarded = true;
        playSound("task");
        await rewardTXP(taskRewardAmount(task), `Goal completed: ${task.title}`);
    } else {
        persistState();
        await syncDailyProgression();
    }
}

function startFocusMode() {
    configureTimerFromInputs();
    uiState.focusModeActive = true;
    focusStartedAt = Date.now();
    focusRemainingSeconds = focusRemainingSeconds > 0 ? focusRemainingSeconds : focusTotalSeconds;
    clearInterval(focusTimer);
    focusTimer = setInterval(() => {
        focusRemainingSeconds -= 1;
        renderFocusTimer();
        if (focusRemainingSeconds <= 0) {
            completeFocusSession();
        }
    }, 1000);
    saveUiState();
    renderFocusTimer();
    showToast("Focus mode started. Distractions down, TXP multiplier ready.");
}

function stopFocusMode() {
    clearInterval(focusTimer);
    focusTimer = null;
    uiState.focusModeActive = false;
    focusRemainingSeconds = focusTotalSeconds;
    saveUiState();
    renderFocusTimer();
    showToast("Focus mode stopped.");
}

async function completeFocusSession() {
    clearInterval(focusTimer);
    focusTimer = null;
    uiState.focusModeActive = false;
    focusRemainingSeconds = 25 * 60;
    const completedMinutes = Math.max(1, Math.round((focusTotalSeconds || 1500) / 60));
    const txpReward = calculateTimerReward(completedMinutes);
    state.focusSessions.unshift({ id: uid(), minutes: completedMinutes, mode: document.getElementById("timerMode")?.value || "focus", txp: txpReward, createdAt: new Date().toISOString() });
    state.dailyLog.studyHours = Number(state.dailyLog.studyHours || 0) + completedMinutes / 60;
    state.dailyLog.positiveActions = unique([...splitEntries(state.dailyLog.positiveActions), "Completed deep focus block"]).join(", ");
    saveUiState();
    persistState();
    await rewardTXP(txpReward, "Focus session completed");
    playSound("task");
    showToast("Focus block completed. TXP updated.");
}

function saveQuickNote(event) {
    event.preventDefault();
    if (!state) {
        return;
    }
    const text = document.getElementById("quickNoteText").value.trim();
    if (!text) {
        showToast("Write a note first.");
        return;
    }
    state.notes.unshift({
        id: uid(),
        text,
        category: document.getElementById("quickNoteCategory").value,
        createdAt: new Date().toISOString()
    });
    event.target.reset();
    persistState();
    showToast("Note saved.");
}

function saveFullNote(event) {
    event.preventDefault();
    if (!state) return;
    const text = document.getElementById("noteText").value.trim();
    if (!text) {
        showToast("Write a note first.");
        return;
    }
    const id = document.getElementById("editingNoteId").value;
    const existing = state.notes.find((note) => note.id === id);
    if (existing) {
        existing.text = text;
        existing.category = document.getElementById("noteCategory").value;
        existing.updatedAt = new Date().toISOString();
    } else {
        state.notes.unshift({ id: uid(), text, category: document.getElementById("noteCategory").value, pinned: false, createdAt: new Date().toISOString() });
    }
    clearNoteEditor();
    persistState();
    showToast("Note saved.");
}

function handleNoteAction(event) {
    const button = event.target.closest("[data-note-action]");
    if (!button || !state) return;
    const note = state.notes.find((item) => item.id === button.dataset.noteId);
    if (!note) return;
    const action = button.dataset.noteAction;
    if (action === "pin") {
        note.pinned = !note.pinned;
    }
    if (action === "edit") {
        document.getElementById("editingNoteId").value = note.id;
        document.getElementById("noteText").value = note.text;
        document.getElementById("noteCategory").value = note.category || "Reflection";
    }
    if (action === "delete") {
        state.notes = state.notes.filter((item) => item.id !== note.id);
    }
    persistState();
}

function clearNoteEditor() {
    const form = document.getElementById("notesForm");
    if (form) form.reset();
    const edit = document.getElementById("editingNoteId");
    if (edit) edit.value = "";
}

function applyTimerModeDefaults() {
    const mode = document.getElementById("timerMode")?.value || "focus";
    const minutes = { focus: 25, pomodoro: 25, deep: 90, custom: Number(document.getElementById("timerMinutes")?.value || 25) }[mode] || 25;
    document.getElementById("timerHours").value = mode === "deep" ? 1 : 0;
    document.getElementById("timerMinutes").value = mode === "deep" ? 30 : minutes;
    configureTimerFromInputs();
}

function configureTimerFromInputs() {
    const hours = clampNumber(Number(document.getElementById("timerHours")?.value || 0), 0, 6);
    const minutes = clampNumber(Number(document.getElementById("timerMinutes")?.value || 25), 1, 240);
    focusTotalSeconds = Math.max(60, Math.round((hours * 60 + minutes) * 60));
    if (!uiState.focusModeActive || focusRemainingSeconds <= 0) {
        focusRemainingSeconds = focusTotalSeconds;
    }
    renderFocusTimer();
}

function openFocusModal() {
    configureTimerFromInputs();
    document.getElementById("focusModal")?.classList.remove("hidden");
    renderFocusTimer();
}

function closeFocusModal() {
    document.getElementById("focusModal")?.classList.add("hidden");
}

function toggleTimer() {
    if (uiState.focusModeActive) {
        clearInterval(focusTimer);
        focusTimer = null;
        uiState.focusModeActive = false;
        saveUiState();
        renderFocusTimer();
        showToast("Timer paused.");
        return;
    }
    startFocusMode();
}

function resetTimerConfig() {
    clearInterval(focusTimer);
    focusTimer = null;
    uiState.focusModeActive = false;
    configureTimerFromInputs();
    saveUiState();
    renderFocusTimer();
    showToast("Timer reset.");
}

function toggleNatureSound() {
    uiState.natureSound = !uiState.natureSound;
    const toggle = document.getElementById("natureSoundToggle");
    if (toggle) toggle.checked = Boolean(uiState.natureSound);
    saveUiState();
    renderFocusTimer();
    showToast(uiState.natureSound ? "Nature sound enabled." : "Nature sound disabled.");
}

function bindSystemControls() {
    document.querySelectorAll("[data-sidebar-toggle], #sidebarToggle").forEach((button) => button.addEventListener("click", () => {
        uiState.sidebarHidden = !uiState.sidebarHidden;
        saveUiState();
        applyUiState();
    }));

    document.getElementById("soundToggle").addEventListener("click", () => {
        uiState.soundEnabled = !uiState.soundEnabled;
        if (!uiState.soundEnabled) {
            stopSound("study");
        }
        saveUiState();
        applyUiState();
        showToast(uiState.soundEnabled ? "System sound enabled." : "System sound muted.");
    });

    document.getElementById("musicToggle").addEventListener("click", () => {
        uiState.musicEnabled = !uiState.musicEnabled;
        saveUiState();
        applyUiState();
        if (uiState.musicEnabled) {
            playBackgroundMusic();
        } else {
            pauseBackgroundMusic();
        }
        showToast(uiState.musicEnabled ? "Background music playing." : "Background music paused.");
    });

    document.getElementById("musicVolume").addEventListener("input", (event) => {
        uiState.musicVolume = Number(event.target.value);
        const audio = document.getElementById(AUDIO.bg);
        if (audio) {
            audio.volume = uiState.musicVolume;
        }
        saveUiState();
    });

    document.getElementById("quoteNextBtn").addEventListener("click", nextDailyQuote);
    document.getElementById("quoteVoiceBtn").addEventListener("click", speakDailyQuote);
    document.getElementById("quoteStopBtn").addEventListener("click", stopQuoteVoice);
    document.getElementById("songImport").addEventListener("change", handleSongImport);
    document.getElementById("openSpotifyBtn").addEventListener("click", openSpotifyLink);
    document.getElementById("resetSystemBtn").addEventListener("click", resetSystemProgress);
    document.getElementById("goalOpenBtn")?.addEventListener("click", openGoalModal);
    document.getElementById("goalsOpenModalBtn")?.addEventListener("click", openGoalModal);
    document.getElementById("goalCloseBtn")?.addEventListener("click", closeGoalModal);
    document.getElementById("focusStartBtn")?.addEventListener("click", startFocusMode);
    document.getElementById("focusStopBtn")?.addEventListener("click", stopFocusMode);
    document.getElementById("quickNoteForm")?.addEventListener("submit", saveQuickNote);
    document.getElementById("openFocusModalBtn")?.addEventListener("click", openFocusModal);
    document.getElementById("exitFocusModalBtn")?.addEventListener("click", closeFocusModal);
    document.getElementById("timerStartPauseBtn")?.addEventListener("click", toggleTimer);
    document.getElementById("timerStopBtn")?.addEventListener("click", stopFocusMode);
    document.getElementById("timerResetBtn")?.addEventListener("click", resetTimerConfig);
    document.getElementById("timerModalResetBtn")?.addEventListener("click", resetTimerConfig);
    document.getElementById("natureSoundBtn")?.addEventListener("click", toggleNatureSound);
    document.getElementById("timerMode")?.addEventListener("change", applyTimerModeDefaults);
    document.getElementById("wardrobeUploadTopBtn")?.addEventListener("click", () => document.getElementById("wardrobeFileInput")?.click());
    document.getElementById("wardrobeBrowseBtn")?.addEventListener("click", () => document.getElementById("wardrobeFileInput")?.click());
    document.getElementById("wardrobeDropzone")?.addEventListener("click", (event) => {
        if (!event.target.closest("button")) {
            document.getElementById("wardrobeFileInput")?.click();
        }
    });
    document.getElementById("wardrobeDropzone")?.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.currentTarget.classList.add("dragging");
    });
    document.getElementById("wardrobeDropzone")?.addEventListener("dragleave", (event) => {
        event.currentTarget.classList.remove("dragging");
    });
    document.getElementById("wardrobeDropzone")?.addEventListener("drop", handleWardrobeDrop);
    document.getElementById("wardrobeFileInput")?.addEventListener("change", handleWardrobeFileSelect);
    document.getElementById("wardrobeItemForm")?.addEventListener("submit", saveWardrobeItem);
    document.getElementById("wardrobeCancelEditBtn")?.addEventListener("click", clearWardrobeEditor);
    document.getElementById("wardrobeFilterBtn")?.addEventListener("click", () => document.getElementById("wardrobeFilterPanel")?.classList.toggle("hidden"));
    document.getElementById("wardrobeApplyFiltersBtn")?.addEventListener("click", applyWardrobeFilters);
    document.getElementById("wardrobeClearFiltersBtn")?.addEventListener("click", clearWardrobeFilters);
    document.getElementById("wardrobeSearch")?.addEventListener("input", (event) => {
        state.wardrobeFilters.search = event.target.value;
        renderWardrobeModule();
    });
    document.getElementById("wardrobeGridViewBtn")?.addEventListener("click", () => setWardrobeView(false));
    document.getElementById("wardrobeListViewBtn")?.addEventListener("click", () => setWardrobeView(true));
    document.getElementById("wardrobeGenerateCombosBtn")?.addEventListener("click", generateWardrobeCombos);
    document.getElementById("wardrobeTabs")?.addEventListener("click", handleWardrobeTab);
    document.getElementById("wardrobeGrid")?.addEventListener("click", handleWardrobeCardAction);
    document.getElementById("recentWardrobeItems")?.addEventListener("click", handleWardrobeCardAction);
    document.getElementById("wardrobeCombos")?.addEventListener("click", handleWardrobeComboAction);
    document.getElementById("timerMinutes")?.addEventListener("input", configureTimerFromInputs);
    document.getElementById("timerHours")?.addEventListener("input", configureTimerFromInputs);
    document.getElementById("notesForm")?.addEventListener("submit", saveFullNote);
    document.getElementById("notesList")?.addEventListener("click", handleNoteAction);
    document.getElementById("noteSearch")?.addEventListener("input", renderNotesScreen);
    document.getElementById("cancelNoteEditBtn")?.addEventListener("click", clearNoteEditor);
    document.getElementById("musicMasterToggle")?.addEventListener("click", toggleMusicPlayback);
    document.getElementById("musicPlayBtn")?.addEventListener("click", toggleMusicPlayback);
    document.getElementById("miniPlayBtn")?.addEventListener("click", toggleMusicPlayback);
    document.getElementById("dashboardMusicPlayBtn")?.addEventListener("click", toggleMusicPlayback);
    document.getElementById("musicNextBtn")?.addEventListener("click", nextTrack);
    document.getElementById("miniNextBtn")?.addEventListener("click", nextTrack);
    document.getElementById("dashboardMusicNextBtn")?.addEventListener("click", nextTrack);
    document.getElementById("musicPrevBtn")?.addEventListener("click", prevTrack);
    document.getElementById("miniPrevBtn")?.addEventListener("click", prevTrack);
    document.getElementById("musicShuffleBtn")?.addEventListener("click", toggleShuffle);
    document.getElementById("musicRepeatBtn")?.addEventListener("click", toggleRepeat);
    document.getElementById("musicLikeBtn")?.addEventListener("click", toggleLikeTrack);
    document.getElementById("musicUploadTrigger")?.addEventListener("click", () => document.getElementById("musicLocalUpload")?.click());
    document.getElementById("musicLocalUpload")?.addEventListener("change", handleSongImport);
    document.getElementById("clearQueueBtn")?.addEventListener("click", clearMusicQueue);
    document.querySelectorAll("[data-source-action]").forEach((button) => button.addEventListener("click", () => connectMusicSource(button.dataset.sourceAction)));
    document.getElementById("saveMusicLinkBtn")?.addEventListener("click", saveMusicSourceLink);
    document.getElementById("createPlaylistBtn")?.addEventListener("click", createCustomPlaylist);
    document.getElementById("closePlaylistModal")?.addEventListener("click", closePlaylistModal);
    document.getElementById("playPlaylistBtn")?.addEventListener("click", playActivePlaylist);
    document.getElementById("queuePlaylistBtn")?.addEventListener("click", queueActivePlaylist);
    document.getElementById("addCurrentToPlaylistBtn")?.addEventListener("click", addCurrentToActivePlaylist);
    document.getElementById("musicProgress")?.addEventListener("input", seekMusic);
    document.getElementById("miniProgress")?.addEventListener("input", seekMusic);
    document.getElementById("musicVolumeMain")?.addEventListener("input", updateMusicVolume);
    document.getElementById("miniVolume")?.addEventListener("input", updateMusicVolume);
    bindMusicAudioEvents();

    document.querySelectorAll("#dailyTrackerForm input, #dailyTrackerForm textarea, #dailyTrackerForm select").forEach((field) => {
        field.addEventListener("input", updateDailyTxpPreview);
        field.addEventListener("change", updateDailyTxpPreview);
    });

    document.getElementById("profileAvatar").addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file || !state) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            state.profile.avatar = reader.result;
            persistState();
            showToast("Avatar updated.");
        };
        reader.readAsDataURL(file);
    });

    document.getElementById("studyModeBtn").addEventListener("click", () => {
        uiState.studyMode = !uiState.studyMode;
        saveUiState();
        applyUiState();
        if (uiState.studyMode) {
            playSound("study");
            showToast("Study mode activated.");
        } else {
            stopSound("study");
            showToast("Study mode stopped.");
        }
    });

    document.getElementById("timetableImport").addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        importedTimetable = [];
        importedWeek = null;
        importedFile = file || null;
        document.getElementById("timetableImportName").textContent = file ? file.name : "No file selected";
        if (!file) {
            renderImportPreview("Choose a CSV, TXT, JSON, Excel export, or image first.");
            renderImportedWeek();
            return;
        }
        const parsed = await parseTimetableFile(file);
        importedTimetable = parsed.today || parsed.tasks || [];
        importedWeek = parsed.week || buildWeekFromTasks(importedTimetable);
        importedConfirmed = false;
        renderImportPreview();
        renderImportedWeek();
    });

    document.getElementById("importTimetableBtn").addEventListener("click", () => {
        confirmImportedTimetable();
    });

    document.getElementById("confirmImportedBtn").addEventListener("click", confirmImportedTimetable);
    document.getElementById("reimportBtn").addEventListener("click", () => document.getElementById("timetableImport").click());
    document.getElementById("removeImportedBtn").addEventListener("click", () => {
        importedTimetable = [];
        importedWeek = null;
        importedFile = null;
        importedConfirmed = false;
        if (state) {
            state.importedWeek = null;
            state.importedFileName = "";
            state.importStatus = "waiting";
            persistState();
        }
        document.getElementById("timetableImport").value = "";
        document.getElementById("timetableImportName").textContent = "Max file size: 10MB";
        renderImportPreview("Import removed. Choose a new timetable file.");
        renderImportedWeek();
        showToast("Imported timetable removed.");
    });

    document.getElementById("downloadTemplateBtn").addEventListener("click", () => {
        const template = "time,title,priority,category,txp\n06:00,Wake + water + sunlight,HIGH,Health,25\n09:00,Deep work study block,HIGH,Study / DSA,60\n";
        const blob = new Blob([template], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "kaalix-timetable-template.csv";
        link.click();
        URL.revokeObjectURL(link.href);
    });

    document.getElementById("addTimetableTaskBtn").addEventListener("click", () => {
        if (!state) {
            return;
        }
        state.timetable.push(createTask("09:00", "New KAALIX task", "MEDIUM", "Planning", 20, "manual"));
        state.systemSignals = unique([...(state.systemSignals || []), "Timetable task added manually."]).slice(-6);
        persistState();
        showToast("Editable timetable task added.");
    });

    document.getElementById("editableTimetable").addEventListener("click", (event) => {
        const remove = event.target.closest("[data-edit-remove]");
        const save = event.target.closest("[data-edit-save]");
        if (!state || (!remove && !save)) {
            return;
        }
        const id = (remove || save).dataset.taskId;
        if (remove) {
            state.timetable = state.timetable.filter((task) => task.id !== id);
            state.systemSignals = unique([...(state.systemSignals || []), "Removed one timetable task."]).slice(-6);
            state.report = localDailyReport();
            persistState();
            showToast("Task removed and connected modules updated.");
            return;
        }
        const row = save.closest(".editable-row");
        const task = state.timetable.find((item) => item.id === id);
        if (!task || !row) {
            return;
        }
        task.time = normalizeTime(row.querySelector("[data-field='time']").value) || task.time;
        task.title = row.querySelector("[data-field='title']").value.trim() || task.title;
        task.priority = normalizePriority(row.querySelector("[data-field='priority']").value);
        task.category = row.querySelector("[data-field='category']").value.trim() || "Planning";
        task.xp = Number(row.querySelector("[data-field='xp']").value || 20);
        state.timetable.sort((left, right) => left.time.localeCompare(right.time));
        state.systemSignals = unique([...(state.systemSignals || []), `Revised timetable task: ${task.title}`]).slice(-6);
        state.report = localDailyReport();
        persistState();
        showToast("Timetable revised everywhere.");
    });
}

async function confirmImportedTimetable() {
    if (!state) {
        return;
    }
    if (!importedTimetable.length) {
        showToast("No timetable rows ready to import.");
        return;
    }
    setConfirmLoading(true);
    try {
        await pause(250);
        state.importedWeek = importedWeek || buildWeekFromTasks(importedTimetable);
        state.importedFileName = importedFile?.name || "Generated timetable";
        state.importStatus = "confirmed";
        importedConfirmed = true;
        state.timetable = todayTasksFromWeek(state.importedWeek).map((task) => ({
            ...task,
            id: uid(),
            status: "pending",
            rewarded: false,
            source: "confirmed-import"
        }));
        const wakeTask = state.timetable.find((task) => /wake/i.test(task.title));
        if (wakeTask?.time) {
            state.profile.plannedWakeTime = wakeTask.time;
            state.dailyLog.wakeTime = state.dailyLog.wakeTime || wakeTask.time;
        }
        state.systemSignals = unique([
            ...(state.systemSignals || []),
            `Confirmed imported timetable. ${state.timetable.length} tasks now drive today's plan.`,
            `What-now logic recalculated from ${state.importedFileName}.`
        ]).slice(-6);
        state.report = localDailyReport();
        persistState();
        playSound("task");
        renderImportedWeek(true);
        showToast("Timetable confirmed and reflected on dashboard.");
    } catch (error) {
        showToast("Timetable confirmation failed. Try re-importing.");
    } finally {
        setConfirmLoading(false);
    }
}

function createDefaultState(user) {
    return {
        profile: {
            name: user.name,
            email: user.email,
            username: user.username || user.email.split("@")[0],
            title: "The Disciplined Strategist",
            mission: "Become disciplined, calm, strategic, and consistently improving.",
            plannedWakeTime: "06:00",
            plannedSleepTime: "22:30",
            avatar: "",
            themePreference: "monarch",
            bodyType: "",
            fitnessStats: "",
            relationshipStatus: "",
            lifestyleHabits: "",
            customAttributes: ""
        },
        dailyLog: {
            ...EMPTY_DAILY_LOG
        },
        studySessions: [],
        reels: [],
        socialLogs: [],
        emotionLogs: [],
        wardrobeLogs: [],
        wardrobeItems: [],
        outfitCombos: [],
        wardrobeFilters: { category: "All Items", color: "", occasion: "", season: "", favorite: false, rating: "", search: "", listView: false },
        notes: [],
        focusSessions: [],
        timetable: defaultTimetable(),
        report: null,
        lastDailyDate: todayKey(),
        progression: {
            level: 1,
            rank: "E",
            txp: 0,
            dailyTXP: 0,
            totalTXP: 0,
            nextLevelXP: 127,
            nextLevelTXP: 127,
            streak: 0,
            score: 0,
            tier: "Beginner",
            progressPercentage: 0,
            rankColor: "#94a3b8",
            levelTitle: "Beginner LVL 1"
        },
        importedWeek: null,
        importStatus: "waiting",
        importedFileName: "",
        systemSignals: ["High-priority tasks stay protected when your day slips."]
    };
}

function defaultTimetable() {
    return [
        createTask("06:00", "Wake + water + sunlight", "HIGH", "Health", 25, "core"),
        createTask("06:30", "Workout / mobility", "HIGH", "Fitness", 35, "core"),
        createTask("07:30", "Journal + plan the day", "MEDIUM", "Mindset", 20, "core"),
        createTask("09:00", "Deep work study block", "HIGH", "Study / DSA", 60, "core"),
        createTask("14:00", "DSA practice", "HIGH", "Study / DSA", 80, "core"),
        createTask("17:30", "Reading / reflection", "MEDIUM", "Books / Reading", 25, "core"),
        createTask("19:00", "Walk or social recharge", "MEDIUM", "Social", 15, "core"),
        createTask("22:30", "Sleep", "HIGH", "Recovery", 30, "core")
    ];
}

function createTask(time, title, priority, category, TXP, source) {
    return { id: uid(), time, title, priority, category, xp: TXP, source, status: "pending", rewarded: false };
}

function persistState() {
    if (!currentUser || !state) {
        return;
    }
    localStorage.setItem(STORAGE_PREFIX + currentUser.email, JSON.stringify(state));
    renderAll();
}

function loadState(email) {
    const raw = localStorage.getItem(STORAGE_PREFIX + email);
    if (!raw) {
        return createDefaultState(currentUser);
    }
    try {
        const parsed = JSON.parse(raw);
        parsed.systemSignals = Array.isArray(parsed.systemSignals) ? parsed.systemSignals : [];
        parsed.timetable = Array.isArray(parsed.timetable) && parsed.timetable.length ? parsed.timetable : defaultTimetable();
        return normalizeState(parsed);
    } catch (error) {
        return createDefaultState(currentUser);
    }
}

function normalizeState(parsed) {
    const defaults = createDefaultState(currentUser);
    parsed.profile = parsed.profile || {};
    parsed.profile = { ...defaults.profile, ...parsed.profile };
    parsed.dailyLog = { ...defaults.dailyLog, ...(parsed.dailyLog || {}) };
    if (parsed.lastDailyDate !== todayKey()) {
        parsed.dailyLog = { ...EMPTY_DAILY_LOG };
        parsed.lastDailyDate = todayKey();
        if (Array.isArray(parsed.timetable)) {
            parsed.timetable = parsed.timetable.map((task) => ({ ...task, status: "pending" }));
        }
    }
    if (parsed.dailyLog.positiveActions === "Started the day with intent" && parsed.dailyLog.habits === "Water, journaling, focus block") {
        parsed.dailyLog.studyHours = 0;
        parsed.dailyLog.codingHours = 0;
        parsed.dailyLog.exerciseMinutes = 0;
        parsed.dailyLog.habits = "";
        parsed.dailyLog.positiveActions = "";
        parsed.dailyLog.habitChecklist = [];
        parsed.dailyLog.wakeTime = "";
        parsed.dailyLog.sleepTime = "";
    }
    parsed.studySessions = Array.isArray(parsed.studySessions) ? parsed.studySessions : [];
    parsed.reels = Array.isArray(parsed.reels) ? parsed.reels : [];
    parsed.socialLogs = Array.isArray(parsed.socialLogs) ? parsed.socialLogs : [];
    parsed.emotionLogs = Array.isArray(parsed.emotionLogs) ? parsed.emotionLogs : [];
    parsed.wardrobeLogs = Array.isArray(parsed.wardrobeLogs) ? parsed.wardrobeLogs : [];
    parsed.wardrobeItems = Array.isArray(parsed.wardrobeItems) ? parsed.wardrobeItems : [];
    parsed.outfitCombos = Array.isArray(parsed.outfitCombos) ? parsed.outfitCombos : [];
    parsed.wardrobeFilters = { ...defaults.wardrobeFilters, ...(parsed.wardrobeFilters || {}) };
    parsed.notes = Array.isArray(parsed.notes) ? parsed.notes : [];
    parsed.focusSessions = Array.isArray(parsed.focusSessions) ? parsed.focusSessions : [];
    parsed.importedWeek = parsed.importedWeek || null;
    parsed.importStatus = parsed.importStatus || "waiting";
    parsed.importedFileName = parsed.importedFileName || "";
    parsed.progression = { ...defaults.progression, ...(parsed.progression || {}) };
    parsed.timetable = parsed.timetable.map((task) => ({
        id: task.id || uid(),
        time: normalizeTime(task.time),
        title: task.title || task.task || "Imported task",
        priority: normalizePriority(task.priority),
        category: task.category || "Imported",
        xp: Number(task.xp ?? task.TXP ?? task.txp ?? 20),
        source: task.source || "local",
        status: task.status || "pending",
        rewarded: Boolean(task.rewarded)
    }));
    return parsed;
}

function loadUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(email) {
    localStorage.setItem(SESSION_KEY, email);
}

function restoreSession() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) {
        return;
    }
    const user = loadUsers().find((item) => item.email === email);
    if (!user) {
        return;
    }
    currentUser = user;
    state = loadState(email);
    finishLogin();
}

function finishLogin() {
    document.getElementById("authOverlay").classList.add("hidden");
    hydrateImportedTimetable();
    populateForms();
    renderAll();
    loadMusicLibrary();
    loadWardrobeLibrary();
    loadFriends();
    loadReels();
    if (uiState.musicEnabled) {
        playBackgroundMusic();
    }
    showDailyQuote();
    loadProgressionStatus();
}

function setAuthTab(tab) {
    document.querySelectorAll(".auth-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.authTab === tab);
    });
    document.getElementById("loginForm").classList.toggle("hidden", tab !== "login");
    document.getElementById("signupForm").classList.toggle("hidden", tab !== "signup");
}

function switchScreen(screen) {
    document.querySelectorAll(".nav-item").forEach((button) => {
        button.classList.toggle("active", button.dataset.screen === screen);
    });
    document.querySelectorAll(".screen").forEach((section) => {
        section.classList.toggle("active", section.id === `screen-${screen}`);
    });
    uiState.activeScreen = screen;
    saveUiState();
    if (screen === "study" && uiState.studyMode) {
        playSound("study");
    }
    renderMusicSystem();
}

function populateForms() {
    if (!state) {
        return;
    }
    document.getElementById("profileName").value = state.profile.name || "";
    document.getElementById("profileUsername").value = state.profile.username || "";
    document.getElementById("profileEmail").value = state.profile.email || currentUser?.email || "";
    document.getElementById("profileTitleInput").value = state.profile.title || "";
    document.getElementById("bodyType").value = state.profile.bodyType || "";
    document.getElementById("fitnessStats").value = state.profile.fitnessStats || "";
    document.getElementById("relationshipStatus").value = state.profile.relationshipStatus || "";
    document.getElementById("lifestyleHabits").value = state.profile.lifestyleHabits || "";
    document.getElementById("customAttributes").value = state.profile.customAttributes || "";
    document.getElementById("plannedWakeTime").value = state.profile.plannedWakeTime || "06:00";
    document.getElementById("plannedSleepTime").value = state.profile.plannedSleepTime || "22:30";
    document.getElementById("profileMission").value = state.profile.mission || "";
    document.getElementById("themePreference").value = state.profile.themePreference || "monarch";
    document.getElementById("prefMusic").checked = Boolean(uiState.musicEnabled);
    document.getElementById("prefQuoteVoice").checked = uiState.quoteVoiceEnabled !== false;
    document.getElementById("profileAvatarPreview").src = state.profile.avatar || "/assets/kaalix-logo.png";
    document.getElementById("wakeTime").value = state.dailyLog.wakeTime || "";
    document.getElementById("sleepTime").value = state.dailyLog.sleepTime || "";
    document.getElementById("studyHours").value = state.dailyLog.studyHours ?? 0;
    document.getElementById("codingHours").value = state.dailyLog.codingHours ?? 0;
    document.getElementById("exerciseMinutes").value = state.dailyLog.exerciseMinutes ?? 0;
    document.getElementById("dailyMood").value = state.dailyLog.mood || "Calm";
    document.getElementById("emotionTrigger").value = state.dailyLog.emotionTrigger || "";
    document.getElementById("emotionReaction").value = state.dailyLog.emotionReaction || "";
    document.getElementById("betterResponse").value = state.dailyLog.betterResponse || "";
    document.getElementById("habits").value = state.dailyLog.habits || "";
    document.getElementById("positiveActions").value = state.dailyLog.positiveActions || "";
    document.getElementById("negativeActions").value = state.dailyLog.negativeActions || "";
    document.getElementById("reflectionNote").value = state.dailyLog.reflectionNote || "";
    const checked = new Set(state.dailyLog.habitChecklist || []);
    document.querySelectorAll(".dailyHabitCheck").forEach((input) => {
        input.checked = checked.has(input.value);
    });
    updateDailyTxpPreview();
    document.getElementById("songName").textContent = uiState.songName || "Default background: Statue of God Theme.";
    document.getElementById("spotifyLink").value = uiState.spotifyLink || "";
    renderMusicSystem();
}

function calculateMetrics() {
    const studyMinutes = sum(state.studySessions, "timeSpent");
    const questionsSolved = sum(state.studySessions, "questionsSolved");
    const productiveReels = state.reels.filter((item) => item.productive).length;
    const distractingReels = state.reels.filter((item) => !item.productive).length;
    const positiveSocial = state.socialLogs.filter((item) => item.impact === "Positive").length;
    const negativeSocial = state.socialLogs.filter((item) => item.impact === "Negative").length;
    const emotionalRepairs = state.emotionLogs.filter((item) => item.betterResponse).length + (state.dailyLog.betterResponse ? 1 : 0);
    const styleSource = state.wardrobeItems?.length ? state.wardrobeItems : state.wardrobeLogs;
    const averageStyle = average(styleSource.map((item) => Number(item.rating || 0)));
    const positiveEntries = splitEntries(state.dailyLog.positiveActions);
    const negativeEntries = splitEntries(state.dailyLog.negativeActions);
    const habitCount = Array.isArray(state.dailyLog.habitChecklist) ? state.dailyLog.habitChecklist.length : 0;
    const doneTasks = state.timetable.filter((item) => item.status === "done").length;
    const skippedTasks = state.timetable.filter((item) => item.status === "skip").length;
    const hasDailyActivity = Number(state.dailyLog.studyHours || 0) > 0
        || Number(state.dailyLog.codingHours || 0) > 0
        || Number(state.dailyLog.exerciseMinutes || 0) > 0
        || positiveEntries.length > 0
        || negativeEntries.length > 0
        || habitCount > 0
        || doneTasks > 0
        || Boolean(state.dailyLog.wakeTime);
    const onTimeBonus = hasDailyActivity && state.dailyLog.wakeTime && minutesBetween(state.profile.plannedWakeTime, state.dailyLog.wakeTime) <= 15 ? 20 : 0;

    const completedTaskXp = state.timetable
        .filter((item) => item.status === "done")
        .reduce((total, item) => total + Number(item.xp ?? item.TXP ?? 0), 0);
    const workoutBlocks = Math.floor(Number(state.dailyLog.exerciseMinutes || 0) / 20);
    const activityXp = clampNumber(Math.round(
        Number(state.dailyLog.studyHours || 0) * 20
        + Number(state.dailyLog.codingHours || 0) * 15
        + workoutBlocks * 15
        + studyMinutes * 0.25
        + questionsSolved * 3
        + habitCount * 5
        + positiveEntries.length * 10
        + completedTaskXp
        + productiveReels * 10
        + positiveSocial * 8
        + emotionalRepairs * 6
        + averageStyle * 5
        + (onTimeBonus ? 10 : 0)
        - negativeEntries.length * 20
        - distractingReels * 18
        - skippedTasks * 15
        - negativeSocial * 10
    ), 0, 999999);
    const progression = state.progression || {};
    const level = Number(progression.level || 1);
    const xpProgress = Number(progression.txp ?? activityXp);
    const xpNeeded = Number(progression.nextLevelXP || calculateNextLevelXP(level));
    const productivityScore = clampNumber(Math.round(
        Number(state.dailyLog.studyHours || 0) * 12
        + Number(state.dailyLog.codingHours || 0) * 10
        + doneTasks * 5
        + productiveReels * 3
        + onTimeBonus / 2
        - negativeEntries.length * 7
        - distractingReels * 6
        - skippedTasks * 4
    ), 0, 100);

    return {
        xp: xpProgress,
        level,
        xpProgress,
        xpNeeded,
        productivityScore,
        productiveReels,
        distractingReels,
        stats: {
            Discipline: clampNumber(Math.round(Number(state.dailyLog.studyHours || 0) * 7 + habitCount * 2 + doneTasks * 2 - skippedTasks * 3 + onTimeBonus / 5), 0, 99),
            Focus: clampNumber(Math.round(Number(state.dailyLog.studyHours || 0) * 8 + doneTasks * 3 - negativeEntries.length * 5), 0, 99),
            Strength: clampNumber(Math.round(Number(state.dailyLog.exerciseMinutes || 0) / 3 + productiveReels), 0, 99),
            Intelligence: clampNumber(Math.round(studyMinutes / 12 + questionsSolved * 2 + productiveReels + Number(state.dailyLog.codingHours || 0) * 6), 0, 99),
            Emotion: clampNumber(Math.round(emotionalRepairs * 8 + (hasDailyActivity && state.dailyLog.mood === "Calm" ? 5 : 0) - (state.dailyLog.mood === "Angry" ? 6 : 0)), 0, 99),
            Social: clampNumber(Math.round(positiveSocial * 8 - negativeSocial * 4), 0, 99),
            Style: clampNumber(Math.round(averageStyle * 12 + state.reels.filter((item) => item.category === "Fashion / Outfit").length * 2), 0, 99)
        }
    };
}

function adaptTimetableFromDailyLog() {
    const delay = minutesBetween(state.profile.plannedWakeTime, state.dailyLog.wakeTime);
    const signals = [];
    if (delay > 30) {
        state.timetable = state.timetable.map((task) => {
            if (task.status === "done") {
                return task;
            }
            return { ...task, time: shiftTime(task.time, delay) };
        });
        const lowPriorityIndex = state.timetable.findIndex((task) => task.priority === "LOW" && task.status !== "done");
        if (lowPriorityIndex >= 0) {
            const removed = state.timetable.splice(lowPriorityIndex, 1)[0];
            signals.push(`Removed low-priority task: ${removed.title}`);
        }
        signals.push(`Wake-up delay ${delay} min. Schedule shifted forward.`);
    }
    const negatives = splitEntries(state.dailyLog.negativeActions);
    if (negatives.length >= 2) {
        signals.push("Negative pattern detected. Reduce distractions tomorrow.");
    }
    if (state.dailyLog.studyHours < 2) {
        signals.push("Study volume is low. Protect an early deep-work block.");
    }
    state.systemSignals = unique([...(state.systemSignals || []), ...signals]).slice(-6);
    state.timetable.sort((left, right) => left.time.localeCompare(right.time));
}

async function checkHealth() {
    try {
        const response = await fetch("/api/health");
        if (!response.ok) {
            throw new Error("Health check failed");
        }
        document.getElementById("healthChip").textContent = "API online";
    } catch (error) {
        document.getElementById("healthChip").textContent = "Frontend mode";
    }
}

async function analyzeReel(payload) {
    try {
        const response = await fetch("/api/reels/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: payload.userId || currentUser?.email || "local",
                platform: payload.platform || "Other Website",
                url: payload.url || payload.link,
                caption: payload.caption || "",
                notes: payload.notes || "",
                title: payload.title || ""
            })
        });
        if (!response.ok) {
            throw new Error("API failed");
        }
        return normalizeReelResponse(await response.json());
    } catch (error) {
        return localAnalyzeReel(payload);
    }
}

async function generateDailyReport(currentState) {
    try {
        const response = await fetch("/api/report/daily", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentState)
        });
        if (!response.ok) {
            throw new Error("API failed");
        }
        return await response.json();
    } catch (error) {
        return localDailyReport();
    }
}

function addInsightTask(reel, silent) {
    if (!reel.affectTimetable) {
        if (!silent) {
            showToast("This reel is better kept as insight, not a timetable task.");
        }
        return;
    }
    const title = reel.suggestedTaskTitle || reel.actionItem || "Insight task";
    const exists = state.timetable.some((task) => task.title.toLowerCase() === title.toLowerCase());
    if (exists) {
        if (!silent) {
            showToast("This timetable suggestion already exists.");
        }
        return;
    }
    state.timetable.push({
        id: uid(),
        time: windowToTime(reel.suggestedTimeWindow),
        title,
        priority: reel.priorityLevel || "MEDIUM",
        category: reel.category || "Insight",
        status: "pending",
        xp: reel.suggestedDurationMinutes || 20,
        source: "reel"
    });
    state.timetable.sort((left, right) => left.time.localeCompare(right.time));
    state.systemSignals = unique([...(state.systemSignals || []), `${reel.category}: ${title}`]).slice(-6);
    if (!silent) {
        showToast(`Added: ${title}`);
    }
}

function renderAll() {
    if (!state) {
        return;
    }
    const metrics = calculateMetrics();
    renderHero(metrics);
    renderStats(metrics);
    renderNow(metrics);
    renderCurrentTaskSummary(metrics);
    renderSchedule();
    renderInsightSuggestions();
    renderStudySessions();
    renderLatestAnalysis();
    renderReelLibrary();
    renderSocialLogs();
    renderStyleLogs();
    renderAnalytics(metrics);
    renderReport();
    renderEditableTimetable();
    renderProgression(metrics);
    renderStatusPanel(metrics);
    renderGoalSystem();
    renderPersonalProfileSummary();
    renderQuickNotes();
    renderStreakPanels();
    renderNotesScreen();
    renderAnalyticsScreen(metrics);
    renderFocusTimer();
    renderImportedWeek(state.importStatus === "confirmed");
    renderMusicSystem();
    showDailyQuote();
}

function renderHero(metrics) {
    document.getElementById("heroName").textContent = (state.profile.name || "Hunter").toUpperCase();
    document.getElementById("heroMission").textContent = state.profile.mission || "";
    document.getElementById("levelBadge").textContent = `LVL ${metrics.level}`;
    document.getElementById("todayLabel").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    document.getElementById("profileTitle").textContent = state.profile.title || "The Disciplined Strategist";
    document.getElementById("xpReadout").textContent = `${metrics.xpProgress} / ${metrics.xpNeeded} TXP`;
    document.getElementById("xpBar").style.width = `${(metrics.xpProgress / metrics.xpNeeded) * 100}%`;
}

function renderProgression(metrics) {
    const progression = state.progression || {};
    const level = progression.level || metrics.level;
    const rank = progression.rank || "E";
    const next = progression.nextLevelXP || metrics.xpNeeded;
    const txp = progression.txp ?? metrics.xpProgress;
    const progress = progression.progressPercentage ?? Math.round((txp / Math.max(1, next)) * 100);
    document.getElementById("levelBadge").textContent = `LVL ${level} ${progression.tier || ""}`.trim();
    const rankBadge = document.getElementById("rankBadge");
    if (rankBadge) {
        rankBadge.textContent = `RANK ${rank.replaceAll("_", " ")}`;
        rankBadge.style.borderColor = progression.rankColor || "";
        rankBadge.style.boxShadow = `0 0 18px ${progression.rankColor || "rgba(167,139,250,.45)"}`;
    }
    document.getElementById("xpReadout").textContent = `${txp} / ${next} TXP`;
    document.getElementById("xpBar").style.width = `${clampNumber(progress, 0, 100)}%`;
}

function renderStatusPanel(metrics) {
    const progression = state.progression || {};
    const level = progression.level || metrics.level || 1;
    const txp = progression.txp ?? metrics.xpProgress ?? 0;
    const next = progression.nextLevelXP || metrics.xpNeeded || calculateNextLevelXP(level);
    const score = progression.score ?? metrics.productivityScore ?? 0;
    const rank = String(progression.rank || "E").replace("_", " ");
    const energy = clampNumber(100 - splitEntries(state.dailyLog.negativeActions).length * 12 - state.timetable.filter((task) => task.status === "skip").length * 8, 10, 100);
    const focus = clampNumber(metrics.stats?.Focus ?? score, 0, 100);
    const hp = clampNumber(80 + (state.dailyLog.mood === "Calm" ? 10 : 0) - (state.dailyLog.mood === "Angry" ? 20 : 0), 20, 100);
    setText("statusLevel", level);
    setText("statusRank", rank);
    setText("statusTxp", `${txp} / ${next} total ${progression.totalTXP ?? 0}`);
    setText("statusEnergy", `${energy}%`);
    setText("statusFocus", `${focus}%`);
    setText("statusHp", `${hp}%`);
    setText("identityValue", identityFor(level, progression.rank || "E"));
    const cap = document.getElementById("statusRankCap");
    if (cap) {
        cap.textContent = `Max rank now: ${rankCapForLevel(level)}`;
    }
}

function renderGoalSystem() {
    const tasks = [...state.timetable].sort((left, right) => left.time.localeCompare(right.time));
    const done = tasks.filter((task) => task.status === "done").length;
    setText("goalSummaryValue", `${done}/${tasks.length}`);
    const html = tasks.length ? tasks.map((task) => {
        const progress = task.status === "done" ? 100 : task.status === "skip" ? 0 : 35;
        return `
            <div class="goal-row ${task.status === "done" ? "completed" : ""}">
                <label class="check-row"><input type="checkbox" data-goal-task="${task.id}" ${task.status === "done" ? "checked" : ""}> ${task.time} - ${task.title}</label>
                <div class="goal-progress"><span style="width:${progress}%"></span></div>
                <small>${task.priority || "MEDIUM"} | ${task.category || "General"} | +${taskRewardAmount(task)} TXP</small>
            </div>
        `;
    }).join("") : `<div class="empty-state">No quests yet. Import or add timetable tasks first.</div>`;
    ["goalQuestList", "goalsPageList"].forEach((id) => {
        const list = document.getElementById(id);
        if (list) list.innerHTML = html;
    });
}

function renderPersonalProfileSummary() {
    const box = document.getElementById("personalProfileSummary");
    if (!box) {
        return;
    }
    const items = [
        ["Body", state.profile.bodyType || "Not set"],
        ["Fitness", state.profile.fitnessStats || "Not set"],
        ["Relationship", state.profile.relationshipStatus || "Not set"],
        ["Lifestyle", state.profile.lifestyleHabits || "Not set"],
        ["Attributes", state.profile.customAttributes || "Discipline in progress"],
        ["Sleep Target", `${state.profile.plannedWakeTime || "06:00"} -> ${state.profile.plannedSleepTime || "22:30"}`]
    ];
    box.innerHTML = items.map(([label, value]) => `<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function renderQuickNotes() {
    const list = document.getElementById("quickNotesList");
    if (!list) {
        return;
    }
    const notes = state.notes || [];
    list.innerHTML = notes.slice(0, 4).map((note) => `
        <div class="list-item">
            <div class="task-row"><strong>${escapeHtml(note.text)}</strong><span class="tag">${escapeHtml(note.category)}</span></div>
            <div class="task-meta"><span>${new Date(note.createdAt).toLocaleString()}</span></div>
        </div>
    `).join("") || `<div class="empty-state">No notes yet.</div>`;
}

function renderStreakPanels() {
    const streak = Number(state.progression?.streak || 0);
    const best = Math.max(streak, Number(state.bestStreak || 0));
    state.bestStreak = best;
    const done = state.timetable.filter((task) => task.status === "done").length;
    const total = state.timetable.length;
    setText("dashStreak", streak);
    setText("streakCurrent", streak);
    setText("bestStreak", best);
    setText("streakGoalCount", `${done}/${total}`);
    setText("streakBonus", streak >= 30 ? "200 TXP" : streak >= 7 ? "50 TXP" : streak >= 3 ? "20 TXP" : "0 TXP");
    const html = Array.from({ length: 7 }, (_, index) => `<span class="${index < Math.min(7, streak) ? "active" : ""}">${["M","T","W","T","F","S","S"][index]}</span>`).join("");
    ["dashWeekStreak", "streakCalendar"].forEach((id) => {
        const node = document.getElementById(id);
        if (node) node.innerHTML = html;
    });
    const warning = done > 0 ? "Streak protected today." : "Complete one goal today to protect the streak.";
    setText("streakWarning", warning);
    setText("streakPanelWarning", warning);
}

function renderNotesScreen() {
    const list = document.getElementById("notesList");
    if (!list) return;
    const query = String(document.getElementById("noteSearch")?.value || "").toLowerCase();
    const notes = [...(state.notes || [])]
        .filter((note) => !query || `${note.text} ${note.category}`.toLowerCase().includes(query))
        .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || new Date(b.createdAt) - new Date(a.createdAt));
    setText("notesCount", `${notes.length}`);
    list.innerHTML = notes.map((note) => `
        <div class="list-item note-row ${note.pinned ? "pinned" : ""}">
            <div class="task-row"><strong>${note.pinned ? "PIN " : ""}${escapeHtml(note.text)}</strong><span class="tag">${escapeHtml(note.category)}</span></div>
            <div class="task-meta"><span>${new Date(note.createdAt).toLocaleString()}</span></div>
            <div class="task-actions">
                <button class="small-btn" data-note-action="pin" data-note-id="${note.id}">${note.pinned ? "Unpin" : "Pin"}</button>
                <button class="small-btn" data-note-action="edit" data-note-id="${note.id}">Edit</button>
                <button class="small-btn danger-btn" data-note-action="delete" data-note-id="${note.id}">Delete</button>
            </div>
        </div>
    `).join("") || `<div class="empty-state">No notes match your search.</div>`;
}

function renderAnalyticsScreen(metrics) {
    setText("analyticsTotalTxp", state.progression?.totalTXP ?? state.progression?.txp ?? 0);
    setText("analyticsProductivity", `${state.progression?.score ?? metrics.productivityScore}%`);
    setText("analyticsTasksDone", state.timetable.filter((task) => task.status === "done").length);
    setText("analyticsFocusSessions", (state.focusSessions || []).length);
    const box = document.getElementById("analyticsStatsGrid");
    if (box) {
        box.innerHTML = Object.entries(metrics.stats).map(([label, value]) => `
            <div class="stat-box"><div class="stat-value">${value}</div><div class="stat-label">${label}</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${value}%"></div></div></div>
        `).join("");
    }
}

function renderFocusTimer() {
    const total = Math.max(1, focusTotalSeconds || 1500);
    const elapsed = clampNumber(total - Math.max(0, focusRemainingSeconds), 0, total);
    const progress = Math.round((elapsed / total) * 100);
    const stage = focusStage(progress);
    setText("focusTimerReadout", formatSeconds(focusRemainingSeconds));
    setText("focusModalTime", formatSeconds(focusRemainingSeconds));
    setText("focusPlantStage", stage.name);
    setText("focusStageBadge", stage.name);
    setText("focusProgressPercent", `${progress}%`);
    setText("focusProgressHint", stage.hint);
    setText("focusModalMode", labelForTimerMode());
    setText("focusModalSession", `${labelForTimerMode()} Session`);
    const stateLabel = document.getElementById("focusState");
    if (stateLabel) {
        stateLabel.textContent = uiState.focusModeActive ? "Deep Work" : "Idle";
    }
    const ring = document.querySelector(".timer-ring");
    if (ring) ring.style.setProperty("--timer-progress", String(progress));
    const circle = document.getElementById("timerProgressCircle");
    if (circle) {
        const circumference = 2 * Math.PI * 94;
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference - (progress / 100) * circumference}`;
    }
    const plant = document.getElementById("plantVisual");
    if (plant) plant.className = `plant-visual stage-${stage.key}`;
    const startButton = document.getElementById("timerStartPauseBtn");
    if (startButton) startButton.textContent = uiState.focusModeActive ? "Pause" : focusRemainingSeconds < total ? "Resume" : "Start";
    const nature = document.getElementById("natureSoundBtn");
    if (nature) nature.textContent = uiState.natureSound ? "Nature Sounds On" : "Nature Sounds Off";
    document.body.classList.toggle("focus-mode-active", Boolean(uiState.focusModeActive));
}

function focusStage(progress) {
    if (progress >= 75) return { key: "bloom", name: "Bloom", hint: "Your focus is blooming. Finish clean." };
    if (progress >= 50) return { key: "growth", name: "Growth", hint: "Momentum is building. Stay with it." };
    if (progress >= 25) return { key: "sprout", name: "Sprout", hint: "The session is taking root." };
    return { key: "seedling", name: "Seedling", hint: "Stay focused and help your plant grow." };
}

function labelForTimerMode() {
    const mode = document.getElementById("timerMode")?.value || "focus";
    return {
        focus: "Focus Timer",
        pomodoro: "Pomodoro Timer",
        deep: "Deep Work",
        custom: "Custom Timer"
    }[mode] || "Focus Timer";
}

function calculateTimerReward(minutes) {
    return Math.max(5, Math.round(Number(minutes || 0) * 1.5));
}

function renderStats(metrics) {
    const statsGrid = document.getElementById("statsGrid");
    statsGrid.innerHTML = Object.entries(metrics.stats).map(([label, value]) => `
        <div class="stat-box">
            <div class="stat-value">${value}</div>
            <div class="stat-label">${label}</div>
        </div>
    `).join("");
}

function renderCurrentTaskSummary(metrics) {
    const container = document.getElementById("currentTaskSummary");
    if (!container) {
        return;
    }
    const pending = [...state.timetable]
        .filter((item) => item.status === "pending")
        .sort((left, right) => left.time.localeCompare(right.time));
    const currentMinutes = timeToMinutes(new Date().toTimeString().slice(0, 5));
    const task = pending.find((item) => timeToMinutes(item.time) >= currentMinutes - 60) || pending[0];
    if (!task) {
        container.innerHTML = `<div class="empty-state">No current task. Add or import your timetable in Time Engine.</div>`;
        return;
    }
    container.innerHTML = `
        <div class="list-item current-task-only">
            <div class="task-row">
                <strong>${task.time} - ${task.title}</strong>
                <span class="priority-pill ${String(task.priority || "medium").toLowerCase()}">${task.priority || "MEDIUM"}</span>
            </div>
            <div class="task-meta">
                <span>${task.category || "General"}</span>
                <span>+${Number(task.xp ?? task.TXP ?? 0)} TXP</span>
                <span>${metrics.productivityScore}% day progress</span>
            </div>
            <div class="task-actions">
                <button class="small-btn" data-task-action="done" data-task-id="${task.id}" data-state="done">Complete</button>
                <button class="small-btn" data-task-action="skip" data-task-id="${task.id}" data-state="skip">Skip</button>
                <button class="primary-btn" data-start-task-timer="${task.id}">Start Now</button>
            </div>
        </div>
    `;
}

function renderNow(metrics) {
    const pending = [...state.timetable]
        .filter((item) => item.status === "pending")
        .sort((left, right) => left.time.localeCompare(right.time));
    const currentMinutes = timeToMinutes(new Date().toTimeString().slice(0, 5));
    const currentTask = pending.find((item) => timeToMinutes(item.time) >= currentMinutes - 60) || pending[0];
    const fallback = metrics.productivityScore < 50
        ? { title: "Recover focus with one 45-minute study block", reason: "Productivity is dipping. Protect one useful block before anything else.", window: "Recovery mode", xp: "+45 TXP" }
        : { title: "Review tomorrow and wind down cleanly", reason: "Core work looks steady. Close the day without chaos.", window: "System maintenance", xp: "+20 TXP" };
    const suggestion = currentTask
        ? { title: currentTask.title, reason: `Priority: ${currentTask.priority} - ${currentTask.category}`, window: `${currentTask.time} scheduled`, xp: `+${Number(currentTask.xp ?? currentTask.TXP ?? 20)} TXP` }
        : fallback;
    document.getElementById("nowTaskTitle").textContent = suggestion.title;
    document.getElementById("nowTaskReason").textContent = suggestion.reason;
    document.getElementById("nowTaskWindow").textContent = suggestion.window;
    document.getElementById("nowTaskXp").textContent = suggestion.xp;
    document.getElementById("adaptationText").textContent = state.systemSignals?.[state.systemSignals.length - 1] || "System is ready to adapt.";
    setRenderedHtml("scheduleSignals", (state.systemSignals || []).map((item) => `<span class="signal-chip">${item}</span>`).join(""));
}

function renderSchedule() {
    const containers = getRenderedTargets("scheduleList");
    if (!state.timetable.length) {
        containers.forEach((container) => container.innerHTML = `<div class="empty-state">No tasks yet.</div>`);
        return;
    }
    const html = state.timetable
        .sort((left, right) => left.time.localeCompare(right.time))
        .map((task) => `
            <div class="list-item">
                <div class="task-row">
                    <strong>${task.time} - ${task.title}</strong>
                    <span class="priority-pill ${String(task.priority || "medium").toLowerCase()}">${task.priority || "MEDIUM"}</span>
                </div>
                <div class="task-meta">
                    <span>${task.category || "General"}</span>
                    <span>Status: ${task.status}</span>
                    <span>+${Number(task.xp ?? task.TXP ?? 0)} TXP</span>
                </div>
                <div class="task-actions">
                    <button class="small-btn" data-task-action="done" data-task-id="${task.id}" data-state="done">Done</button>
                    <button class="small-btn" data-task-action="pending" data-task-id="${task.id}">Reset</button>
                    <button class="small-btn" data-task-action="skip" data-task-id="${task.id}" data-state="skip">Skip</button>
                </div>
            </div>
        `).join("");
    containers.forEach((container) => container.innerHTML = html);
}

function renderEditableTimetable() {
    const container = document.getElementById("editableTimetable");
    if (!container) {
        return;
    }
    if (!state.timetable.length) {
        container.innerHTML = `<div class="empty-state">No timetable tasks yet. Add one to make this your main plan.</div>`;
        return;
    }
    container.innerHTML = [...state.timetable]
        .sort((left, right) => left.time.localeCompare(right.time))
        .map((task) => `
            <div class="editable-row">
                <input data-field="time" type="time" value="${task.time}">
                <input data-field="title" value="${escapeAttr(task.title)}" aria-label="Task title">
                <select data-field="priority" aria-label="Priority">
                    ${["HIGH", "MEDIUM", "LOW"].map((priority) => `<option ${priority === task.priority ? "selected" : ""}>${priority}</option>`).join("")}
                </select>
                <input data-field="category" value="${escapeAttr(task.category || "Planning")}" aria-label="Category">
                <input data-field="xp" type="number" min="0" value="${Number(task.xp ?? 20)}" aria-label="TXP">
                <button class="small-btn" data-edit-save data-task-id="${task.id}" type="button">Save</button>
                <button class="ghost-btn danger-btn" data-edit-remove data-task-id="${task.id}" type="button">Remove</button>
            </div>
        `).join("");
}

function renderInsightSuggestions() {
    const container = document.getElementById("insightSuggestions");
    if (!container) {
        return;
    }
    const suggestions = state.reels.filter((item) => item.affectTimetable).slice(0, 5);
    if (!suggestions.length) {
        container.innerHTML = `<div class="empty-state">No reel-driven suggestions yet. Add a reel to start learning from content.</div>`;
        return;
    }
    container.innerHTML = suggestions.map((item) => `
        <div class="list-item">
            <strong>${item.category}</strong>
            <div class="mini-meta">
                <span>${item.actionItem}</span>
                <span>${item.priorityLevel}</span>
            </div>
        </div>
    `).join("");
}

function renderStudySessions() {
    const container = document.getElementById("studyList");
    if (!state.studySessions.length) {
        container.innerHTML = `<div class="empty-state">No study sessions logged yet.</div>`;
        return;
    }
    container.innerHTML = state.studySessions.slice(0, 6).map((session) => `
        <div class="list-item">
            <strong>${session.subject} - ${session.topic}</strong>
            <div class="task-meta">
                <span>${session.timeSpent} min</span>
                <span>${session.questionsSolved} solved</span>
                <span>${session.platform}</span>
                <span>${session.confidence} confidence</span>
            </div>
        </div>
    `).join("");
}

function renderLatestAnalysis() {
    const containers = getRenderedTargets("latestReelAnalysis");
    const latest = state.reels[0];
    if (!latest) {
        containers.forEach((container) => {
            container.className = "analysis-panel empty-state";
            container.innerHTML = "Paste a reel and the system will explain what it teaches, why it matters, what to apply, and what to avoid.";
        });
        return;
    }
    const html = `
        <div class="analysis-card">
            <div class="task-row">
                <strong>${latest.titleOrCaption || "Untitled insight"}</strong>
                <span class="tag">${latest.category}</span>
            </div>
            <div class="mini-meta">
                <span>${latest.platform}</span>
                <span>${latest.priorityLevel}</span>
                <span>${latest.productiveLabel}</span>
            </div>
            <p><strong>Meaning:</strong> ${latest.meaning}</p>
            <p><strong>Why useful:</strong> ${latest.usefulness}</p>
            <p><strong>Apply:</strong> ${latest.actionItem}</p>
            <p><strong>Avoid:</strong> ${latest.avoid}</p>
        </div>
    `;
    containers.forEach((container) => {
        container.className = "analysis-panel";
        container.innerHTML = html;
    });
}

function renderReelLibrary() {
    const container = document.getElementById("reelLibrary");
    if (!state.reels.length) {
        container.innerHTML = `<div class="empty-state">Your analyzed reels will appear here.</div>`;
        return;
    }
    container.innerHTML = state.reels.map((reel) => `
        <div class="analysis-card">
            <div class="reel-top">
                <strong>${reel.titleOrCaption || "Untitled insight"}</strong>
                <span class="tag">${reel.category}</span>
            </div>
            <div class="mini-meta">
                <span>${reel.platform}</span>
                <span>${reel.priorityLevel}</span>
                <span>${reel.productiveLabel}</span>
            </div>
            <p>${reel.summary}</p>
            <p><strong>Lesson:</strong> ${reel.lessonLearned}</p>
            <p><strong>Action:</strong> ${reel.actionItem}</p>
            <div class="task-actions">
                ${reel.affectTimetable ? `<button class="small-btn" data-reel-action="add" data-reel-id="${reel.id}">Add to timetable</button>` : ""}
                <button class="small-btn danger-btn" data-reel-action="delete" data-reel-id="${reel.id}">Delete</button>
            </div>
        </div>
    `).join("");
}

function renderSocialLogs() {
    const target = document.getElementById("socialList");
    if (!target) return;
    const logs = state.socialLogs || [];
    if (!logs.length) {
        target.innerHTML = `<div class="empty-state">No friends saved yet. Add one strong influence to begin.</div>`;
    } else {
        target.innerHTML = logs.map((item) => `
            <article class="friend-row">
                <img src="${item.photoUrl || "/assets/kaalix-logo.png"}" alt="${escapeHtml(item.person || item.name)}">
                <div class="friend-row-main">
                    <strong>${escapeHtml(item.person || item.name)}</strong>
                    <span>${escapeHtml(item.place || "Unknown place")}</span>
                    <div class="friend-tags">
                        <em class="impact-${String(item.impact || "Neutral").toLowerCase()}">${escapeHtml(item.impact || "Neutral")}</em>
                        ${(item.tags || "").split(",").filter(Boolean).slice(0, 2).map((tag) => `<em>${escapeHtml(tag.trim())}</em>`).join("")}
                    </div>
                    <p>${escapeHtml(item.enhancedLesson || item.lesson || "No lesson added.")}</p>
                </div>
                <div class="friend-row-actions">
                    <span>${formatDate(item.createdAt)}</span>
                    <button type="button" data-friend-action="edit" data-friend-id="${item.id}">Edit</button>
                    <button type="button" data-friend-action="delete" data-friend-id="${item.id}">Delete</button>
                </div>
            </article>
        `).join("");
    }
    const total = document.getElementById("friendTotalCount");
    if (total) total.textContent = `Total Interactions: ${logs.length}`;
}

function renderStyleLogs() {
    renderWardrobeModule();
}

async function loadFriends() {
    if (!state || !currentUser) return;
    try {
        const response = await fetch(`/api/friends?userId=${encodeURIComponent(currentUser.email)}`);
        if (!response.ok) throw new Error("Friends API failed");
        state.socialLogs = (await response.json()).map(normalizeFriendResponse);
        persistState();
    } catch (error) {
        renderSocialLogs();
    }
}

async function saveFriendLog(event) {
    event.preventDefault();
    if (!state || !currentUser) return;
    const name = document.getElementById("socialPerson").value.trim();
    if (!name) {
        showToast("Friend name is required.");
        return;
    }
    const id = document.getElementById("friendId").value;
    const payload = {
        userId: currentUser.email,
        photoUrl: document.getElementById("friendPhotoUrl").value,
        name,
        contactNumber: document.getElementById("friendContact").value.trim(),
        countryCode: document.getElementById("friendCountryCode").value,
        place: document.getElementById("socialPlace").value.trim(),
        impact: document.getElementById("socialImpact").value,
        lessonLearned: document.getElementById("socialLesson").value.trim(),
        enhancedLesson: document.getElementById("friendEnhancedLesson").value.trim(),
        tags: document.getElementById("friendTags").value.trim()
    };
    try {
        const response = await fetch(id ? `/api/friends/${id}` : "/api/friends", {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Friend save failed");
        const saved = normalizeFriendResponse(await response.json());
        state.socialLogs = id
            ? state.socialLogs.map((item) => String(item.id) === String(id) ? saved : item)
            : [saved, ...(state.socialLogs || [])];
        clearFriendForm();
        persistState();
        showToast("Friend saved.");
    } catch (error) {
        const local = normalizeFriendResponse({ id: id || `local-${uid()}`, ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        state.socialLogs = id
            ? state.socialLogs.map((item) => String(item.id) === String(id) ? local : item)
            : [local, ...(state.socialLogs || [])];
        clearFriendForm();
        persistState();
        showToast("Saved locally. Backend sync failed.");
    }
}

async function uploadFriendPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
        showToast("Use JPG, PNG, or WebP under 5MB.");
        event.target.value = "";
        return;
    }
    try {
        const form = new FormData();
        form.append("file", file);
        const response = await fetch("/api/friends/upload-photo", { method: "POST", body: form });
        if (!response.ok) throw new Error("Photo upload failed");
        const result = await response.json();
        setFriendPhoto(result.photoUrl);
        showToast("Friend photo uploaded.");
    } catch (error) {
        const reader = new FileReader();
        reader.onload = () => {
            setFriendPhoto(reader.result);
            showToast("Photo preview saved locally.");
        };
        reader.readAsDataURL(file);
    } finally {
        event.target.value = "";
    }
}

function setFriendPhoto(url) {
    document.getElementById("friendPhotoUrl").value = url || "";
    document.getElementById("friendPhotoPreview").src = url || "/assets/kaalix-logo.png";
}

function handleFriendAction(event) {
    const button = event.target.closest("[data-friend-action]");
    if (!button || !state) return;
    const item = state.socialLogs.find((entry) => String(entry.id) === String(button.dataset.friendId));
    if (!item) return;
    if (button.dataset.friendAction === "edit") {
        document.getElementById("friendId").value = item.id;
        setFriendPhoto(item.photoUrl);
        document.getElementById("socialPerson").value = item.person || item.name || "";
        document.getElementById("friendContact").value = item.contactNumber || "";
        document.getElementById("friendCountryCode").value = item.countryCode || "+91";
        document.getElementById("socialPlace").value = item.place || "";
        document.getElementById("socialImpact").value = item.impact || "Neutral";
        document.getElementById("socialLesson").value = item.lesson || item.lessonLearned || "";
        document.getElementById("friendEnhancedLesson").value = item.enhancedLesson || "";
        document.getElementById("friendTags").value = item.tags || "";
    }
    if (button.dataset.friendAction === "delete") {
        state.socialLogs = state.socialLogs.filter((entry) => String(entry.id) !== String(item.id));
        if (!String(item.id).startsWith("local")) {
            fetch(`/api/friends/${item.id}`, { method: "DELETE" }).catch(() => {});
        }
        persistState();
        showToast("Friend entry deleted.");
    }
}

function clearFriendForm() {
    document.getElementById("socialForm")?.reset();
    document.getElementById("friendId").value = "";
    setFriendPhoto("");
}

function exportFriendHistory() {
    const rows = [["Name", "Country Code", "Contact", "Place", "Impact", "Lesson", "Enhanced Lesson", "Tags", "Created"]];
    (state.socialLogs || []).forEach((item) => rows.push([
        item.person || item.name || "",
        item.countryCode || "",
        item.contactNumber || "",
        item.place || "",
        item.impact || "",
        item.lesson || item.lessonLearned || "",
        item.enhancedLesson || "",
        item.tags || "",
        item.createdAt || ""
    ]));
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kaalix-friends-history.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Friend history exported.");
}

function normalizeFriendResponse(item) {
    return {
        id: item.id,
        photoUrl: item.photoUrl || "",
        person: item.name || item.person || "",
        name: item.name || item.person || "",
        contactNumber: item.contactNumber || "",
        countryCode: item.countryCode || "+91",
        place: item.place || "",
        impact: item.impact || "Neutral",
        lesson: item.lessonLearned || item.lesson || "",
        lessonLearned: item.lessonLearned || item.lesson || "",
        enhancedLesson: item.enhancedLesson || "",
        tags: item.tags || "",
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString()
    };
}

async function loadReels() {
    if (!state || !currentUser) return;
    try {
        const response = await fetch(`/api/reels?userId=${encodeURIComponent(currentUser.email)}`);
        if (!response.ok) throw new Error("Reels API failed");
        state.reels = (await response.json()).map(normalizeReelResponse);
        persistState();
    } catch (error) {
        renderReelLibrary();
    }
}

function normalizeReelResponse(item) {
    return {
        id: item.id || uid(),
        reelLink: item.url || item.reelLink || "",
        link: item.url || item.reelLink || "",
        platform: item.platform || "Other Website",
        titleOrCaption: item.title || item.titleOrCaption || "Untitled insight",
        keywords: item.keywords || [],
        category: item.category || "Productivity",
        summary: item.summary || "",
        lessonLearned: item.lesson || item.lessonLearned || "",
        actionItem: item.actionItem || item.action_item || "",
        priorityLevel: item.priority || item.priorityLevel || "Medium",
        affectTimetable: Boolean(item.shouldUpdateTimetable ?? item.affectTimetable),
        productive: (item.category || "") !== "Negative / Time Waste",
        productiveLabel: (item.category || "") === "Negative / Time Waste" ? "Distraction Risk" : "Productive",
        suggestedTaskTitle: item.category || "Planning review",
        suggestedDurationMinutes: 20,
        suggestedTimeWindow: "Evening",
        createdAt: item.createdAt || new Date().toISOString()
    };
}

function handleReelPlatformSelect(event) {
    const button = event.target.closest("[data-platform]");
    if (!button) return;
    document.querySelectorAll(".platform-card").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.getElementById("reelPlatform").value = button.dataset.platform;
}

function renderWardrobeModule() {
    if (!state) return;
    const filters = state.wardrobeFilters || {};
    const items = filteredWardrobeItems();
    renderWardrobeTabs(filters.category || "All Items");
    renderWardrobeCounts();
    const title = document.getElementById("wardrobeGridTitle");
    if (title) title.textContent = `${filters.category || "All Items"} (${items.length})`;
    const grid = document.getElementById("wardrobeGrid");
    if (grid) {
        grid.classList.toggle("list-view", Boolean(filters.listView));
        grid.innerHTML = items.length ? items.map(renderWardrobeCard).join("") : `
            <div class="wardrobe-empty">
                <strong>Upload your first clothing item to build your virtual wardrobe.</strong>
                <p>Single clothes, multiple items, and messy outfit photos are supported by the placeholder AI workflow.</p>
            </div>`;
    }
    const recent = document.getElementById("recentWardrobeItems");
    if (recent) {
        recent.innerHTML = (state.wardrobeItems || []).slice(0, 5).map(renderRecentWardrobeItem).join("") || `<p class="muted">No recent items yet.</p>`;
    }
    const combos = document.getElementById("wardrobeCombos");
    if (combos) {
        combos.innerHTML = (state.outfitCombos || []).length
            ? state.outfitCombos.map(renderOutfitCombo).join("")
            : `<div class="wardrobe-empty small"><strong>No combos yet.</strong><p>Add at least one top, one bottom, and one shoe to generate outfit combos.</p></div>`;
    }
    const search = document.getElementById("wardrobeSearch");
    if (search && search.value !== (filters.search || "")) search.value = filters.search || "";
    document.getElementById("wardrobeGridViewBtn")?.classList.toggle("active", !filters.listView);
    document.getElementById("wardrobeListViewBtn")?.classList.toggle("active", Boolean(filters.listView));
}

function renderWardrobeTabs(active) {
    const target = document.getElementById("wardrobeTabs");
    if (!target) return;
    target.innerHTML = WARDROBE_CATEGORIES.map((category) => `
        <button class="${category === active ? "active" : ""}" type="button" data-wardrobe-category="${category}">${category}</button>
    `).join("");
}

function renderWardrobeCounts() {
    const target = document.getElementById("wardrobeCounts");
    if (!target) return;
    const counts = wardrobeCounts();
    const icons = { Shirts: "♕", Pants: "▥", Shoes: "⌁", Accessories: "◇", Watches: "◷", Jackets: "♜" };
    target.innerHTML = WARDROBE_COUNT_CATEGORIES.map((category) => `
        <button class="wardrobe-count-card" type="button" data-wardrobe-category="${category}">
            <span>${icons[category] || "◆"}</span>
            <div><small>${category}</small><strong>${counts[category] || 0}</strong><em>items</em></div>
        </button>
    `).join("");
}

function renderWardrobeCard(item) {
    return `
        <article class="wardrobe-card" data-wardrobe-id="${item.id}">
            <div class="wardrobe-thumb">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHtml(item.name)}">` : `<span>${categoryGlyph(item.category)}</span>`}
                <button class="wardrobe-menu" type="button" data-wardrobe-action="edit" data-wardrobe-id="${item.id}">⋮</button>
                <span class="wardrobe-badge">${item.category || "Other"}</span>
            </div>
            <div class="wardrobe-card-meta">
                <strong>${escapeHtml(item.name || "Wardrobe Item")}</strong>
                <span>${escapeHtml(item.color || "Unknown")} · ${escapeHtml(item.occasion || "Casual")}</span>
                <div class="wardrobe-card-actions">
                    <button type="button" data-wardrobe-action="favorite" data-wardrobe-id="${item.id}">${item.favorite ? "♥" : "♡"}</button>
                    <button type="button" data-wardrobe-action="edit" data-wardrobe-id="${item.id}">Edit</button>
                    <button type="button" data-wardrobe-action="delete" data-wardrobe-id="${item.id}">Delete</button>
                </div>
            </div>
        </article>`;
}

function renderRecentWardrobeItem(item) {
    return `
        <button class="recent-wardrobe-item" type="button" data-wardrobe-action="edit" data-wardrobe-id="${item.id}">
            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHtml(item.name)}">` : `<span>${categoryGlyph(item.category)}</span>`}
            <em>${item.category || "Item"}</em>
        </button>`;
}

function renderOutfitCombo(combo) {
    const items = combo.items || [];
    return `
        <article class="combo-card">
            <div class="combo-images">
                ${items.slice(0, 4).map((item) => item.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHtml(item.name)}">` : `<span>${categoryGlyph(item.category)}</span>`).join("")}
            </div>
            <div class="combo-copy">
                <div><strong>${escapeHtml(combo.name || "AI Combo")}</strong><span class="match-tag">${combo.matchScore || 0}% Match</span></div>
                <p>${escapeHtml(combo.aiReason || "Generated from your wardrobe colors and occasions.")}</p>
                <div class="combo-actions">
                    <button type="button" data-combo-action="save" data-combo-id="${combo.id}">${combo.saved ? "Saved" : "Save"}</button>
                    <button type="button" data-combo-action="delete" data-combo-id="${combo.id}">Remove</button>
                </div>
            </div>
        </article>`;
}

function filteredWardrobeItems() {
    const filters = state.wardrobeFilters || {};
    const search = (filters.search || "").toLowerCase();
    return (state.wardrobeItems || []).filter((item) => {
        const text = `${item.name} ${item.category} ${item.color} ${item.occasion} ${item.tags} ${item.notes}`.toLowerCase();
        return (!filters.category || filters.category === "All Items" || item.category === filters.category)
            && (!filters.color || sameText(item.color, filters.color))
            && (!filters.occasion || sameText(item.occasion, filters.occasion))
            && (!filters.season || sameText(item.season, filters.season))
            && (!filters.favorite || item.favorite)
            && (!filters.rating || Number(item.rating || 0) >= Number(filters.rating))
            && (!search || text.includes(search));
    });
}

function wardrobeCounts() {
    return (state.wardrobeItems || []).reduce((map, item) => {
        map[item.category] = (map[item.category] || 0) + 1;
        return map;
    }, {});
}

async function loadWardrobeLibrary() {
    if (!state || !currentUser) return;
    try {
        const userKey = encodeURIComponent(currentUser.email);
        const [itemsResponse, combosResponse] = await Promise.all([
            fetch(`/api/wardrobe/items?userKey=${userKey}`),
            fetch(`/api/wardrobe/outfits?userKey=${userKey}`)
        ]);
        if (!itemsResponse.ok || !combosResponse.ok) throw new Error("Wardrobe API unavailable");
        state.wardrobeItems = await itemsResponse.json();
        state.outfitCombos = await combosResponse.json();
        persistState();
    } catch (error) {
        renderWardrobeModule();
    }
}

async function handleWardrobeFileSelect(event) {
    await uploadWardrobeFiles(Array.from(event.target.files || []));
    event.target.value = "";
}

async function handleWardrobeDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("dragging");
    await uploadWardrobeFiles(Array.from(event.dataTransfer?.files || []));
}

async function uploadWardrobeFiles(files) {
    if (!state || !currentUser || !files.length) return;
    const valid = files.filter(validateWardrobeFile);
    if (!valid.length) return;
    const preview = document.getElementById("wardrobeUploadPreview");
    if (preview) preview.textContent = `Uploading ${valid.length} image(s)...`;
    const form = new FormData();
    form.append("userKey", currentUser.email);
    valid.forEach((file) => form.append("files", file));
    const details = readWardrobeForm();
    Object.entries(details).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) form.append(key, value);
    });
    try {
        const response = await fetch("/api/wardrobe/upload", { method: "POST", body: form });
        if (!response.ok) throw new Error(await response.text());
        const result = await response.json();
        state.wardrobeItems = uniqueWardrobeItems([...(result.items || []), ...(state.wardrobeItems || [])]);
        if (preview) preview.textContent = result.message || "Wardrobe image imported.";
        persistState();
        await generateWardrobeCombos(true);
        showToast("Wardrobe item imported.");
    } catch (error) {
        const localGroups = await Promise.all(valid.map(createLocalWardrobeItems));
        const localItems = localGroups.flat();
        state.wardrobeItems = uniqueWardrobeItems([...localItems, ...(state.wardrobeItems || [])]);
        if (preview) preview.textContent = "Backend unavailable. Saved locally.";
        persistState();
        await generateWardrobeCombos(true);
        showToast("Wardrobe saved locally. Backend sync failed.");
    }
}

function validateWardrobeFile(file) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        showToast("Use JPG, PNG, or WebP only.");
        return false;
    }
    if (file.size > 5 * 1024 * 1024) {
        showToast(`${file.name} is larger than 5MB.`);
        return false;
    }
    return true;
}

function createLocalWardrobeItems(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const details = readWardrobeForm();
            const detectedCategory = detectWardrobeCategory(file.name);
            const color = details.color || detectWardrobeColor(file.name);
            const categories = details.category ? [details.category] : (detectedCategory === "Others" ? ["Shirts", "Pants", "Shoes"] : [detectedCategory]);
            resolve(categories.map((category, index) => ({
                id: `local-${uid()}`,
                userId: currentUser.email,
                name: details.name || `${index ? ["Black Pant", "White Shoe"][index - 1] || category : `${color} ${category.replace(/s$/, "")}`}`,
                category,
                subCategory: category,
                color: index === 1 ? "Black" : index === 2 ? "White" : color,
                occasion: details.occasion || "Casual",
                season: details.season || "All Season",
                imageUrl: reader.result,
                originalImageUrl: reader.result,
                tags: details.tags || `${category}, ${color}`,
                notes: details.notes || "Local placeholder item.",
                rating: Number(details.rating || 4),
                favorite: Boolean(details.favorite),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })));
        };
        reader.readAsDataURL(file);
    });
}

async function saveWardrobeItem(event) {
    event.preventDefault();
    if (!state) return;
    const id = document.getElementById("wardrobeItemId").value;
    const existing = (state.wardrobeItems || []).find((item) => String(item.id) === String(id));
    if (!existing) {
        showToast("Upload an image first, then edit the item.");
        return;
    }
    const payload = readWardrobeForm();
    try {
        if (!String(id).startsWith("local")) {
            const response = await fetch(`/api/wardrobe/items/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Update failed");
            const updated = await response.json();
            state.wardrobeItems = state.wardrobeItems.map((item) => String(item.id) === String(id) ? updated : item);
        } else {
            Object.assign(existing, payload, { updatedAt: new Date().toISOString() });
        }
        clearWardrobeEditor();
        persistState();
        showToast("Wardrobe item saved.");
    } catch (error) {
        Object.assign(existing, payload, { updatedAt: new Date().toISOString() });
        clearWardrobeEditor();
        persistState();
        showToast("Saved locally. Backend sync failed.");
    }
}

function readWardrobeForm() {
    return {
        name: document.getElementById("wardrobeName")?.value.trim() || "",
        category: document.getElementById("wardrobeCategory")?.value || "",
        color: document.getElementById("wardrobeColor")?.value.trim() || "",
        occasion: document.getElementById("wardrobeOccasion")?.value || "Casual",
        season: document.getElementById("wardrobeSeason")?.value || "All Season",
        tags: document.getElementById("wardrobeNotes")?.value.trim() || "",
        notes: document.getElementById("wardrobeNotes")?.value.trim() || "",
        rating: Number(document.getElementById("wardrobeRating")?.value || 4),
        favorite: Boolean(document.getElementById("wardrobeFavorite")?.checked)
    };
}

function editWardrobeItem(item) {
    document.getElementById("wardrobeItemId").value = item.id;
    document.getElementById("wardrobeName").value = item.name || "";
    document.getElementById("wardrobeCategory").value = item.category || "";
    document.getElementById("wardrobeColor").value = item.color || "";
    document.getElementById("wardrobeOccasion").value = item.occasion || "Casual";
    document.getElementById("wardrobeSeason").value = item.season || "All Season";
    document.getElementById("wardrobeNotes").value = item.notes || item.tags || "";
    document.getElementById("wardrobeRating").value = item.rating || 4;
    document.getElementById("wardrobeFavorite").checked = Boolean(item.favorite);
    document.getElementById("wardrobeFormMode").textContent = "Editing";
}

function clearWardrobeEditor() {
    document.getElementById("wardrobeItemForm")?.reset();
    document.getElementById("wardrobeItemId").value = "";
    document.getElementById("wardrobeRating").value = "4";
    document.getElementById("wardrobeFormMode").textContent = "New Item";
}

function handleWardrobeTab(event) {
    const button = event.target.closest("[data-wardrobe-category]");
    if (!button || !state) return;
    state.wardrobeFilters.category = button.dataset.wardrobeCategory;
    persistState();
}

async function handleWardrobeCardAction(event) {
    const button = event.target.closest("[data-wardrobe-action]");
    if (!button || !state) return;
    const item = state.wardrobeItems.find((entry) => String(entry.id) === String(button.dataset.wardrobeId));
    if (!item) return;
    const action = button.dataset.wardrobeAction;
    if (action === "edit") {
        editWardrobeItem(item);
        return;
    }
    if (action === "favorite") {
        item.favorite = !item.favorite;
        try {
            if (!String(item.id).startsWith("local")) {
                await fetch(`/api/wardrobe/items/${item.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ favorite: item.favorite })
                });
            }
        } catch (error) {}
    }
    if (action === "delete") {
        state.wardrobeItems = state.wardrobeItems.filter((entry) => String(entry.id) !== String(item.id));
        try {
            if (!String(item.id).startsWith("local")) await fetch(`/api/wardrobe/items/${item.id}`, { method: "DELETE" });
        } catch (error) {}
    }
    persistState();
}

async function handleWardrobeComboAction(event) {
    const button = event.target.closest("[data-combo-action]");
    if (!button || !state) return;
    const id = button.dataset.comboId;
    if (button.dataset.comboAction === "save") {
        const combo = state.outfitCombos.find((item) => String(item.id) === String(id));
        if (combo) combo.saved = true;
        try { await fetch(`/api/wardrobe/outfits/${id}/save`, { method: "POST" }); } catch (error) {}
    }
    if (button.dataset.comboAction === "delete") {
        state.outfitCombos = state.outfitCombos.filter((item) => String(item.id) !== String(id));
        try { await fetch(`/api/wardrobe/outfits/${id}`, { method: "DELETE" }); } catch (error) {}
    }
    persistState();
}

async function generateWardrobeCombos(silent = false) {
    if (!state || !currentUser) return;
    const button = document.getElementById("wardrobeGenerateCombosBtn");
    if (button) button.disabled = true;
    try {
        const response = await fetch(`/api/wardrobe/generate-combos?userKey=${encodeURIComponent(currentUser.email)}`, { method: "POST" });
        if (!response.ok) throw new Error("Combo API failed");
        state.outfitCombos = await response.json();
    } catch (error) {
        state.outfitCombos = generateLocalWardrobeCombos();
    } finally {
        if (button) button.disabled = false;
        persistState();
        if (!silent) showToast(state.outfitCombos.length ? "AI outfit combos generated." : "Add clothes first to generate outfit combos.");
    }
}

function generateLocalWardrobeCombos() {
    const items = state.wardrobeItems || [];
    const tops = items.filter((item) => ["Shirts", "T-shirts", "Hoodies"].includes(item.category));
    const bottoms = items.filter((item) => ["Pants", "Jeans"].includes(item.category));
    const shoes = items.filter((item) => item.category === "Shoes");
    const watches = items.filter((item) => item.category === "Watches");
    if (!tops.length || !bottoms.length || !shoes.length) {
        const available = [tops[0], bottoms[0], shoes[0], watches[0], ...items].filter(Boolean);
        const unique = [];
        available.forEach((item) => {
            if (!unique.some((entry) => entry.id === item.id)) unique.push(item);
        });
        if (!unique.length) return [];
        const missing = [
            tops.length ? "" : "top",
            bottoms.length ? "" : "bottom",
            shoes.length ? "" : "shoes"
        ].filter(Boolean);
        return [{
            id: `local-combo-${uid()}`,
            name: "Assisted Combo Draft",
            items: unique.slice(0, 4),
            occasion: unique[0]?.occasion || "Casual",
            matchScore: Math.max(58, 84 - (missing.length * 8)),
            aiReason: missing.length
                ? `Draft created from available wardrobe items. Add ${missing.join(", ")} to unlock a complete outfit combo.`
                : "Draft created from your available wardrobe items.",
            saved: false,
            createdAt: new Date().toISOString()
        }];
    }
    return tops.slice(0, 4).map((top, index) => {
        const bottom = bottoms[index % bottoms.length];
        const shoe = shoes[index % shoes.length];
        const watch = watches[index % Math.max(1, watches.length)];
        const comboItems = [top, bottom, shoe, watch].filter(Boolean);
        return {
            id: `local-combo-${uid()}`,
            name: `${top.color || "Shadow"} ${bottom.category || "Combo"}`,
            items: comboItems,
            occasion: top.occasion || "Casual",
            matchScore: 86 + (index * 3),
            aiReason: `Clean ${top.occasion || "casual"} outfit using ${top.color || "neutral"} and ${bottom.color || "neutral"} tones.`,
            saved: false,
            createdAt: new Date().toISOString()
        };
    });
}

function applyWardrobeFilters() {
    if (!state) return;
    state.wardrobeFilters = {
        ...(state.wardrobeFilters || {}),
        category: document.getElementById("wardrobeFilterCategory").value,
        color: document.getElementById("wardrobeFilterColor").value.trim(),
        occasion: document.getElementById("wardrobeFilterOccasion").value.trim(),
        season: document.getElementById("wardrobeFilterSeason").value,
        rating: document.getElementById("wardrobeFilterRating").value,
        favorite: document.getElementById("wardrobeFilterFavorite").checked
    };
    persistState();
}

function clearWardrobeFilters() {
    state.wardrobeFilters = { category: "All Items", color: "", occasion: "", season: "", favorite: false, rating: "", search: "", listView: false };
    ["wardrobeFilterColor", "wardrobeFilterOccasion", "wardrobeFilterRating", "wardrobeSearch"].forEach((id) => {
        const input = document.getElementById(id);
        if (input) input.value = "";
    });
    document.getElementById("wardrobeFilterCategory").value = "All Items";
    document.getElementById("wardrobeFilterSeason").value = "";
    document.getElementById("wardrobeFilterFavorite").checked = false;
    persistState();
}

function setWardrobeView(listView) {
    state.wardrobeFilters.listView = listView;
    persistState();
}

function uniqueWardrobeItems(items) {
    const seen = new Set();
    return items.filter((item) => {
        const key = String(item.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function categoryGlyph(category) {
    return { Shirts: "♕", "T-shirts": "T", Pants: "▥", Jeans: "▥", Shoes: "⌁", Watches: "◷", Accessories: "◇", Jackets: "♜", Hoodies: "⌂", Others: "◆" }[category] || "◆";
}

function detectWardrobeCategory(name) {
    const source = String(name || "").toLowerCase();
    if (source.includes("tshirt") || source.includes("tee")) return "T-shirts";
    if (source.includes("shirt") || source.includes("top")) return "Shirts";
    if (source.includes("jean")) return "Jeans";
    if (source.includes("pant") || source.includes("trouser")) return "Pants";
    if (source.includes("shoe") || source.includes("sneaker")) return "Shoes";
    if (source.includes("watch")) return "Watches";
    if (source.includes("jacket")) return "Jackets";
    if (source.includes("hoodie")) return "Hoodies";
    if (["belt", "cap", "bag", "glass"].some((word) => source.includes(word))) return "Accessories";
    return "Others";
}

function detectWardrobeColor(name) {
    const source = String(name || "").toLowerCase();
    const match = ["black", "white", "blue", "navy", "grey", "gray", "red", "green", "brown", "beige", "cream"].find((color) => source.includes(color));
    return match ? (match === "gray" ? "Grey" : match[0].toUpperCase() + match.slice(1)) : "Black";
}

function sameText(left, right) {
    return String(left || "").toLowerCase() === String(right || "").toLowerCase();
}

function renderAnalytics(metrics) {
    const progression = state.progression || {};
    document.getElementById("analyticsXp").textContent = progression.totalTXP ?? progression.txp ?? metrics.xpProgress ?? 0;
    document.getElementById("productivityScore").textContent = `${progression.score ?? metrics.productivityScore}%`;
    document.getElementById("productiveReelCount").textContent = metrics.productiveReels;

    const categories = {};
    state.reels.forEach((item) => {
        categories[item.category] = (categories[item.category] || 0) + 1;
    });
    const total = Math.max(1, state.reels.length);
    const categoryBars = document.getElementById("categoryBars");
    if (categoryBars) {
        categoryBars.innerHTML = Object.entries(categories).length
            ? Object.entries(categories).map(([category, count]) => `
            <div class="list-item">
                <div class="task-row">
                    <strong>${category}</strong>
                    <span>${count}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width:${(count / total) * 100}%"></div></div>
            </div>
        `).join("")
            : `<div class="empty-state">Analyze some reels to see category influence.</div>`;
    }

    const positiveCount = splitEntries(state.dailyLog.positiveActions).length;
    const negativeCount = splitEntries(state.dailyLog.negativeActions).length;
    const insights = [
        `Best momentum: ${metrics.productivityScore >= 70 ? "Strong discipline and follow-through." : "Good foundation, but protect deep work harder."}`,
        `Risk area: ${negativeCount > positiveCount ? "Negative actions are outpacing positives." : "Distraction is controlled right now."}`,
        `Reel quality: ${metrics.distractingReels > metrics.productiveReels ? "Too much low-value content. Tighten inputs." : "Content is mostly reinforcing growth."}`
    ];
    setRenderedHtml("habitInsights", insights.map((item) => `<div class="list-item">${item}</div>`).join(""));
}

function renderReport() {
    const container = document.getElementById("reportOutput");
    if (!state.report) {
        container.className = "report-grid empty-state";
        container.innerHTML = "Generate the daily report to get your best action, worst action, missed tasks, mood review, food advice, study advice, behavior guidance, outfit suggestion, entertainment control, and tomorrow's updated timetable.";
        return;
    }
    container.className = "report-grid";
    container.innerHTML = `
        ${reportCard("Best thing today", state.report.bestThing)}
        ${reportCard("Worst thing today", state.report.worstThing)}
        ${reportCard("What you missed", state.report.missedToday)}
        ${reportCard("What you learned", state.report.learnedToday)}
        ${reportCard("Mood analysis", state.report.moodDriver)}
        ${reportListCard("Positive actions", state.report.positiveActions)}
        ${reportListCard("Negative actions", state.report.negativeActions)}
        ${reportCard("Improve tomorrow", state.report.improveTomorrow)}
        ${reportCard("Food suggestion", state.report.foodSuggestion)}
        ${reportCard("Study suggestion", state.report.studySuggestion)}
        ${reportCard("Behavior suggestion", state.report.behaviorSuggestion)}
        ${reportCard("Outfit suggestion", state.report.outfitSuggestion)}
        ${reportCard("Entertainment suggestion", state.report.entertainmentSuggestion)}
        <div class="report-card">
            <div class="report-line">
                <strong>Updated timetable for tomorrow</strong>
                <button class="small-btn" data-report-action="apply">Apply plan</button>
            </div>
            <div class="report-timetable">
                ${(state.report.updatedTimetable || []).map((item) => `
                    <div class="list-item">
                        <strong>${item.time} - ${item.task}</strong>
                        <div class="task-meta"><span>${item.priority || "MEDIUM"}</span></div>
                    </div>
                `).join("")}
            </div>
            <p><strong>Jarvis note:</strong> ${state.report.jarvisClosing}</p>
        </div>
    `;
}

function renderSimpleList(elementId, items, renderer, emptyMessage) {
    const container = document.getElementById(elementId);
    if (!items.length) {
        container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
        return;
    }
    container.innerHTML = items.slice(0, 6).map(renderer).join("");
}

function reportCard(title, text) {
    return `<div class="report-card"><strong>${title}</strong><p>${text}</p></div>`;
}

function reportListCard(title, items) {
    const list = Array.isArray(items) ? items : [];
    return `<div class="report-card"><strong>${title}</strong><ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul></div>`;
}

function localAnalyzeReel(payload) {
    const sourceText = `${payload.title} ${payload.caption} ${payload.transcript} ${payload.notes} ${payload.link}`.toLowerCase();
    const rules = [
        { category: "Books / Reading", keys: ["book", "read", "reading", "pages"], task: "Reading block", action: "Add 20 minutes of reading today.", meaning: "This reel is teaching learning through books.", useful: "Reading compounds knowledge and focus.", avoid: "Do not only save reading ideas without reading." },
        { category: "Psychology", keys: ["psychology", "mindset", "emotion", "trigger"], task: "Reflection journal", action: "Add a reflection task.", meaning: "This reel is about understanding behavior and reactions.", useful: "It helps you respond better under stress.", avoid: "Do not use it just to judge others." },
        { category: "Fitness", keys: ["fitness", "workout", "gym", "exercise"], task: "Workout block", action: "Add a workout or walk.", meaning: "This reel promotes physical training.", useful: "Energy and discipline improve with movement.", avoid: "Do not wait for perfect conditions to exercise." },
        { category: "Study / DSA", keys: ["dsa", "study", "leetcode", "coding", "graph", "tree"], task: "DSA practice", action: "Add a focused problem-solving slot.", meaning: "This reel is about learning and skill growth.", useful: "It can improve technical confidence fast.", avoid: "Do not confuse study content with actual practice." },
        { category: "Communication Skills", keys: ["communication", "speaking", "conversation"], task: "Speaking practice", action: "Practice speaking for 20 minutes.", meaning: "This reel is about expression and confidence.", useful: "Strong communication helps in study, work, and relationships.", avoid: "Do not only consume tips without speaking." },
        { category: "Fashion / Outfit", keys: ["fashion", "style", "outfit", "wardrobe"], task: "Outfit planning", action: "Plan tomorrow's outfit tonight.", meaning: "This reel is about presentation and confidence.", useful: "Good presentation can reduce friction and increase confidence.", avoid: "Do not let style become comparison." },
        { category: "Food / Health", keys: ["food", "diet", "meal", "nutrition", "health"], task: "Healthy meal prep", action: "Add a meal or hydration reminder.", meaning: "This reel is about sustainable health habits.", useful: "Better food choices support energy and focus.", avoid: "Do not chase extreme diet fixes." },
        { category: "Spiritual / Calm Mind", keys: ["calm", "meditation", "spiritual", "mindfulness"], task: "Calm mind reset", action: "Add a short calm or prayer block.", meaning: "This reel is about mental steadiness.", useful: "Calm attention improves decision-making.", avoid: "Do not consume calm content while keeping a chaotic routine." },
        { category: "Productivity", keys: ["productivity", "schedule", "planner", "routine"], task: "Planning review", action: "Tighten one part of your routine.", meaning: "This reel is about systems and planning.", useful: "Good systems reduce friction.", avoid: "Do not over-plan instead of acting." },
        { category: "Negative / Time Waste", keys: ["drama", "gossip", "meme", "toxic", "doomscroll"], task: "Scroll reset", action: "Avoid this and protect a useful block.", meaning: "This reel looks more distracting than useful.", useful: "It is mostly a warning sign for attention drift.", avoid: "Do not let it interrupt study or sleep." }
    ];
    const match = rules.find((rule) => rule.keys.some((key) => sourceText.includes(key))) || rules[8];
    const productive = match.category !== "Negative / Time Waste";
    return {
        reelLink: payload.link || "",
        platform: payload.link?.includes("instagram") ? "Instagram Reel" : payload.link?.includes("youtu") ? "YouTube Short" : "Manual Entry",
        titleOrCaption: payload.title || payload.caption || payload.notes || "Untitled insight",
        keywords: match.keys.slice(0, 4),
        category: match.category,
        meaning: match.meaning,
        usefulness: match.useful,
        summary: `${match.meaning} ${match.action}`,
        lessonLearned: match.action,
        actionItem: match.action,
        avoid: match.avoid,
        priorityLevel: ["Books / Reading", "Fitness", "Study / DSA", "Food / Health", "Productivity", "Psychology"].includes(match.category) ? "HIGH" : match.category === "Negative / Time Waste" ? "LOW" : "MEDIUM",
        affectTimetable: productive && match.category !== "Fashion / Outfit",
        productive,
        productiveLabel: productive ? "Productive" : "Distraction Risk",
        suggestedTaskTitle: match.task,
        suggestedDurationMinutes: match.category === "Study / DSA" ? 45 : 20,
        suggestedTimeWindow: match.category === "Study / DSA" ? "Afternoon" : match.category === "Fitness" ? "Morning" : "Evening",
        rationale: productive ? "Keep it only if you act on it today." : "This is better treated as controlled entertainment."
    };
}

function localDailyReport() {
    const metrics = calculateMetrics();
    const positives = splitEntries(state.dailyLog.positiveActions);
    const negatives = splitEntries(state.dailyLog.negativeActions);
    return {
        bestThing: metrics.productivityScore >= 70 ? "You kept your priorities ahead of distractions." : "You still showed up and captured the day honestly.",
        worstThing: negatives[0] || "You left room for avoidable drift.",
        missedToday: state.timetable.filter((item) => item.status === "pending").map((item) => item.title).slice(0, 3).join(", ") || "No major miss recorded.",
        learnedToday: state.reels[0]?.lessonLearned || state.studySessions[0]?.topic || "Consistency matters more than intensity.",
        moodDriver: state.dailyLog.emotionTrigger
            ? `Mood was affected most by ${state.dailyLog.emotionTrigger}. Better response: ${state.dailyLog.betterResponse || "Pause, breathe, and choose the next useful action."}`
            : state.emotionLogs[0]?.trigger ? `Mood was affected most by ${state.emotionLogs[0].trigger}.` : `Mood leaned ${state.dailyLog.mood}.`,
        positiveActions: positives.length ? positives : ["You tracked the day instead of ignoring it."],
        negativeActions: negatives.length ? negatives : ["No major negative pattern recorded."],
        improveTomorrow: metrics.productivityScore < 60 ? "Start tomorrow with one protected high-value block." : "Keep the same structure and tighten transitions.",
        foodSuggestion: "Keep meals simple, hydrating, and stable.",
        studySuggestion: "Protect a focused study block before entertainment.",
        behaviorSuggestion: "Pause before reacting and keep your day less noisy.",
        outfitSuggestion: "Choose a clean outfit tonight so tomorrow starts with less friction.",
        entertainmentSuggestion: "Entertainment stays after study and health are done.",
        updatedTimetable: [
            { time: "06:00", task: "Wake + water + sunlight", priority: "HIGH" },
            { time: "06:30", task: "Workout / mobility", priority: "HIGH" },
            { time: "09:00", task: "Deep work study block", priority: "HIGH" },
            { time: "14:00", task: "DSA practice", priority: "HIGH" },
            { time: "20:30", task: "Reading or reflection", priority: "MEDIUM" }
        ],
        jarvisClosing: "Win the first serious block tomorrow and the rest of the day gets easier."
    };
}

function setAnalyzeButton(loading) {
    const button = document.getElementById("analyzeBtn");
    button.disabled = loading;
    button.textContent = loading ? "Analyzing..." : "Analyze Reel";
}

function setReportButtons(loading) {
    document.querySelectorAll("[data-generate-report], #generateReportBtn").forEach((button) => {
        button.dataset.defaultLabel = button.dataset.defaultLabel || button.textContent;
        button.disabled = loading;
        button.textContent = loading ? "Generating..." : button.dataset.defaultLabel;
    });
}

function setConfirmLoading(loading) {
    ["confirmImportedBtn", "importTimetableBtn"].forEach((id) => {
        const button = document.getElementById(id);
        if (!button) {
            return;
        }
        button.dataset.defaultLabel = button.dataset.defaultLabel || button.textContent;
        button.disabled = loading;
        button.classList.toggle("loading", loading);
        button.textContent = loading ? "Confirming..." : button.dataset.defaultLabel;
    });
}

function hydrateImportedTimetable() {
    importedWeek = state?.importedWeek || importedWeek;
    importedConfirmed = state?.importStatus === "confirmed";
    if (importedWeek) {
        importedTimetable = todayTasksFromWeek(importedWeek);
    }
}

function checkedDailyHabits() {
    return Array.from(document.querySelectorAll(".dailyHabitCheck:checked")).map((input) => input.value);
}

function calculateDailyTxpPreview() {
    const study = Number(document.getElementById("studyHours")?.value || 0);
    const coding = Number(document.getElementById("codingHours")?.value || 0);
    const workout = Number(document.getElementById("exerciseMinutes")?.value || 0);
    const positives = splitEntries(document.getElementById("positiveActions")?.value || "");
    const negatives = splitEntries(document.getElementById("negativeActions")?.value || "");
    const wakeTime = document.getElementById("wakeTime")?.value || "06:00";
    const plannedWake = state?.profile?.plannedWakeTime || "06:00";
    return clampNumber(Math.round(
        study * 20
        + coding * 15
        + Math.floor(workout / 20) * 15
        + checkedDailyHabits().length * 5
        + positives.length * 10
        + (wakeTime ? (minutesBetween(plannedWake, wakeTime) <= 15 ? 10 : -5) : 0)
        - negatives.length * 20
    ), -999, 9999);
}

function updateDailyTxpPreview() {
    const preview = document.getElementById("dailyTxpPreview");
    if (preview) {
        preview.textContent = `Estimated TXP: ${calculateDailyTxpPreview()}`;
    }
}

function showDailyQuote() {
    const quote = document.getElementById("dailyQuote");
    if (!quote) {
        return;
    }
    const fallbackIndex = Math.abs(new Date().toDateString().split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % QUOTES.length;
    const index = Number.isInteger(uiState.quoteIndex) ? uiState.quoteIndex % QUOTES.length : fallbackIndex;
    quote.textContent = QUOTES[index];
}

function nextDailyQuote() {
    const current = Number.isInteger(uiState.quoteIndex)
        ? uiState.quoteIndex
        : Math.abs(new Date().toDateString().split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % QUOTES.length;
    uiState.quoteIndex = (current + 1) % QUOTES.length;
    saveUiState();
    showDailyQuote();
}

function speakDailyQuote() {
    if (uiState.quoteVoiceEnabled === false) {
        showToast("Quote voice is muted in profile settings.");
        return;
    }
    if (!("speechSynthesis" in window)) {
        showToast("Voice reading is not supported in this browser.");
        return;
    }
    stopQuoteVoice();
    const utterance = new SpeechSynthesisUtterance(document.getElementById("dailyQuote")?.textContent || QUOTES[0]);
    utterance.rate = 0.92;
    utterance.pitch = 0.85;
    window.speechSynthesis.speak(utterance);
}

function stopQuoteVoice() {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}

function playBackgroundMusic() {
    if (!uiState.musicEnabled) {
        return;
    }
    const audio = document.getElementById(AUDIO.bg);
    if (!audio) {
        return;
    }
    ensureCurrentTrackLoaded();
    audio.volume = Number(uiState.musicVolume ?? 0.35);
    audio.play()
        .then(() => {
            uiState.musicPlaying = true;
            saveUiState();
            renderMusicSystem();
        })
        .catch(() => showToast("Tap Music to start background audio."));
}

function pauseBackgroundMusic() {
    const audio = document.getElementById(AUDIO.bg);
    if (audio) {
        audio.pause();
    }
    uiState.musicPlaying = false;
    saveUiState();
    renderMusicSystem();
}

async function handleSongImport(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
        return;
    }
    const playlistId = document.getElementById("musicImportPlaylist")?.value || "";
    const uploaded = [];
    for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        form.append("userKey", currentUser?.email || "local-user");
        form.append("title", file.name.replace(/\.[^.]+$/, ""));
        form.append("artist", "Local File");
        if (playlistId) {
            form.append("playlistId", playlistId);
        }
        try {
            const response = await fetch("/api/music/upload", { method: "POST", body: form });
            if (!response.ok) {
                throw new Error("Upload failed");
            }
            uploaded.push(trackFromSong(await response.json()));
        } catch (error) {
            const url = URL.createObjectURL(file);
            runtimeMusicUrls.push(url);
            uploaded.push({
                id: uid(),
                title: file.name.replace(/\.[^.]+$/, ""),
                artist: "Local File",
                source: "LOCAL",
                url,
                cover: "/assets/kaalix-logo.png",
                tags: ["Local", "Temporary"],
                duration: "--:--",
                liked: false,
                runtime: true
            });
        }
    }
    uiState.musicQueue = uniqueTracks([...uploaded, ...getMusicQueue().filter((track) => !track.runtime)]);
    uiState.musicLibrarySongs = uniqueTracks([...(uiState.musicLibrarySongs || []), ...uploaded]);
    uiState.currentTrackIndex = 0;
    uiState.songName = `Local song: ${uploaded[0].title}`;
    uiState.musicEnabled = true;
    uiState.musicPlaying = true;
    saveUiState();
    applyUiState();
    populateForms();
    loadTrack(0, true);
    showToast(`${uploaded.length} local song${uploaded.length > 1 ? "s" : ""} loaded.`);
    loadMusicLibrary();
}

function openSpotifyLink() {
    const input = document.getElementById("spotifyLink");
    const link = input?.value.trim();
    uiState.spotifyLink = link || "";
    saveUiState();
    if (!link) {
        showToast("Paste a Spotify link first.");
        return;
    }
    if (!/^https:\/\/open\.spotify\.com\//i.test(link)) {
        showToast("Use an open.spotify.com link.");
        return;
    }
    window.open(link, "_blank", "noopener");
}

function getMusicQueue() {
    const queue = Array.isArray(uiState.musicQueue) && uiState.musicQueue.length ? uiState.musicQueue : DEFAULT_MUSIC_QUEUE;
    return queue.map((track, index) => ({
        ...DEFAULT_MUSIC_QUEUE[0],
        ...track,
        id: track.id || `track-${index}`
    }));
}

function getAllMusicTracks() {
    return uniqueTracks([...DEFAULT_MUSIC_QUEUE, ...(uiState.musicLibrarySongs || []), ...getMusicQueue()]);
}

function uniqueTracks(tracks) {
    const seen = new Set();
    return tracks.filter((track) => {
        const key = String(track.id || track.url || track.title);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

function trackFromSong(song) {
    return {
        id: `song-${song.id}`,
        songId: song.id,
        title: song.title || "Imported Song",
        artist: song.artist || song.source || "Unknown",
        source: song.source || "LOCAL",
        url: song.streamUrl || song.sourceUrl || "/assets/statue-of-god-theme.mp3",
        cover: song.coverImage || "/assets/kaalix-logo.png",
        tags: [song.source || "LOCAL", "Imported"],
        duration: song.duration || "--:--",
        liked: false
    };
}

function playlistFromApi(item) {
    return {
        id: `api-${item.id}`,
        playlistId: item.id,
        name: item.name,
        tracks: item.songs?.length || 0,
        mood: item.mood || item.type || "Playlist",
        cover: "/assets/kaalix-logo.png",
        songIds: (item.songs || []).map((song) => `song-${song.id}`),
        songs: (item.songs || []).map(trackFromSong),
        type: item.type || "CUSTOM"
    };
}

function getCurrentTrack() {
    const queue = getMusicQueue();
    const index = clampNumber(Number(uiState.currentTrackIndex || 0), 0, Math.max(0, queue.length - 1));
    uiState.currentTrackIndex = index;
    return queue[index] || DEFAULT_MUSIC_QUEUE[0];
}

function ensureCurrentTrackLoaded() {
    const audio = document.getElementById(AUDIO.bg);
    const track = getCurrentTrack();
    if (audio && track?.url && audio.getAttribute("src") !== track.url) {
        audio.src = track.url;
        audio.load();
    }
}

function loadTrack(index, autoplay = false) {
    const queue = getMusicQueue();
    if (!queue.length) {
        return;
    }
    uiState.currentTrackIndex = clampNumber(index, 0, queue.length - 1);
    const track = getCurrentTrack();
    const audio = document.getElementById(AUDIO.bg);
    if (["YOUTUBE", "INSTAGRAM", "SPOTIFY"].includes(String(track.source || "").toUpperCase())) {
        uiState.songName = `${track.title} - ${track.artist}`;
        saveUiState();
        renderMusicSystem();
        if (autoplay && track.url) {
            window.open(track.url, "_blank", "noopener");
            showToast(`${track.source} opens safely from the original link. No downloading.`);
        }
        return;
    }
    if (audio) {
        audio.src = track.url;
        audio.loop = Boolean(uiState.musicRepeat);
        audio.volume = Number(uiState.musicVolume ?? 0.35);
        audio.load();
    }
    uiState.songName = `${track.title} - ${track.artist}`;
    uiState.musicEnabled = autoplay || Boolean(uiState.musicEnabled);
    saveUiState();
    renderMusicSystem();
    if (autoplay) {
        playBackgroundMusic();
    }
}

function toggleMusicPlayback() {
    const audio = document.getElementById(AUDIO.bg);
    if (!audio) {
        return;
    }
    ensureCurrentTrackLoaded();
    if (audio.paused) {
        uiState.musicEnabled = true;
        uiState.musicPlaying = true;
        saveUiState();
        applyUiState();
        playBackgroundMusic();
    } else {
        uiState.musicEnabled = false;
        pauseBackgroundMusic();
        applyUiState();
    }
}

function nextTrack() {
    const queue = getMusicQueue();
    if (!queue.length) {
        return;
    }
    const next = uiState.musicShuffle
        ? Math.floor(Math.random() * queue.length)
        : (Number(uiState.currentTrackIndex || 0) + 1) % queue.length;
    loadTrack(next, true);
}

function prevTrack() {
    const queue = getMusicQueue();
    if (!queue.length) {
        return;
    }
    const previous = (Number(uiState.currentTrackIndex || 0) - 1 + queue.length) % queue.length;
    loadTrack(previous, true);
}

function toggleShuffle() {
    uiState.musicShuffle = !uiState.musicShuffle;
    saveUiState();
    renderMusicSystem();
    showToast(uiState.musicShuffle ? "Shuffle enabled." : "Shuffle disabled.");
}

function toggleRepeat() {
    uiState.musicRepeat = !uiState.musicRepeat;
    const audio = document.getElementById(AUDIO.bg);
    if (audio) {
        audio.loop = Boolean(uiState.musicRepeat);
    }
    saveUiState();
    renderMusicSystem();
    showToast(uiState.musicRepeat ? "Repeat enabled." : "Repeat disabled.");
}

function toggleLikeTrack() {
    const queue = getMusicQueue();
    const index = Number(uiState.currentTrackIndex || 0);
    queue[index].liked = !queue[index].liked;
    uiState.musicQueue = queue;
    saveUiState();
    renderMusicSystem();
}

function clearMusicQueue() {
    uiState.musicQueue = [...DEFAULT_MUSIC_QUEUE];
    uiState.currentTrackIndex = 0;
    saveUiState();
    loadTrack(0, false);
    showToast("Queue reset to KAALIX default track.");
}

async function connectMusicSource(source) {
    if (source === "local") {
        document.getElementById("musicLocalUpload")?.click();
        return;
    }
    let message = "";
    try {
        const response = await fetch("/api/music/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userKey: currentUser?.email || "local-user", source: source.toUpperCase() })
        });
        const payload = response.ok ? await response.json() : {};
        message = payload.message || "";
    } catch (error) {
        message = "";
    }
    const labels = {
        spotify: message || "Spotify API credentials required.",
        youtube: message || "YouTube link import enabled. No downloading.",
        instagram: message || "Instagram manual link import enabled. No scraping."
    };
    uiState.connectedMusicSources = unique([...(uiState.connectedMusicSources || []), source]);
    saveUiState();
    renderMusicSystem();
    showToast(labels[source] || "Music source connected.");
}

async function saveMusicSourceLink() {
    const input = document.getElementById("musicSourceLink");
    const link = input?.value.trim();
    if (!link) {
        showToast("Paste a YouTube or Instagram link first.");
        return;
    }
    const isYouTube = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(link);
    const isInstagram = /^https?:\/\/(www\.)?instagram\.com\//i.test(link);
    if (!isYouTube && !isInstagram) {
        showToast("Use a YouTube or Instagram link. Spotify uses Connect.");
        return;
    }
    const source = isYouTube ? "YOUTUBE" : "INSTAGRAM";
    const playlistId = document.getElementById("musicImportPlaylist")?.value || null;
    try {
        const response = await fetch("/api/music/import-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userKey: currentUser?.email || "local-user",
                source,
                sourceUrl: link,
                title: source === "YOUTUBE" ? "YouTube Link" : "Instagram Reel Audio",
                artist: source,
                playlistId: playlistId ? Number(playlistId) : null
            })
        });
        if (!response.ok) {
            throw new Error("Link save failed");
        }
        const track = trackFromSong(await response.json());
        uiState.musicLibrarySongs = uniqueTracks([...(uiState.musicLibrarySongs || []), track]);
        uiState.musicQueue = uniqueTracks([...getMusicQueue(), track]);
        input.value = "";
        saveUiState();
        renderMusicSystem();
        showToast(`${source} link saved safely. Playback uses the original link/embed source.`);
        loadMusicLibrary();
    } catch (error) {
        showToast("Could not save that link. Try again.");
    }
}

async function loadMusicLibrary() {
    if (!currentUser) {
        return;
    }
    try {
        const response = await fetch(`/api/music/library?userKey=${encodeURIComponent(currentUser.email)}`);
        if (!response.ok) {
            throw new Error("Music library unavailable");
        }
        const library = await response.json();
        const apiPlaylists = (library.playlists || []).map(playlistFromApi);
        const apiSongs = (library.recentSongs || []).map(trackFromSong);
        uiState.musicApiPlaylists = apiPlaylists;
        uiState.musicLibrarySongs = uniqueTracks([...(uiState.musicLibrarySongs || []), ...apiSongs, ...apiPlaylists.flatMap((item) => item.songs || [])]);
        uiState.connectedMusicSources = unique([...(uiState.connectedMusicSources || []), ...(library.connectedSources || []).map((source) => source.toLowerCase())]);
        saveUiState();
        renderMusicSystem();
    } catch (error) {
        renderMusicSystem();
    }
}

function seekMusic(event) {
    const audio = document.getElementById(AUDIO.bg);
    if (!audio || !Number.isFinite(audio.duration)) {
        return;
    }
    audio.currentTime = (Number(event.target.value || 0) / 100) * audio.duration;
    updateMusicProgress();
}

function updateMusicVolume(event) {
    uiState.musicVolume = Number(event.target.value);
    const audio = document.getElementById(AUDIO.bg);
    if (audio) {
        audio.volume = uiState.musicVolume;
    }
    saveUiState();
    renderMusicSystem();
}

function bindMusicAudioEvents() {
    const audio = document.getElementById(AUDIO.bg);
    if (!audio || audio.dataset.boundMusicEvents) {
        return;
    }
    audio.dataset.boundMusicEvents = "true";
    audio.addEventListener("timeupdate", updateMusicProgress);
    audio.addEventListener("loadedmetadata", updateMusicProgress);
    audio.addEventListener("play", () => {
        uiState.musicPlaying = true;
        saveUiState();
        renderMusicSystem();
    });
    audio.addEventListener("pause", () => {
        uiState.musicPlaying = false;
        saveUiState();
        renderMusicSystem();
    });
    audio.addEventListener("ended", () => {
        if (!uiState.musicRepeat) {
            nextTrack();
        }
    });
}

function updateMusicProgress() {
    const audio = document.getElementById(AUDIO.bg);
    if (!audio) {
        return;
    }
    const percent = Number.isFinite(audio.duration) && audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
    ["musicProgress", "miniProgress"].forEach((id) => {
        const input = document.getElementById(id);
        if (input && document.activeElement !== input) {
            input.value = String(percent);
        }
    });
    const current = document.getElementById("musicCurrent");
    const duration = document.getElementById("musicDuration");
    if (current) {
        current.textContent = formatTime(audio.currentTime || 0);
    }
    if (duration) {
        duration.textContent = Number.isFinite(audio.duration) ? formatTime(audio.duration) : getCurrentTrack().duration || "0:00";
    }
}

function renderMusicSystem() {
    const queue = getMusicQueue();
    const track = getCurrentTrack();
    const audio = document.getElementById(AUDIO.bg);
    const isPlaying = audio ? !audio.paused && uiState.musicEnabled !== false : Boolean(uiState.musicPlaying);
    document.body.classList.toggle("music-playing", Boolean(isPlaying));
    document.body.classList.toggle("music-visible", Boolean(isPlaying || uiState.activeScreen === "music"));
    const titleTargets = ["musicTitle", "miniTitle", "dashboardMusicTitle"];
    const artistTargets = ["musicArtist", "miniArtist", "dashboardMusicArtist"];
    titleTargets.forEach((id) => {
        const target = document.getElementById(id);
        if (target) target.textContent = track.title;
    });
    artistTargets.forEach((id) => {
        const target = document.getElementById(id);
        if (target) target.textContent = `${track.artist} | ${track.source}`;
    });
    ["musicCover", "miniCover", "dashboardMusicCover"].forEach((id) => {
        const img = document.getElementById(id);
        if (img) img.src = track.cover || "/assets/kaalix-logo.png";
    });
    ["musicPlayBtn", "miniPlayBtn", "dashboardMusicPlayBtn", "musicMasterToggle"].forEach((id) => {
        const button = document.getElementById(id);
        if (!button) return;
        if (id === "musicMasterToggle") {
            button.innerHTML = `<span class="icon-inline">${isPlaying ? ICONS.pause : ICONS.play}</span>${isPlaying ? "Music On" : "Music Off"}`;
        } else {
            button.innerHTML = isPlaying ? ICONS.pause : ICONS.play;
            button.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
        }
    });
    setIconButton("musicNextBtn", "next", "Next");
    setIconButton("miniNextBtn", "next", "Next");
    setIconButton("dashboardMusicNextBtn", "next", "Next");
    setIconButton("musicPrevBtn", "prev", "Previous");
    setIconButton("miniPrevBtn", "prev", "Previous");
    setIconButton("musicShuffleBtn", "shuffle", "Shuffle");
    setIconButton("musicRepeatBtn", "repeat", "Repeat");
    setIconButton("closePlaylistModal", "close", "Close");
    setIconButton("goalCloseBtn", "close", "Close");
    setIconButton("playPlaylistBtn", "play", "Play Playlist", "Play Playlist");
    document.querySelectorAll("[data-screen-target='music'].icon-action").forEach((button) => {
        button.innerHTML = `${ICONS.queue}<span>Library</span>`;
        button.setAttribute("aria-label", "Open music library");
    });
    document.querySelectorAll("[data-icon]").forEach((node) => {
        node.innerHTML = ICONS[node.dataset.icon] || "";
    });
    const like = document.getElementById("musicLikeBtn");
    if (like) {
        like.innerHTML = ICONS.like;
        like.classList.toggle("liked", Boolean(track.liked));
    }
    const shuffle = document.getElementById("musicShuffleBtn");
    const repeat = document.getElementById("musicRepeatBtn");
    if (shuffle) shuffle.classList.toggle("active", Boolean(uiState.musicShuffle));
    if (repeat) repeat.classList.toggle("active", Boolean(uiState.musicRepeat));
    ["musicVolumeMain", "miniVolume", "musicVolume"].forEach((id) => {
        const input = document.getElementById(id);
        if (input && document.activeElement !== input) input.value = Number(uiState.musicVolume ?? 0.35);
    });
    const tags = document.getElementById("musicTags");
    if (tags) {
        tags.innerHTML = (track.tags || []).map((tag) => `<span class="signal-chip">${escapeHtml(tag)}</span>`).join("");
    }
    const list = document.getElementById("musicQueue");
    if (list) {
        list.innerHTML = queue.map((item, index) => `
            <div class="queue-row ${index === uiState.currentTrackIndex ? "active" : ""}" data-track-index="${index}">
                <img src="${item.cover || "/assets/kaalix-logo.png"}" alt="">
                <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.artist)}</span></div>
                <small>${item.duration || "--:--"}</small>
                <button class="ghost-btn icon-action" type="button" data-remove-track="${index}" title="Remove">${ICONS.close}</button>
            </div>
        `).join("");
        list.querySelectorAll("[data-track-index]").forEach((row) => row.addEventListener("click", (event) => {
            if (event.target.closest("[data-remove-track]")) {
                return;
            }
            loadTrack(Number(row.dataset.trackIndex), true);
        }));
        list.querySelectorAll("[data-remove-track]").forEach((button) => button.addEventListener("click", (event) => {
            event.stopPropagation();
            removeTrack(Number(button.dataset.removeTrack));
        }));
    }
    const playlistGrid = document.getElementById("playlistGrid");
    if (playlistGrid) {
        const playlists = getPlaylists();
        playlistGrid.innerHTML = playlists.map((playlist) => `
            <button class="playlist-tile" type="button" data-playlist="${escapeHtml(playlist.id)}">
                <img src="${playlist.cover}" alt="">
                <strong>${escapeHtml(playlist.name)}</strong>
                <span>${getPlaylistTracks(playlist).length || playlist.tracks} Tracks | ${escapeHtml(playlist.mood)}</span>
            </button>
        `).join("");
        playlistGrid.querySelectorAll("[data-playlist]").forEach((button) => button.addEventListener("click", () => {
            openPlaylistModal(button.dataset.playlist);
        }));
    }
    renderPlaylistSelector();
    renderActivePlaylistModal();
    const suggestion = document.getElementById("musicSuggestion");
    if (suggestion) {
        suggestion.textContent = getMusicSuggestion();
    }
    updateMusicProgress();
}

function setIconButton(id, icon, label, text = "") {
    const button = document.getElementById(id);
    if (!button) {
        return;
    }
    button.innerHTML = `${ICONS[icon] || ""}${text ? `<span>${escapeHtml(text)}</span>` : ""}`;
    button.setAttribute("aria-label", label);
}

function getPlaylists() {
    const api = Array.isArray(uiState.musicApiPlaylists) ? uiState.musicApiPlaylists : [];
    const custom = Array.isArray(uiState.customPlaylists) ? uiState.customPlaylists : [];
    const merged = [...api, ...custom, ...PLAYLISTS];
    const seen = new Set();
    return merged.filter((playlist) => {
        const key = String(playlist.name || playlist.id).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function getPlaylistTracks(playlist) {
    if (Array.isArray(playlist.songs) && playlist.songs.length) {
        return playlist.songs;
    }
    const all = getAllMusicTracks();
    return (playlist.songIds || []).map((id) => all.find((track) => String(track.id) === String(id))).filter(Boolean);
}

function renderPlaylistSelector() {
    const select = document.getElementById("musicImportPlaylist");
    if (!select) {
        return;
    }
    const previous = select.value;
    select.innerHTML = `<option value="">Recently Imported</option>` + getPlaylists()
        .filter((playlist) => playlist.playlistId)
        .map((playlist) => `<option value="${playlist.playlistId}">${escapeHtml(playlist.name)}</option>`)
        .join("");
    if ([...select.options].some((option) => option.value === previous)) {
        select.value = previous;
    }
}

function openPlaylistModal(playlistId) {
    uiState.activePlaylist = playlistId;
    saveUiState();
    renderActivePlaylistModal();
    document.getElementById("playlistModal")?.classList.remove("hidden");
}

function closePlaylistModal() {
    document.getElementById("playlistModal")?.classList.add("hidden");
}

function getActivePlaylist() {
    return getPlaylists().find((playlist) => String(playlist.id) === String(uiState.activePlaylist)) || getPlaylists()[0];
}

function renderActivePlaylistModal() {
    const modal = document.getElementById("playlistModal");
    const title = document.getElementById("playlistModalTitle");
    const list = document.getElementById("playlistSongList");
    if (!modal || !title || !list) {
        return;
    }
    const playlist = getActivePlaylist();
    if (!playlist) {
        return;
    }
    title.textContent = playlist.name;
    const songs = getPlaylistTracks(playlist);
    list.innerHTML = songs.length ? songs.map((song, index) => `
        <div class="queue-row" data-playlist-track="${index}">
            <img src="${song.cover || "/assets/kaalix-logo.png"}" alt="">
            <div><strong>${escapeHtml(song.title)}</strong><span>${escapeHtml(song.artist || song.source)}</span></div>
            <small>${song.duration || "--:--"}</small>
            <button class="ghost-btn icon-action" type="button" data-remove-playlist-song="${song.songId || ""}" title="Remove">${ICONS.close}</button>
        </div>
    `).join("") : `<div class="empty-state">No songs yet. Import music or add the current song.</div>`;
    list.querySelectorAll("[data-playlist-track]").forEach((row) => row.addEventListener("click", (event) => {
        if (event.target.closest("[data-remove-playlist-song]")) {
            return;
        }
        const track = songs[Number(row.dataset.playlistTrack)];
        uiState.musicQueue = uniqueTracks([track, ...getMusicQueue()]);
        uiState.currentTrackIndex = 0;
        saveUiState();
        loadTrack(0, true);
    }));
    list.querySelectorAll("[data-remove-playlist-song]").forEach((button) => button.addEventListener("click", async (event) => {
        event.stopPropagation();
        const songId = button.dataset.removePlaylistSong;
        if (!songId || !playlist.playlistId) {
            showToast("System playlists can only be queued, not edited.");
            return;
        }
        try {
            await fetch(`/api/music/playlists/${playlist.playlistId}/songs/${songId}`, { method: "DELETE" });
            showToast("Song removed from playlist.");
            await loadMusicLibrary();
        } catch (error) {
            showToast("Could not remove song.");
        }
    }));
}

function playActivePlaylist() {
    const playlist = getActivePlaylist();
    const songs = playlist ? getPlaylistTracks(playlist) : [];
    if (!songs.length) {
        showToast("This playlist has no songs yet.");
        return;
    }
    uiState.musicQueue = uniqueTracks([...songs, ...getMusicQueue()]);
    uiState.currentTrackIndex = 0;
    uiState.musicEnabled = true;
    saveUiState();
    loadTrack(0, true);
}

function queueActivePlaylist() {
    const playlist = getActivePlaylist();
    const songs = playlist ? getPlaylistTracks(playlist) : [];
    if (!songs.length) {
        showToast("This playlist has no songs yet.");
        return;
    }
    uiState.musicQueue = uniqueTracks([...getMusicQueue(), ...songs]);
    saveUiState();
    renderMusicSystem();
    showToast(`${playlist.name} added to queue.`);
}

async function addCurrentToActivePlaylist() {
    const playlist = getActivePlaylist();
    const track = getCurrentTrack();
    if (!playlist || !track) {
        return;
    }
    if (playlist.playlistId && track.songId) {
        try {
            await fetch("/api/music/playlists/songs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ playlistId: playlist.playlistId, songId: track.songId })
            });
            showToast("Current song added to playlist.");
            await loadMusicLibrary();
            return;
        } catch (error) {
            showToast("Could not save to backend playlist.");
        }
    }
    playlist.songIds = unique([...(playlist.songIds || []), track.id]);
    uiState.customPlaylists = uniquePlaylistObjects([...(uiState.customPlaylists || []), playlist]);
    saveUiState();
    renderMusicSystem();
    showToast("Current song added locally.");
}

async function createCustomPlaylist() {
    const name = prompt("Custom playlist name");
    if (!name || !name.trim()) {
        return;
    }
    try {
        const response = await fetch("/api/music/playlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userKey: currentUser?.email || "local-user", name: name.trim(), mood: "Custom" })
        });
        if (!response.ok) {
            throw new Error("Playlist create failed");
        }
        const playlist = playlistFromApi(await response.json());
        uiState.musicApiPlaylists = uniquePlaylistObjects([...(uiState.musicApiPlaylists || []), playlist]);
        uiState.activePlaylist = playlist.id;
        saveUiState();
        renderMusicSystem();
        openPlaylistModal(playlist.id);
        showToast("Custom playlist created.");
    } catch (error) {
        const playlist = { id: `custom-${uid()}`, name: name.trim(), tracks: 0, mood: "Custom", cover: "/assets/kaalix-logo.png", songIds: [], type: "CUSTOM" };
        uiState.customPlaylists = uniquePlaylistObjects([...(uiState.customPlaylists || []), playlist]);
        uiState.activePlaylist = playlist.id;
        saveUiState();
        renderMusicSystem();
        openPlaylistModal(playlist.id);
    }
}

function uniquePlaylistObjects(playlists) {
    const seen = new Set();
    return playlists.filter((playlist) => {
        const key = playlist.playlistId ? `api-${playlist.playlistId}` : playlist.id || playlist.name;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function removeTrack(index) {
    const queue = getMusicQueue();
    if (queue.length <= 1) {
        clearMusicQueue();
        return;
    }
    queue.splice(index, 1);
    uiState.musicQueue = queue;
    uiState.currentTrackIndex = clampNumber(Number(uiState.currentTrackIndex || 0), 0, queue.length - 1);
    saveUiState();
    loadTrack(uiState.currentTrackIndex, Boolean(uiState.musicEnabled));
}

function getMusicSuggestion() {
    const task = findCurrentTask();
    const mood = state?.dailyLog?.mood || "Calm";
    const title = `${task?.title || ""} ${task?.category || ""}`.toLowerCase();
    if (title.includes("workout") || title.includes("gym") || title.includes("fitness")) {
        return "You are entering a physical block. Recommended playlist: Workout.";
    }
    if (title.includes("study") || title.includes("dsa") || title.includes("coding")) {
        return "You are starting deep work. Recommended playlist: Focus Mode.";
    }
    if (["Tired", "Sad", "Angry"].includes(mood)) {
        return "Your mood suggests lower intensity. Recommended playlist: Calm.";
    }
    return "KAALIX recommends Anime / Solo Leveling Vibes for momentum without distraction.";
}

function findCurrentTask() {
    if (!state?.timetable?.length) {
        return null;
    }
    const currentMinutes = timeToMinutes(new Date().toTimeString().slice(0, 5));
    const pending = [...state.timetable].filter((task) => task.status !== "done").sort((left, right) => left.time.localeCompare(right.time));
    return pending.find((item) => timeToMinutes(item.time) >= currentMinutes - 60) || pending[0] || null;
}

function formatTime(seconds) {
    const total = Math.max(0, Math.floor(Number(seconds) || 0));
    const minutes = Math.floor(total / 60);
    const rest = total % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
}

async function resetSystemProgress() {
    if (!state || !currentUser) {
        return;
    }
    state.dailyLog = { ...EMPTY_DAILY_LOG };
    state.lastDailyDate = todayKey();
    state.progression = {
        level: 1,
        rank: "E",
        txp: 0,
        dailyTXP: 0,
        totalTXP: 0,
        nextLevelXP: 127,
        nextLevelTXP: 127,
        streak: 0,
        score: 0,
        tier: "Beginner",
            progressPercentage: 0,
            rankColor: "#94a3b8",
            levelTitle: "Beginner LVL 1"
        };
    state.timetable = state.timetable.map((task) => ({ ...task, status: "pending" }));
    try {
        await fetch("/api/user-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userKey: currentUser.email, name: state.profile.name || currentUser.name || "Hunter" })
        });
    } catch (error) {
        // Local reset still applies if the backend is unavailable.
    }
    persistState();
    populateForms();
    showToast("Rank, TXP, streak, and daily tracker reset.");
}

async function syncDailyProgression() {
    if (!state || !currentUser) {
        return;
    }
    const doneTasks = state.timetable.filter((task) => task.status === "done").length;
    const skippedTasks = state.timetable.filter((task) => task.status === "skip").length;
    const negativeText = `${state.dailyLog.negativeActions || ""}`.toLowerCase();
    const payload = {
        userKey: currentUser.email,
        name: state.profile.name || currentUser.name || "Hunter",
        studyHours: Number(state.dailyLog.studyHours || 0),
        dsaCount: Math.round(Number(state.dailyLog.codingHours || 0)),
        workout: Number(state.dailyLog.exerciseMinutes || 0) >= 20,
        wakeOnTime: Boolean(state.dailyLog.wakeTime) && minutesBetween(state.profile.plannedWakeTime, state.dailyLog.wakeTime) <= 15,
        noDistractions: (state.dailyLog.habitChecklist || []).includes("No doomscroll"),
        wastedTime: negativeText.includes("waste") || negativeText.includes("scroll") ? 3 : 0,
        skipStudy: skippedTasks > 0 || negativeText.includes("skip study"),
        lateWake: Boolean(state.dailyLog.wakeTime) && minutesBetween(state.profile.plannedWakeTime, state.dailyLog.wakeTime) > 15,
        overthinkingAnger: negativeText.includes("anger") || negativeText.includes("overthinking"),
        tasksCompleted: doneTasks,
        totalTasks: state.timetable.length
    };
    try {
        const response = await fetch("/api/daily-log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error("Progression API failed");
        }
        state.progression = await response.json();
        persistState();
        populateForms();
    } catch (error) {
        showToast("Progression saved locally. Backend sync failed.");
    }
}

async function rewardTXP(amount, reason) {
    if (!state || !currentUser || amount <= 0) {
        persistState();
        return;
    }
    const previous = state.progression || {};
    try {
        const response = await fetch("/api/reward-txp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userKey: currentUser.email,
                name: state.profile.name || currentUser.name || "Hunter",
                amount,
                reason
            })
        });
        if (!response.ok) {
            throw new Error("Reward API failed");
        }
        state.progression = await response.json();
        persistState();
        announceProgressionChange(previous, state.progression, amount);
    } catch (error) {
        state.progression = applyLocalTxpReward(previous, amount);
        persistState();
        showToast(`+${amount} TXP saved locally.`);
    }
}

function applyLocalTxpReward(current, amount) {
    let level = Number(current.level || 1);
    let txp = Number(current.txp || 0) + amount;
    let next = calculateNextLevelXP(level);
    while (level < 100 && txp >= next) {
        txp -= next;
        level += 1;
        next = calculateNextLevelXP(level);
    }
    return {
        ...current,
        level,
        txp,
        nextLevelXP: next,
        tier: tierForLevel(level),
        progressPercentage: Math.round((txp / Math.max(1, next)) * 100),
        levelTitle: `${tierForLevel(level)} LVL ${level}`
    };
}

function announceProgressionChange(previous, next, amount) {
    if (Number(next.level || 1) > Number(previous.level || 1)) {
        showToast(`LEVEL UP: LVL ${next.level}. ${next.txp} TXP carried forward.`);
    } else {
        showToast(`+${amount} TXP earned.`);
    }
}

function taskRewardAmount(task) {
    return Math.max(5, Number(task?.xp ?? task?.TXP ?? task?.txp ?? 20));
}

async function loadProgressionStatus() {
    if (!state || !currentUser) {
        return;
    }
    try {
        const response = await fetch(`/api/user-status?userKey=${encodeURIComponent(currentUser.email)}`);
        if (!response.ok) {
            throw new Error("Status API failed");
        }
        state.progression = await response.json();
        persistState();
        populateForms();
    } catch (error) {
        renderProgression(calculateMetrics());
    }
}

function getRenderedTargets(name) {
    return Array.from(document.querySelectorAll(`#${name}, [data-render="${name}"]`));
}

function setRenderedHtml(name, html) {
    getRenderedTargets(name).forEach((target) => {
        target.innerHTML = html;
    });
}

function bindCursor() {
    const cursor = document.getElementById("kaalixCursor");
    if (cursor) cursor.setAttribute("aria-hidden", "true");
}

function loadUiState() {
    try {
        return {
            soundEnabled: true,
            sidebarHidden: false,
            studyMode: false,
            musicEnabled: false,
            musicPlaying: false,
            musicVolume: 0.35,
            currentTrackIndex: 0,
            musicQueue: [...DEFAULT_MUSIC_QUEUE],
            musicLibrarySongs: [],
            musicApiPlaylists: [],
            customPlaylists: [],
            musicShuffle: false,
            musicRepeat: false,
            activePlaylist: "focus-mode",
            connectedMusicSources: [],
            quoteVoiceEnabled: true,
            quoteIndex: null,
            songName: "Default background: Statue of God Theme.",
            spotifyLink: "",
            activeScreen: "dashboard",
            focusModeActive: false,
            natureSound: false,
            ...JSON.parse(localStorage.getItem(UI_KEY) || "{}")
        };
    } catch (error) {
        return {
            soundEnabled: true,
            sidebarHidden: false,
            studyMode: false,
            musicEnabled: false,
            musicPlaying: false,
            musicVolume: 0.35,
            currentTrackIndex: 0,
            musicQueue: [...DEFAULT_MUSIC_QUEUE],
            musicLibrarySongs: [],
            musicApiPlaylists: [],
            customPlaylists: [],
            musicShuffle: false,
            musicRepeat: false,
            activePlaylist: "focus-mode",
            connectedMusicSources: [],
            quoteVoiceEnabled: true,
            quoteIndex: null,
            songName: "Default background: Statue of God Theme.",
            spotifyLink: "",
            activeScreen: "dashboard",
            focusModeActive: false,
            natureSound: false
        };
    }
}

function saveUiState() {
    localStorage.setItem(UI_KEY, JSON.stringify(uiState));
}

function applyUiState() {
    document.body.classList.toggle("sidebar-hidden", Boolean(uiState.sidebarHidden));
    document.body.classList.toggle("study-mode-active", Boolean(uiState.studyMode));
    document.body.classList.toggle("focus-mode-active", Boolean(uiState.focusModeActive));
    const sidebarToggles = document.querySelectorAll("[data-sidebar-toggle], #sidebarToggle");
    const soundToggle = document.getElementById("soundToggle");
    const musicToggle = document.getElementById("musicToggle");
    const musicVolume = document.getElementById("musicVolume");
    const studyButton = document.getElementById("studyModeBtn");
    sidebarToggles.forEach((sidebarToggle) => {
        sidebarToggle.textContent = uiState.sidebarHidden ? "<<" : ">>";
        sidebarToggle.title = uiState.sidebarHidden ? "Show sidebar" : "Hide sidebar";
    });
    if (soundToggle) {
        soundToggle.textContent = uiState.soundEnabled ? "Sound On" : "Muted";
    }
    if (musicToggle) {
        musicToggle.textContent = uiState.musicEnabled ? "Music On" : "Music Off";
    }
    if (musicVolume) {
        musicVolume.value = Number(uiState.musicVolume ?? 0.35);
    }
    if (studyButton) {
        studyButton.textContent = uiState.studyMode ? "Stop Study Sound" : "Study Mode";
    }
    const natureToggle = document.getElementById("natureSoundToggle");
    if (natureToggle) {
        natureToggle.checked = Boolean(uiState.natureSound);
    }
    const bgMusic = document.getElementById(AUDIO.bg);
    if (bgMusic) {
        bgMusic.volume = Number(uiState.musicVolume ?? 0.35);
        bgMusic.loop = Boolean(uiState.musicRepeat);
    }
    renderMusicSystem();
}

function playSound(name) {
    if (!uiState.soundEnabled) {
        return;
    }
    const audio = document.getElementById(AUDIO[name]);
    if (!audio) {
        return;
    }
    audio.volume = name === "study" ? 0.35 : 0.75;
    if (name !== "study") {
        audio.currentTime = 0;
    }
    audio.play().catch(() => {
        if (name !== "study") {
            showToast("Tap once to unlock system sounds.");
        }
    });
}

function playClickSound() {
    if (!uiState.soundEnabled) {
        return;
    }
    const audio = document.getElementById(AUDIO.task);
    if (!audio) {
        return;
    }
    const clone = audio.cloneNode(true);
    clone.volume = 0.16;
    clone.play().catch(() => {});
}

function stopSound(name) {
    const audio = document.getElementById(AUDIO[name]);
    if (!audio) {
        return;
    }
    audio.pause();
    audio.currentTime = 0;
}

async function parseTimetableFile(file) {
    const name = file.name.toLowerCase();
    if (file.type.startsWith("image/")) {
        const generated = generateReferenceWeek();
        return { week: generated, today: todayTasksFromWeek(generated), source: "image" };
    }
    if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
        showToast("Excel selected. Export as CSV for direct import.");
        const tasks = [{
            time: "09:00",
            title: `Convert Excel file to CSV: ${file.name}`,
            priority: "MEDIUM",
            category: "Import Setup",
            xp: 15,
            source: "excel"
        }];
        return { tasks, week: buildWeekFromTasks(tasks), today: tasks };
    }
    const text = await file.text();
    if (name.endsWith(".json")) {
        const tasks = parseJsonTimetable(text);
        return { tasks, week: buildWeekFromTasks(tasks), today: tasks };
    }
    const tasks = parseTextTimetable(text);
    return { tasks, week: buildWeekFromTasks(tasks), today: tasks };
}

function parseJsonTimetable(text) {
    try {
        const rows = JSON.parse(text);
        return Array.isArray(rows) ? rows.map(rowToTask).filter(Boolean) : [];
    } catch (error) {
        showToast("JSON import failed.");
        return [];
    }
}

function parseTextTimetable(text) {
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const rows = lines[0]?.toLowerCase().includes("time") ? lines.slice(1) : lines;
    return rows.map((line) => {
        const parts = line.includes(",") ? line.split(",") : line.split(/\s+-\s+|\s{2,}/);
        return rowToTask({
            time: parts[0],
            title: parts[1],
            priority: parts[2],
            category: parts[3],
            xp: parts[4]
        });
    }).filter(Boolean);
}

function rowToTask(row) {
    const time = normalizeTime(row.time || row.start || row.Time || row.Start);
    const title = String(row.title || row.task || row.name || row.Title || row.Task || "").trim();
    if (!time || !title) {
        return null;
    }
    return {
        time,
        title,
        priority: normalizePriority(row.priority || row.Priority),
        category: String(row.category || row.Category || "Imported").trim() || "Imported",
        xp: Number(row.xp || row.txp || row.TXP || row.XP || 20),
        source: "import"
    };
}

function renderImportPreview(message) {
    const preview = document.getElementById("importPreview");
    if (message) {
        preview.innerHTML = `<div class="empty-state">${message}</div>`;
        return;
    }
    if (!importedTimetable.length) {
        preview.innerHTML = `<div class="empty-state">No valid timetable rows found.</div>`;
        return;
    }
    preview.innerHTML = importedTimetable.slice(0, 4).map((task) => `
        <div class="list-item">
            <div class="task-row"><strong>${task.time} - ${task.title}</strong><span class="priority-pill ${task.priority.toLowerCase()}">${task.priority}</span></div>
            <div class="task-meta"><span>${task.category}</span><span>+${task.xp} TXP</span></div>
        </div>
    `).join("");
}

function renderImportedWeek(confirmed = false) {
    const table = document.getElementById("importedWeekTable");
    const fileName = document.getElementById("importedFileName");
    const fileMeta = document.getElementById("importedFileMeta");
    const status = document.getElementById("importedStatus");
    if (!importedWeek && state?.importedWeek) {
        importedWeek = state.importedWeek;
    }
    if (!importedWeek) {
        fileName.textContent = "No timetable imported";
        fileMeta.textContent = "Choose an image, CSV, TXT, or JSON";
        status.textContent = "Waiting";
        status.className = "status-chip";
        table.innerHTML = `<div class="empty-state">Import your timetable to generate a weekly system board here.</div>`;
        return;
    }
    const isConfirmed = confirmed || importedConfirmed || state?.importStatus === "confirmed";
    fileName.textContent = importedFile?.name || state?.importedFileName || "Generated timetable";
    fileMeta.textContent = `${importedFile?.type || "Generated plan"} - ${importedFile ? formatFileSize(importedFile.size) : "KAALIX"}`;
    status.textContent = isConfirmed ? "CONFIRMED" : "REVIEW PENDING";
    status.className = isConfirmed ? "status-chip imported" : "status-chip pending";
    table.innerHTML = buildWeekTableHtml(importedWeek);
}

function buildWeekTableHtml(week) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const times = Object.keys(week);
    return `
        <table class="week-table">
            <thead><tr><th>Time</th>${days.map((day) => `<th>${day}</th>`).join("")}</tr></thead>
            <tbody>
                ${times.map((time) => `
                    <tr>
                        <td class="time-cell">${time}</td>
                        ${days.map((day) => renderWeekCell(week[time][day])).join("")}
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function renderWeekCell(item) {
    const task = item || { title: "Open block", category: "Plan" };
    const type = categoryClass(task.category);
    return `<td><div class="week-cell ${type}"><span>${task.title}</span><small>${task.category}</small></div></td>`;
}

function generateReferenceWeek() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const rows = [
        ["06:00 - 07:00", ["Wake up + Fresh", "Wake up + Stretch", "Wake up + Fresh", "Wake up + Stretch", "Wake up + Fresh", "Wake up + Stretch", "Wake up + Light Walk"], "Health"],
        ["07:00 - 08:00", ["Breakfast + Plan", "Breakfast + Plan", "Breakfast + Plan", "Breakfast + Plan", "Breakfast + Plan", "Breakfast + Relax", "Breakfast + Relax"], "Food"],
        ["08:00 - 10:00", ["DSA Practice", "DSA Practice", "DSA Revision", "DSA Practice", "DSA Revision", "Light Study", "DSA Contest"], "Study / DSA"],
        ["10:00 - 12:00", ["Core Subjects", "Core Subjects", "Core Subjects", "Core Revision", "Core Revision", "Project Work", "Core Revision"], "Study"],
        ["12:00 - 01:00", ["Lunch + Short Rest", "Lunch + Short Rest", "Lunch + Short Rest", "Lunch + Short Rest", "Lunch + Short Rest", "Lunch", "Lunch"], "Food"],
        ["01:00 - 04:00", ["Backend / Project Work", "Backend / Project Work", "Power Nap / Rest", "Backend / Project Work", "Project Review + Improve", "Project Work", "Review + Improve"], "Project"],
        ["04:00 - 05:00", ["Gym", "Gym", "Gym", "Gym", "Gym", "Gym", "Gym"], "Fitness"],
        ["05:00 - 06:00", ["Break", "Break", "Break", "Break", "Break", "Break", "Break"], "Recovery"],
        ["06:00 - 07:30", ["Tools / AI", "Tools / AI", "Weekly Planning", "Tools / AI", "Weekly Planning", "Weekly Review", "Weekly Review"], "Productivity"],
        ["07:30 - 08:30", ["Revision", "Revision", "Weak Areas Focus", "Revision", "Weak Areas Focus", "Weak Areas Focus", "Weak Areas Focus"], "Study"],
        ["08:30 - 10:00", ["Dinner", "Dinner", "Dinner", "Dinner", "Dinner", "Dinner", "Dinner"], "Food"],
        ["10:00 - 10:30", ["Comm. Practice", "Comm. Practice", "Comm. Practice", "Comm. Practice", "Comm. Practice", "Movie / Netflix", "Movie / Netflix"], "Social"],
        ["10:30", ["Plan + Sleep", "Plan + Sleep", "Plan + Sleep", "Plan + Sleep", "Plan + Sleep", "Plan + Sleep", "Night Reward"], "Recovery"]
    ];
    return rows.reduce((week, [time, titles, category]) => {
        week[time] = {};
        days.forEach((day, index) => {
            week[time][day] = { title: titles[index], category, priority: priorityForCategory(category), xp: xpForCategory(category), time: startTimeFromRange(time) };
        });
        return week;
    }, {});
}

function todayTasksFromWeek(week) {
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
    return Object.entries(week).map(([range, row]) => {
        const item = row[day] || row.Mon;
        return {
            time: startTimeFromRange(range),
            title: item.title,
            priority: item.priority || priorityForCategory(item.category),
            category: item.category,
            xp: item.xp || xpForCategory(item.category),
            source: "import"
        };
    });
}

function buildWeekFromTasks(tasks) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return tasks.reduce((week, task) => {
        const range = `${task.time} - ${shiftTime(task.time, 60)}`;
        week[range] = {};
        days.forEach((day) => week[range][day] = task);
        return week;
    }, {});
}

function startTimeFromRange(range) {
    return normalizeTime(String(range).split("-")[0].trim());
}

function priorityForCategory(category) {
    return ["Study / DSA", "Study", "Project", "Fitness"].includes(category) ? "HIGH" : "MEDIUM";
}

function xpForCategory(category) {
    if (["Study / DSA", "Project"].includes(category)) return 60;
    if (category === "Fitness") return 35;
    if (category === "Study") return 45;
    return 20;
}

function categoryClass(category) {
    const text = String(category || "").toLowerCase();
    if (text.includes("study") || text.includes("dsa")) return "cell-study";
    if (text.includes("food")) return "cell-food";
    if (text.includes("fitness")) return "cell-fitness";
    if (text.includes("project")) return "cell-project";
    if (text.includes("recovery")) return "cell-recovery";
    if (text.includes("social")) return "cell-social";
    return "cell-system";
}

function formatFileSize(size) {
    if (!size) return "0 KB";
    return size > 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(size / 1024)} KB`;
}

function normalizePriority(value) {
    const priority = String(value || "MEDIUM").trim().toUpperCase();
    return ["HIGH", "MEDIUM", "LOW"].includes(priority) ? priority : "MEDIUM";
}

function normalizeTime(value) {
    const raw = String(value || "").trim();
    const match = raw.match(/(\d{1,2})[:.](\d{2})/);
    if (!match) {
        return raw.match(/^\d{1,2}$/) ? `${raw.padStart(2, "0")}:00` : "";
    }
    const hours = String(clampNumber(Number(match[1]), 0, 23)).padStart(2, "0");
    const minutes = String(clampNumber(Number(match[2]), 0, 59)).padStart(2, "0");
    return `${hours}:${minutes}`;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitEntries(value) {
    return String(value || "").split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}

function sum(items, key) {
    return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function average(values) {
    if (!values.length) {
        return 0;
    }
    return values.reduce((total, value) => total + Number(value || 0), 0) / values.length;
}

function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function minutesBetween(planned, actual) {
    return Math.max(0, timeToMinutes(actual || "00:00") - timeToMinutes(planned || "00:00"));
}

function timeToMinutes(time) {
    const [hours, minutes] = String(time || "00:00").split(":").map(Number);
    return hours * 60 + minutes;
}

function shiftTime(time, amount) {
    const minutes = timeToMinutes(time) + amount;
    const wrapped = ((minutes % 1440) + 1440) % 1440;
    const hours = String(Math.floor(wrapped / 60)).padStart(2, "0");
    const mins = String(wrapped % 60).padStart(2, "0");
    return `${hours}:${mins}`;
}

function windowToTime(window) {
    const normalized = String(window || "").toLowerCase();
    if (normalized.includes("morning")) {
        return "06:30";
    }
    if (normalized.includes("afternoon")) {
        return "14:00";
    }
    if (normalized.includes("night")) {
        return "21:15";
    }
    return "19:00";
}

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.textContent = value;
    }
}

function calculateNextLevelXP(level) {
    return 100 + Math.max(1, Math.min(100, Number(level) || 1)) * 20;
}

function rankCapForLevel(level) {
    if (level < 11) return "D";
    if (level < 26) return "C";
    if (level < 51) return "B";
    if (level < 76) return "A";
    if (level < 90) return "S";
    if (level < 99) return "SS";
    return "ELITE";
}

function identityFor(level, rank) {
    if (String(rank).includes("ELITE") || level >= 99) return "SHADOW MONARCH";
    if (level >= 76) return "MONARCH";
    if (level >= 51) return "ELITE";
    if (level >= 26) return "PERFORMER";
    if (level >= 11) return "BUILDER";
    return "SURVIVOR";
}

function tierForLevel(level) {
    if (level <= 10) return "Beginner";
    if (level <= 25) return "Builder";
    if (level <= 50) return "Performer";
    if (level <= 75) return "Elite";
    return "Monarch";
}

function formatSeconds(totalSeconds) {
    const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
    const seconds = Math.max(0, totalSeconds) % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDate(value) {
    if (!value) return "Today";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Today";
    return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function escapeAttr(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
