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

    document.getElementById("socialForm").addEventListener("submit", (event) => {
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

    document.getElementById("styleForm").addEventListener("submit", (event) => {
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

    document.getElementById("reelScreenshot").addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        document.getElementById("screenshotName").textContent = file ? file.name : "No screenshot selected";
    });

    document.getElementById("reelForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!state) {
            return;
        }
        const payload = {
            link: document.getElementById("reelLink").value.trim(),
            title: document.getElementById("reelTitle").value.trim(),
            caption: document.getElementById("reelCaption").value.trim(),
            transcript: document.getElementById("reelTranscript").value.trim(),
            notes: document.getElementById("reelNotes").value.trim(),
            screenshotName: document.getElementById("screenshotName").textContent === "No screenshot selected" ? "" : document.getElementById("screenshotName").textContent
        };
        if (!payload.link && !payload.title && !payload.caption && !payload.transcript && !payload.notes) {
            showToast("Add at least one reel detail first.");
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
        document.getElementById("autoAddToTimetable").checked = true;
        document.getElementById("screenshotName").textContent = "No screenshot selected";
        setAnalyzeButton(false);
        persistState();
        showToast("Reel analyzed and saved.");
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
        if (button.dataset.taskAction === "done") {
            playSound("task");
        }
        persistState();
        await syncDailyProgression();
    });

    document.getElementById("reelLibrary").addEventListener("click", (event) => {
        const button = event.target.closest("[data-reel-action='add']");
        if (!button || !state) {
            return;
        }
        const reel = state.reels.find((item) => item.id === button.dataset.reelId);
        if (reel) {
            addInsightTask(reel, false);
            persistState();
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
            themePreference: "monarch"
        },
        dailyLog: {
            ...EMPTY_DAILY_LOG
        },
        studySessions: [],
        reels: [],
        socialLogs: [],
        emotionLogs: [],
        wardrobeLogs: [],
        timetable: defaultTimetable(),
        report: null,
        lastDailyDate: todayKey(),
        progression: {
            level: 1,
            rank: "E",
            txp: 0,
            nextLevelXP: 120,
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
    return { id: uid(), time, title, priority, category, xp: TXP, source, status: "pending" };
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
        status: task.status || "pending"
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
    if (screen === "study" && uiState.studyMode) {
        playSound("study");
    }
}

function populateForms() {
    if (!state) {
        return;
    }
    document.getElementById("profileName").value = state.profile.name || "";
    document.getElementById("profileUsername").value = state.profile.username || "";
    document.getElementById("profileEmail").value = state.profile.email || currentUser?.email || "";
    document.getElementById("profileTitleInput").value = state.profile.title || "";
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
    const averageStyle = average(state.wardrobeLogs.map((item) => Number(item.rating || 0)));
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
    const xp = clampNumber(Math.round(
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

    const level = Math.floor(xp / 500) + 1;
    const xpProgress = xp % 500;
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
        xp,
        level,
        xpProgress,
        xpNeeded: 500,
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
        const response = await fetch("/api/analyze/reel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error("API failed");
        }
        return await response.json();
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
        rankBadge.textContent = `RANK ${rank.replace("_", " ")}`;
        rankBadge.style.borderColor = progression.rankColor || "";
        rankBadge.style.boxShadow = `0 0 18px ${progression.rankColor || "rgba(167,139,250,.45)"}`;
    }
    document.getElementById("xpReadout").textContent = `${txp} / ${next} TXP`;
    document.getElementById("xpBar").style.width = `${clampNumber(progress, 0, 100)}%`;
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
            </div>
        </div>
    `).join("");
}

function renderSocialLogs() {
    renderSimpleList("socialList", state.socialLogs, (item) => `
        <div class="list-item">
            <strong>${item.person} - ${item.place}</strong>
            <div class="task-meta">
                <span>${item.impact} impact</span>
            </div>
            <p>${item.lesson || "No lesson added yet."}</p>
        </div>
    `, "No social entries yet.");
}

function renderStyleLogs() {
    renderSimpleList("styleList", state.wardrobeLogs, (item) => `
        <div class="list-item">
            <strong>${item.outfit}</strong>
            <div class="task-meta">
                <span>${item.occasion}</span>
                <span>Rating ${item.rating}/5</span>
            </div>
            <p>${item.notes || "No notes added."}</p>
        </div>
    `, "No style history yet.");
}

function renderAnalytics(metrics) {
    document.getElementById("analyticsXp").textContent = metrics.xp;
    document.getElementById("productivityScore").textContent = `${metrics.productivityScore}%`;
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
        nextLevelXP: 120,
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
        localStorage.setItem(STORAGE_PREFIX + currentUser.email, JSON.stringify(state));
        renderProgression(calculateMetrics());
        populateForms();
    } catch (error) {
        showToast("Progression saved locally. Backend sync failed.");
    }
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
        localStorage.setItem(STORAGE_PREFIX + currentUser.email, JSON.stringify(state));
        renderProgression(calculateMetrics());
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
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }
    document.addEventListener("pointermove", (event) => {
        cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });
    document.addEventListener("pointerdown", () => cursor.classList.add("active"));
    document.addEventListener("pointerup", () => cursor.classList.remove("active"));
    document.addEventListener("pointerover", (event) => {
        if (event.target.closest("button,a,label,.card,.list-item,.week-cell")) {
            cursor.classList.add("hover");
        }
    });
    document.addEventListener("pointerout", (event) => {
        if (event.target.closest("button,a,label,.card,.list-item,.week-cell")) {
            cursor.classList.remove("hover");
        }
    });
    document.addEventListener("focusin", (event) => {
        if (event.target.matches("input,textarea,select,[contenteditable='true']")) {
            cursor.classList.add("native");
        }
    });
    document.addEventListener("focusout", () => {
        cursor.classList.remove("native");
    });
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
            spotifyLink: ""
        };
    }
}

function saveUiState() {
    localStorage.setItem(UI_KEY, JSON.stringify(uiState));
}

function applyUiState() {
    document.body.classList.toggle("sidebar-hidden", Boolean(uiState.sidebarHidden));
    document.body.classList.toggle("study-mode-active", Boolean(uiState.studyMode));
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
