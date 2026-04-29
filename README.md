# KAALIX - Intelligent Time & Growth System

**Master Time. Master Yourself.**

KAALIX is a futuristic life-management and personal-growth system inspired by Solo Leveling-style progression mechanics and Jarvis-style assistant workflows. It combines a discipline dashboard, TXP progression, dynamic timetable planning, daily logs, content analysis, wardrobe tracking, music/focus tools, and AI-style daily reporting into one black-purple neon productivity system.

> Current implementation note: the live project is a Spring Boot application that serves a static HTML/CSS/JavaScript frontend. It does not currently use React, Next.js, Tailwind CSS, Node.js, or Python FastAPI. Those technologies are listed in this README as future architecture options where relevant, but the documented setup below reflects the actual codebase.

---

## Table Of Contents

- [Project Description](#project-description)
- [Feature Overview](#feature-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Software Requirements](#software-requirements)
- [Installation Guide](#installation-guide)
- [Environment And Configuration](#environment-and-configuration)
- [How To Use KAALIX](#how-to-use-kaalix)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [UI/UX Design System](#uiux-design-system)
- [Testing](#testing)
- [Known Constraints](#known-constraints)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Project Description

KAALIX is designed to help a user convert daily time into measurable growth. It treats life as a system of tasks, choices, focus sessions, habits, mood signals, learning blocks, and recovery loops. Instead of only storing to-do items, KAALIX evaluates behavior, updates progression, recommends the next action, and produces daily feedback.

The product is built around three core ideas:

1. **Time as XP**  
   Every meaningful action can produce TXP, short for Time XP. Study, DSA, workouts, wake discipline, and distraction control increase TXP. Wasted time, skipped study, late wake-ups, anger, and overthinking reduce it.

2. **Life as a progression system**  
   The app uses levels, tiers, ranks, streaks, stats, and daily scores to make discipline visible. This is inspired by Solo Leveling's system UI, ranks, and personal evolution loop.

3. **Assistant-style daily guidance**  
   The app includes Jarvis-like suggestions, "What should I do now?" logic, dynamic timetable adaptation, daily reports, and content/habit recommendations.

KAALIX exists to solve a common problem: people collect productivity tools, music apps, notes, schedules, and habit trackers separately, but they do not get one integrated system that connects daily behavior to long-term identity growth.

---

## Feature Overview

### 1. Dashboard

The Dashboard is the main KAALIX command center.

It shows:

- User name and mission
- Current level
- Current rank
- TXP progress bar
- Daily quote with text-to-speech
- Stats overview
- Current task from the timetable
- "What should I do now?" recommendation
- AI/Jarvis-style signals
- Quick TXP actions
- Reel/content insights
- Habit intelligence
- Dashboard music card

The dashboard is connected to:

- Daily tracker entries
- Timetable state
- Backend progression APIs
- Music mini-player
- AI report generation

### 2. TXP, Level, Rank, And Streak System

KAALIX includes a backend progression system implemented in Spring Boot.

Core concepts:

- **TXP:** Time XP earned or lost through daily actions.
- **Level:** Quantity of effort, ranging from level 1 to 100.
- **Tier:** Beginner, Builder, Performer, Elite, Monarch.
- **Rank:** Quality of daily performance.
- **Streak:** Consecutive daily completion momentum.

Level formula:

```text
Next_Level_XP = 100 + (current_level * 20)
```

Positive TXP rules:

- Study 1 hour: `+20 TXP`
- Solve DSA: `+15 TXP`
- Workout: `+15 TXP`
- Wake on time: `+10 TXP`
- No distractions: `+10 TXP`

Negative TXP rules:

- Waste more than 2 hours: `-20 TXP`
- Skip study: `-15 TXP`
- Late wake: `-5 TXP`
- Overthinking/anger: `-10 TXP`

Rank mapping:

| Score Range | Rank |
|---:|---|
| 0-30 | E |
| 30-50 | D |
| 50-65 | C |
| 65-75 | B |
| 75-85 | A |
| 85-92 | S |
| 92-96 | SS |
| 96-100 | SSS |
| Level >= 99, Score >= 95, High Streak | ELITE_RANKER |

Streak bonuses:

| Streak | Bonus |
|---:|---:|
| 3 days | +20 TXP |
| 7 days | +50 TXP |
| 30 days | +200 TXP |

### 3. Dynamic Timetable

The timetable is the main planning engine.

Implemented capabilities:

- Default KAALIX daily schedule
- Import timetable from:
  - CSV
  - TXT
  - JSON
  - Excel-like file input placeholder
  - Image file placeholder with generated reference week
- Review imported timetable
- Confirm imported timetable
- Store confirmed timetable in app state
- Edit timetable rows manually
- Add timetable tasks
- Remove timetable tasks
- Sort tasks by time
- Recalculate current task and daily plan
- Feed dashboard current task
- Feed "What should I do now?" logic
- Feed daily report recommendations

When a daily log indicates a delay, KAALIX adapts the schedule by:

- Shifting pending tasks later
- Preserving high-priority tasks
- Removing or reducing lower-value tasks when needed
- Creating system signals explaining the change

### 4. Daily Tracker

The Daily Tracker combines mood, habits, study, wake/sleep time, emotional control, and reflection in one screen.

Tracked fields:

- Wake time
- Sleep time
- Study hours
- DSA/coding hours
- Workout minutes
- Mood
- Mood trigger
- Better response
- Habit checklist
- Habits done
- Positive actions
- Negative actions
- Emotional reaction
- Reflection note

Daily tracker effects:

- Calculates TXP preview
- Updates timetable adaptation
- Syncs daily performance to backend progression
- Updates level/rank/streak/TXP
- Updates dashboard metrics
- Updates AI report data

### 5. Study / DSA Tracker

Study sessions can be logged with:

- Subject
- Topic
- Minutes
- Questions solved
- Platform
- Confidence

The study area includes Study Mode, which can play a focus audio loop.

### 6. Reel / Content Analyzer

The content analyzer is built around safe/manual input. It does not scrape private accounts or download copyrighted media.

Inputs:

- Reel/content link
- Title
- Caption
- Transcript
- Notes
- Screenshot file name/input

Output:

- Category
- Summary
- Lesson
- Action item
- Productivity classification
- Suggested timetable task
- Suggested duration
- Suggested TXP value

Supported categories include:

- Books
- Psychology
- Anime
- Movies
- Fitness
- Study
- Productivity
- Fashion
- Food
- Negative

Useful reels can generate suggested timetable actions such as reading, workout, study, or reflection.

### 7. AI Daily Report

The Daily AI Report summarizes the user's day and provides improvement direction.

Report sections include:

- Best action
- Worst action
- Missed tasks
- Improvements
- Next plan
- Timetable recommendations
- Behavioral advice

The report is generated by a Spring Boot service using current client state. It is deterministic/rule-based in the current implementation, with a path for future LLM integration.

### 8. Jarvis-Style Assistant

The assistant layer appears through:

- Dashboard recommendations
- AI Jarvis card
- Schedule signals
- Daily report
- Music suggestions
- Timetable adaptation
- Reel-to-habit suggestions

It currently uses rule-based intelligence inside JavaScript and Java services.

### 9. KAALIX Music System

The Music System is a futuristic black-purple music player with a Spotify-style layout and safe import rules.

Implemented features:

- Full music page
- Dashboard music card
- Global bottom mini-player
- Play/pause
- Previous/next
- Shuffle
- Repeat
- Like/favorite
- Volume control
- Progress bar
- Animated waveform/equalizer that runs only while playing
- Now playing queue
- Queue reset
- Playlist grid
- Playlist detail modal
- Play playlist
- Queue playlist
- Add current song to playlist
- Create custom playlist
- Local file upload
- Backend file storage
- Backend song metadata storage
- Spotify connect placeholder
- YouTube manual link import
- Instagram manual link import

Required playlists seeded by the backend:

- Focus Mode
- Workout
- Study Flow
- Motivation
- Calm Mind
- Solo Leveling / Anime Vibes
- Custom Playlist
- Recently Imported

Legal and safety rules:

- KAALIX does not download copyrighted music from Spotify, YouTube, Instagram, or private sources.
- Spotify support is an OAuth/API placeholder and requires official API credentials.
- YouTube and Instagram support stores links and metadata only.
- Local upload is fully working for user-provided audio files.

### 10. Virtual Wardrobe

The wardrobe module stores outfit logs and style notes.

Current fields:

- Outfit/clothing description
- Occasion
- Rating
- Tags/notes

Planned ML features:

- Clothing detection
- Background removal
- Item tagging
- Outfit generation

### 11. Friend / Social Tracker

The social tracker logs interactions and their effect.

Tracked fields:

- Person
- Place/context
- Positive or negative impact
- Lesson learned

This contributes to social and emotional metrics.

### 12. Quotes And Voice

The app includes inspirational quotes:

- Master time. Master yourself.
- Discipline is built when nobody is watching.
- Small actions repeated daily create power.
- You are not behind. You are being forged.
- Control the day before the day controls you.

Quote features:

- Show quote on dashboard
- Next quote button
- Read quote aloud through browser Text-to-Speech
- Stop voice
- Quote voice preference in settings

### 13. Profile And Settings

Settings include:

- Name
- Username
- Email
- Password change
- Avatar upload
- Mission
- Title
- Planned wake time
- Planned sleep time
- Theme preference
- Background music preference
- Quote voice preference
- Local song import shortcut
- Spotify link shortcut
- Reset rank/TXP/day

Rank is no longer manually editable. New users default to rank `E`, and rank changes only through daily performance.

---

## Architecture

KAALIX currently uses a single Spring Boot application that serves both the backend APIs and the frontend static assets.

```text
Browser
  |
  |-- Static frontend
  |     index.html
  |     styles.css
  |     app.js
  |     assets/*
  |
  |-- REST API calls
        |
        Spring Boot Controllers
          |
          Services
          |
          Spring Data JPA Repositories
          |
          H2 file database
```

### Data Flow

1. User signs up or logs in in the browser.
2. Client profile and UI state are stored in `localStorage`.
3. Daily logs are submitted to `/api/daily-log`.
4. Backend calculates TXP, level, rank, streak, and score.
5. Frontend stores the returned progression status and re-renders dashboard metrics.
6. Timetable edits/imports update client state and drive current task logic.
7. Reel analysis and daily reports call backend rule services.
8. Music uploads call `/api/music/upload`, store files under `data/music`, and save metadata in the database.
9. Music library calls hydrate playlists and recent songs from backend state.

---

## Tech Stack

### Current Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- Browser Web Audio/HTMLAudioElement
- Browser SpeechSynthesis API
- Static assets served by Spring Boot

### Current Backend

- Java 17
- Spring Boot 3.2.6
- Spring Web
- Spring Validation
- Spring Data JPA
- Hibernate
- Maven

### Current Database

- H2 file database for local development:

```properties
jdbc:h2:file:./data/kaalix;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;AUTO_SERVER=TRUE
```

The schema is written in a MySQL/PostgreSQL-friendly style in `src/main/resources/schema.sql`.

### Current Testing

- JUnit 5
- Spring Boot Test
- H2 in-memory test database

### Planned / Future Stack Options

The original product target mentions the following stack, but these are not currently implemented in this repository:

- React or Next.js frontend
- Tailwind CSS
- Node.js service
- Python FastAPI AI microservice
- MySQL or PostgreSQL production database
- JWT authentication
- External LLM provider integration

---

## Folder Structure

```text
R:\project\codex
├── pom.xml
├── README.md
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── rishisystem
│   │   │           ├── RishiSystemApplication.java
│   │   │           ├── model
│   │   │           ├── music
│   │   │           ├── progression
│   │   │           ├── service
│   │   │           └── web
│   │   └── resources
│   │       ├── application.properties
│   │       ├── schema.sql
│   │       └── static
│   │           ├── index.html
│   │           ├── app.js
│   │           ├── styles.css
│   │           └── assets
│   └── test
│       └── java
│           └── com
│               └── rishisystem
│                   └── progression
├── data
│   └── music
├── target
├── .m2repo
└── android-wrapper
```

### Root Files

| Path | Purpose |
|---|---|
| `pom.xml` | Maven project definition and Spring Boot dependencies. |
| `README.md` | Project documentation. |
| `kaalix-cim.log` and other logs | Runtime logs from local server runs. |

### Backend Source

| Path | Purpose |
|---|---|
| `src/main/java/com/rishisystem/RishiSystemApplication.java` | Spring Boot entry point. |
| `src/main/java/com/rishisystem/web` | General KAALIX API controller. |
| `src/main/java/com/rishisystem/service` | Rule-based report and reel analysis services. |
| `src/main/java/com/rishisystem/model` | Request/response DTOs for reel analysis. |
| `src/main/java/com/rishisystem/progression` | TXP, level, rank, streak, and daily log backend. |
| `src/main/java/com/rishisystem/music` | Music system backend: songs, playlists, uploads, connected sources. |

### Frontend Source

| Path | Purpose |
|---|---|
| `src/main/resources/static/index.html` | All app screens and static markup. |
| `src/main/resources/static/styles.css` | KAALIX black-purple neon UI system. |
| `src/main/resources/static/app.js` | Client state, navigation, rendering, timetable logic, music player, API calls. |
| `src/main/resources/static/assets` | Logo, portrait, and audio files. |

### Database And Storage

| Path | Purpose |
|---|---|
| `src/main/resources/schema.sql` | Reference schema for progression and music tables. |
| `data/kaalix*` | H2 file database files created at runtime. |
| `data/music` | Uploaded local audio files. |

### Android Wrapper

`android-wrapper` contains experimental Android wrapper files and SDK tooling. The current primary app is the Spring Boot web application. The wrapper is not required to run the web app.

---

## Software Requirements

Minimum recommended development environment:

- Java 17 or newer
- Maven 3.9+
- Git
- Modern browser:
  - Chrome
  - Edge
  - Firefox
- Optional:
  - Node.js 18+ if you want to add future frontend tooling
  - Python 3.11+ if you want to add a future FastAPI AI microservice
  - MySQL 8+ or PostgreSQL 15+ for production migration

Current project does not require:

- `npm install`
- `npm run dev`
- React build tooling
- Tailwind compiler

---

## Installation Guide

### 1. Clone The Repository

```bash
git clone <your-repository-url>
cd codex
```

### 2. Verify Java And Maven

```bash
java -version
mvn -version
```

The app is configured for Java 17. Newer Java versions can work, but Java 17 is the baseline.

### 3. Install Dependencies

Maven resolves dependencies automatically:

```bash
mvn clean install
```

This project has also been run with a local Maven repository:

```powershell
mvn "-Dmaven.repo.local=R:\project\codex\.m2repo" clean install
```

### 4. Start The Backend And Frontend

Because the frontend is served by Spring Boot, one command runs the full app:

```bash
mvn spring-boot:run
```

Or run the packaged jar:

```bash
mvn -DskipTests package
java -jar target/rishi-system-1.0.0.jar --server.port=8080
```

Windows PowerShell version used during development:

```powershell
mvn "-Dmaven.repo.local=R:\project\codex\.m2repo" -DskipTests package
java -jar target\rishi-system-1.0.0.jar --server.port=8080
```

### 5. Open The App

```text
http://localhost:8080/
```

### 6. Access H2 Console

```text
http://localhost:8080/h2-console
```

Use:

```text
JDBC URL: jdbc:h2:file:./data/kaalix
User: sa
Password: <empty>
```

---

## Environment And Configuration

Configuration lives in:

```text
src/main/resources/application.properties
```

Current properties:

```properties
spring.application.name=kaalix
server.port=8080
spring.jackson.default-property-inclusion=non_null
spring.web.resources.cache.cachecontrol.no-cache=true
spring.web.resources.cache.cachecontrol.no-store=true
spring.datasource.url=jdbc:h2:file:./data/kaalix;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;AUTO_SERVER=TRUE
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
spring.h2.console.enabled=true
```

### Environment Variables

The current project does not require `.env` variables. For production, move sensitive values out of `application.properties` and into environment variables.

Recommended production variables:

| Variable | Purpose |
|---|---|
| `SERVER_PORT` | Runtime HTTP port. |
| `DB_URL` | Production database JDBC URL. |
| `DB_USER` | Production database username. |
| `DB_PASSWORD` | Production database password. |
| `JWT_SECRET` | Future JWT signing secret. |
| `SPOTIFY_CLIENT_ID` | Future Spotify OAuth client ID. |
| `SPOTIFY_CLIENT_SECRET` | Future Spotify OAuth client secret. |
| `OPENAI_API_KEY` | Future LLM integration key. |
| `KAALIX_MUSIC_STORAGE` | Future configurable upload storage folder. |

Example production override:

```bash
java -jar target/rishi-system-1.0.0.jar \
  --spring.datasource.url="$DB_URL" \
  --spring.datasource.username="$DB_USER" \
  --spring.datasource.password="$DB_PASSWORD" \
  --server.port=8080
```

---

## How To Use KAALIX

### 1. Create An Account

1. Open `http://localhost:8080/`.
2. Select `Signup`.
3. Enter name, email, and password.
4. KAALIX creates a local browser profile.
5. Backend progression defaults to:
   - Level: `1`
   - Rank: `E`
   - TXP: `0`
   - Next Level XP: `120`

Current authentication is local browser storage, not production JWT authentication.

### 2. Login

1. Open the login tab.
2. Enter the email and password used during signup.
3. KAALIX loads the saved client state.
4. The backend progression status is fetched through `/api/user-status`.

### 3. Use The Dashboard

The Dashboard gives a fast overview of:

- Current TXP
- Level
- Rank
- Current task
- Productivity score
- AI recommendations
- Quick TXP actions
- Music status
- Quote

Use the quote controls to switch or read quotes aloud.

### 4. Add A Daily Log

1. Open `Daily Tracker`.
2. Fill wake/sleep, study, DSA, workout, mood, habits, and reflection.
3. Save the day.
4. KAALIX:
   - Calculates TXP
   - Updates backend progression
   - Updates level/rank/streak
   - Adapts timetable
   - Updates the report context

### 5. Import Or Edit A Timetable

1. Open `Timetable`.
2. Upload a CSV, TXT, JSON, Excel-like file, or image.
3. Review the generated timetable.
4. Click `Review & Confirm`.
5. Edit rows in the Main Editable Timetable.
6. Dashboard current task and "What should I do now?" update from the confirmed plan.

CSV template:

```csv
time,title,priority,category,txp
06:00,Wake + water + sunlight,HIGH,Health,25
09:00,Deep work study block,HIGH,Study / DSA,60
```

### 6. Track Study / DSA

1. Open `Study / DSA`.
2. Add subject, topic, minutes, questions solved, platform, and confidence.
3. Use `Study Mode` to play the study audio loop.

### 7. Analyze Reels Or Content

1. Open `Reel Analysis`.
2. Paste a public/manual link and content details.
3. Add caption, transcript, notes, or screenshot reference.
4. Analyze the content.
5. KAALIX categorizes it and can suggest a timetable habit.

### 8. Use The Music System

1. Open `Music System`.
2. Use play/pause, next, previous, shuffle, repeat, volume, and like controls.
3. Upload local audio files.
4. Create custom playlists.
5. Open a playlist card to view detail.
6. Play or queue a playlist.
7. Use YouTube/Instagram link import safely.
8. Use Spotify connect placeholder when credentials are available.

The bottom mini-player remains visible across app screens.

### 9. Log Wardrobe And Style

1. Open `Wardrobe`.
2. Enter outfit details, occasion, rating, and notes.
3. Save the entry.

### 10. Log Social Interactions

1. Open `Friends`.
2. Record person, context, impact, and lesson.
3. KAALIX uses this for social/emotional metrics.

### 11. Generate AI Daily Report

1. Open `AI Report`.
2. Click `Generate Report`.
3. Review best action, worst action, missed tasks, improvements, and next plan.

### 12. Update Settings

Open `Settings` to update:

- Name
- Username
- Email
- Password
- Avatar
- Mission
- Title
- Wake/sleep preferences
- Music preference
- Quote voice preference
- Theme preference

---

## API Endpoints

Base URL:

```text
http://localhost:8080
```

### System APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check. |
| `POST` | `/api/analyze/reel` | Analyze manual reel/content input. |
| `POST` | `/api/report/daily` | Generate rule-based daily report from submitted state. |

### Progression APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/daily-log` | Submit daily activity and update TXP/level/rank/streak. |
| `GET` | `/api/user-status?userKey={email}` | Get user progression status. |
| `POST` | `/api/user-reset` | Reset level, rank, TXP, streak, and daily status. |

Legacy aliases are also present for some endpoints:

- `/daily-log`
- `/user-status`
- `/user-reset`

### Music APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/music/library?userKey={email}` | Fetch playlists, recent songs, connected sources. |
| `POST` | `/api/music/upload` | Upload local audio file and save song metadata. |
| `POST` | `/api/music/import-link` | Store safe YouTube/Instagram link metadata. |
| `POST` | `/api/music/connect` | Connect or initialize a supported source placeholder. |
| `POST` | `/api/music/playlists` | Create custom playlist. |
| `POST` | `/api/music/playlists/songs` | Add song to playlist. |
| `DELETE` | `/api/music/playlists/{playlistId}/songs/{songId}` | Remove song from playlist. |
| `GET` | `/api/music/files/{fileName}` | Stream uploaded local audio file. |

### Example Requests

Submit a daily log:

```bash
curl -X POST http://localhost:8080/api/daily-log \
  -H "Content-Type: application/json" \
  -d '{
    "userKey": "rishi@example.com",
    "name": "Rishi",
    "studyHours": 2,
    "dsaCount": 1,
    "workout": true,
    "wakeOnTime": true,
    "noDistractions": true,
    "wastedTime": 0,
    "tasksCompleted": 5,
    "totalTasks": 7
  }'
```

Get user status:

```bash
curl "http://localhost:8080/api/user-status?userKey=rishi@example.com"
```

Upload local music:

```bash
curl -X POST http://localhost:8080/api/music/upload \
  -F "userKey=rishi@example.com" \
  -F "title=Focus Track" \
  -F "artist=Local File" \
  -F "file=@/path/to/song.mp3"
```

Connect Spotify placeholder:

```bash
curl -X POST http://localhost:8080/api/music/connect \
  -H "Content-Type: application/json" \
  -d '{"userKey":"rishi@example.com","source":"SPOTIFY"}'
```

Expected response:

```json
{
  "message": "Spotify API credentials required."
}
```

---

## Database Schema

The database schema is documented in:

```text
src/main/resources/schema.sql
```

The app uses Hibernate `ddl-auto=update` locally, so tables are created/updated automatically in H2 during development.

### `users`

Stores progression state.

| Column | Purpose |
|---|---|
| `id` | Primary key. |
| `name` | Display name. |
| `user_key` | Unique user identifier, currently email. |
| `level` | Current level. |
| `txp` | Current TXP toward next level. |
| `next_level_xp` | Required TXP for next level. |
| `rank` | Current quality rank. |
| `streak` | Consecutive active days. |
| `last_active_date` | Last daily log date. |
| `initial_rank_locked` | Compatibility field retained for existing local H2 databases. |

### `daily_logs`

Stores submitted daily performance records.

| Column | Purpose |
|---|---|
| `user_id` | Linked user. |
| `date` | Log date. |
| `study_hours` | Study effort. |
| `dsa_count` | DSA/coding count. |
| `workout` | Workout completed. |
| `wake_on_time` | Wake discipline. |
| `no_distractions` | Distraction control. |
| `skip_study` | Negative study signal. |
| `late_wake` | Late wake signal. |
| `overthinking_anger` | Emotional control signal. |
| `wasted_time` | Wasted hours. |
| `tasks_completed` | Completed timetable tasks. |
| `total_tasks` | Total timetable tasks. |
| `score` | Completion percentage. |
| `txp_earned` | TXP earned for that daily log. |

### `songs`

Stores music metadata.

| Column | Purpose |
|---|---|
| `id` | Primary key. |
| `title` | Song title. |
| `artist` | Artist/source label. |
| `source` | `LOCAL`, `SPOTIFY`, `YOUTUBE`, or `INSTAGRAM`. |
| `source_url` | External source link. |
| `file_path` | Local uploaded file path. |
| `stream_url` | App stream URL or external source URL. |
| `duration` | Duration if known. |
| `cover_image` | Cover image URL. |
| `created_at` | Creation timestamp. |

### `playlists`

Stores music playlists.

| Column | Purpose |
|---|---|
| `id` | Primary key. |
| `name` | Playlist name. |
| `type` | `SYSTEM` or `CUSTOM`. |
| `mood` | Playlist mood/task category. |
| `created_by` | User key. |
| `created_at` | Creation timestamp. |

### `playlist_songs`

Many-to-many relationship between playlists and songs.

| Column | Purpose |
|---|---|
| `playlist_id` | Playlist reference. |
| `song_id` | Song reference. |
| `added_at` | Added timestamp. |

### `user_music_preferences`

Prepared table for persistent music preferences.

| Column | Purpose |
|---|---|
| `user_key` | User identifier. |
| `music_enabled` | Whether music should play. |
| `volume` | Saved volume. |
| `repeat_enabled` | Repeat preference. |
| `shuffle_enabled` | Shuffle preference. |

### `connected_music_sources`

Stores safe external source connection state.

| Column | Purpose |
|---|---|
| `user_key` | User identifier. |
| `source` | Music source. |
| `connected` | Connection state. |
| `status_message` | Setup or legal/safety message. |
| `connected_at` | Timestamp. |

---

## UI/UX Design System

KAALIX uses a premium futuristic system UI inspired by Solo Leveling and shadow-monarch visual language.

### Theme

| Token | Value |
|---|---|
| Background | `#07080f`, `#0d0f1a` |
| Card | `#0f1221`, `#131728` |
| Purple Neon | `#8b5cf6`, `#a78bfa`, `#6d28d9` |
| Accent Cyan | `#22d3ee` |
| Success | `#22c55e` |
| Danger | `#ef4444` |
| Gold | `#f59e0b` |

### Visual Style

- Black/purple futuristic interface
- Glassmorphism cards
- Neon glow borders
- Animated aura background
- Futuristic sword-style cursor
- Smooth hover effects
- Responsive grids
- Sidebar navigation
- Bottom global music mini-player
- Animated waveform and equalizer

### Typography

The frontend loads Google Fonts:

- DM Sans
- Rajdhani
- Space Mono

### Component Patterns

- Cards for dashboard panels
- Chips for metadata
- Pills for ranks and priorities
- Glow buttons for primary actions
- Ghost buttons for secondary actions
- Modal for playlist detail
- Editable rows for timetable editing
- Toast notifications for feedback

---

## Testing

### Run Automated Tests

```bash
mvn test
```

PowerShell local repository version:

```powershell
mvn "-Dmaven.repo.local=R:\project\codex\.m2repo" test
```

Current tests:

- `ProgressionServiceTest`
  - Level-up behavior
  - Rank calculation
  - Negative TXP behavior
  - Edge cases around progression

### Validate Frontend JavaScript

```bash
node --check src/main/resources/static/app.js
```

### Manual QA Checklist

Use this before shipping a change:

- App starts on `http://localhost:8080/`
- Signup works
- Login works
- Dashboard renders
- Level/rank/TXP status loads
- Quick TXP buttons update local state
- Daily Tracker saves
- Daily Tracker calls `/api/daily-log`
- Timetable import accepts CSV/TXT/JSON/image input
- Review & Confirm updates timetable
- Editable timetable rows save correctly
- Current task appears on dashboard
- AI report generates
- Reel analyzer categorizes content
- Wardrobe entry saves
- Social tracker entry saves
- Settings profile update works
- Quote voice reads and stops
- Music page opens
- Music icons are visible
- Play/pause works
- Next/previous work
- Shuffle/repeat toggle
- Waveform animates only while playing
- Mini-player persists across pages
- Playlist modal opens
- Playlist play/queue works
- Local file upload returns `200`
- Uploaded files appear in `data/music`
- YouTube/Instagram link import stores metadata
- Spotify connect returns credential setup message
- Browser console has no errors
- Backend log has no request errors

---

## Known Constraints

- Authentication is currently implemented with browser `localStorage`, not JWT.
- Passwords are stored locally in browser state for the current MVP and are not production-safe.
- Most frontend app state is stored in `localStorage`.
- The timetable is client-state-first; only progression and music have stronger backend persistence.
- AI behavior is deterministic/rule-based, not connected to an LLM.
- Reel analyzer uses safe manual inputs only; it does not scrape external platforms.
- Spotify integration is a placeholder until official OAuth credentials are configured.
- YouTube and Instagram imports store links only and do not download audio.
- H2 is used for local development; production should use PostgreSQL or MySQL.
- There is no React/Next/Tailwind build pipeline in the current repo.
- Android wrapper files exist but are not required for the main web app.

---

## Future Improvements

### Product

- Real JWT authentication
- Multi-user server-backed profiles
- Cloud sync
- Notifications and reminders
- Calendar integration
- Advanced analytics dashboard
- Mobile-first responsive polish
- PWA offline mode
- Native Android/iOS apps

### AI

- LLM-powered daily report
- LLM-powered timetable optimizer
- Personalized study plan generation
- Food suggestions based on goals
- Outfit suggestions using wardrobe data
- Mood trend prediction
- Long-term habit coaching

### Music

- Spotify OAuth
- Spotify playlist import through official API
- YouTube embed support
- Audio waveform through Web Audio API analyser
- ID3 metadata parsing
- Cover art extraction
- Playlist drag-and-drop ordering
- Persistent user music preferences API usage

### Backend

- PostgreSQL production profile
- Database migrations with Flyway or Liquibase
- DTO validation hardening
- Rate limiting
- File upload type/size enforcement
- Structured logging
- OpenAPI/Swagger documentation
- Dockerfile and Docker Compose

### Frontend

- Migration to React or Next.js
- Componentized design system
- Tailwind CSS or CSS variables/token build pipeline
- Zustand/Redux for state management
- Playwright end-to-end tests
- Accessibility improvements

---

## Contributing

Contributions should keep the KAALIX identity intact: disciplined, futuristic, black-purple, readable, and system-oriented.

### Development Workflow

1. Create a feature branch.
2. Make focused changes.
3. Run tests.
4. Validate the app manually.
5. Document new APIs or UI behavior.
6. Submit a pull request.

### Coding Guidelines

- Prefer simple, readable code.
- Keep UI changes consistent with the design system.
- Do not introduce illegal scraping or unauthorized downloads.
- Keep external integrations official and permission-based.
- Add backend tests for new service logic.
- Avoid storing sensitive data in browser storage in production features.

### Commit Style

Recommended examples:

```text
feat: add playlist detail modal
fix: update TXP progress calculation
docs: expand setup guide
test: cover rank edge cases
```

---

## License

This project currently uses a placeholder license.

Recommended options:

- MIT License for open-source distribution
- Proprietary License for private SaaS/product use

Add the final license text in a `LICENSE` file before public release.

---

## Author

Created by **Rishi**.

---

## Quick Start

```bash
mvn -DskipTests package
java -jar target/rishi-system-1.0.0.jar --server.port=8080
```

Open:

```text
http://localhost:8080/
```

KAALIX is now ready to run locally.
