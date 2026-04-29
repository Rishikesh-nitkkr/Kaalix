package com.rishisystem.music;

import com.rishisystem.music.MusicDtos.AddSongRequest;
import com.rishisystem.music.MusicDtos.ConnectSourceRequest;
import com.rishisystem.music.MusicDtos.CreatePlaylistRequest;
import com.rishisystem.music.MusicDtos.ImportLinkRequest;
import com.rishisystem.music.MusicDtos.MusicLibraryResponse;
import com.rishisystem.music.MusicDtos.PlaylistResponse;
import com.rishisystem.music.MusicDtos.SongResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class MusicService {
    private static final List<String> REQUIRED_PLAYLISTS = List.of(
            "Focus Mode", "Workout", "Study Flow", "Motivation", "Calm Mind",
            "Solo Leveling / Anime Vibes", "Custom Playlist", "Recently Imported"
    );

    private final SongRepository songRepository;
    private final MusicPlaylistRepository playlistRepository;
    private final PlaylistSongRepository playlistSongRepository;
    private final ConnectedMusicSourceRepository connectedSourceRepository;
    private final Path storageRoot;

    public MusicService(
            SongRepository songRepository,
            MusicPlaylistRepository playlistRepository,
            PlaylistSongRepository playlistSongRepository,
            ConnectedMusicSourceRepository connectedSourceRepository,
            @Value("${kaalix.music.storage:data/music}") String storagePath
    ) {
        this.songRepository = songRepository;
        this.playlistRepository = playlistRepository;
        this.playlistSongRepository = playlistSongRepository;
        this.connectedSourceRepository = connectedSourceRepository;
        this.storageRoot = Path.of(storagePath).toAbsolutePath().normalize();
    }

    @Transactional
    public MusicLibraryResponse library(String userKey) {
        seedPlaylists(userKey);
        List<PlaylistResponse> playlists = playlistRepository.findByCreatedByOrCreatedByIsNullOrderByCreatedAtAsc(userKey).stream()
                .map(this::toPlaylist)
                .toList();
        List<SongResponse> recentSongs = songRepository.findTop30ByOrderByCreatedAtDesc().stream().map(this::toSong).toList();
        List<String> connected = connectedSourceRepository.findByUserKey(userKey).stream()
                .filter(ConnectedMusicSource::isConnected)
                .map(item -> item.getSource().name())
                .toList();
        return new MusicLibraryResponse(playlists, recentSongs, connected);
    }

    @Transactional
    public SongResponse upload(String userKey, MultipartFile file, String title, String artist, Long playlistId) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Music file is required.");
        }
        Files.createDirectories(storageRoot);
        String original = cleanName(file.getOriginalFilename() == null ? "kaalix-song.mp3" : file.getOriginalFilename());
        String extension = original.contains(".") ? original.substring(original.lastIndexOf('.')) : ".audio";
        String storedName = UUID.randomUUID() + extension.toLowerCase(Locale.ROOT);
        Path target = storageRoot.resolve(storedName).normalize();
        if (!target.startsWith(storageRoot)) {
            throw new IllegalArgumentException("Invalid file path.");
        }
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        Song song = new Song();
        song.setTitle(nonBlank(title, stripExtension(original)));
        song.setArtist(nonBlank(artist, "Local File"));
        song.setSource(MusicSource.LOCAL);
        song.setFilePath(target.toString());
        song.setStreamUrl("/api/music/files/" + storedName);
        song.setCoverImage("/assets/kaalix-logo.png");
        song.setDuration("--:--");
        song.setCreatedAt(Instant.now());
        song = songRepository.save(song);
        addSongToPlaylist(resolvePlaylist(userKey, playlistId, "Recently Imported"), song);
        return toSong(song);
    }

    @Transactional
    public SongResponse importLink(ImportLinkRequest request) {
        Song song = new Song();
        song.setTitle(nonBlank(request.title(), request.source().name() + " Import"));
        song.setArtist(nonBlank(request.artist(), request.source().name()));
        song.setSource(request.source());
        song.setSourceUrl(request.sourceUrl());
        song.setStreamUrl(request.sourceUrl());
        song.setCoverImage("/assets/kaalix-logo.png");
        song.setDuration("--:--");
        song = songRepository.save(song);
        addSongToPlaylist(resolvePlaylist(request.userKey(), request.playlistId(), "Recently Imported"), song);
        return toSong(song);
    }

    @Transactional
    public PlaylistResponse createPlaylist(CreatePlaylistRequest request) {
        MusicPlaylist playlist = new MusicPlaylist();
        playlist.setName(request.name().trim());
        playlist.setType("CUSTOM");
        playlist.setMood(nonBlank(request.mood(), "Custom"));
        playlist.setCreatedBy(request.userKey());
        return toPlaylist(playlistRepository.save(playlist));
    }

    @Transactional
    public PlaylistResponse addSong(AddSongRequest request) {
        MusicPlaylist playlist = playlistRepository.findById(request.playlistId()).orElseThrow();
        Song song = songRepository.findById(request.songId()).orElseThrow();
        addSongToPlaylist(playlist, song);
        return toPlaylist(playlist);
    }

    @Transactional
    public PlaylistResponse removeSong(Long playlistId, Long songId) {
        playlistSongRepository.deleteByPlaylistIdAndSongId(playlistId, songId);
        return playlistRepository.findById(playlistId).map(this::toPlaylist).orElseThrow();
    }

    @Transactional
    public String connect(ConnectSourceRequest request) {
        ConnectedMusicSource item = connectedSourceRepository.findByUserKeyAndSource(request.userKey(), request.source())
                .orElseGet(ConnectedMusicSource::new);
        item.setUserKey(request.userKey());
        item.setSource(request.source());
        item.setConnected(request.source() != MusicSource.SPOTIFY);
        item.setStatusMessage(request.source() == MusicSource.SPOTIFY
                ? "Spotify API credentials required."
                : request.source().name() + " link import enabled.");
        item.setConnectedAt(Instant.now());
        connectedSourceRepository.save(item);
        return item.getStatusMessage();
    }

    public Resource file(String fileName) throws MalformedURLException {
        Path target = storageRoot.resolve(cleanName(fileName)).normalize();
        if (!target.startsWith(storageRoot) || !Files.exists(target)) {
            throw new IllegalArgumentException("File not found.");
        }
        return new UrlResource(target.toUri());
    }

    private void seedPlaylists(String userKey) {
        for (String name : REQUIRED_PLAYLISTS) {
            playlistRepository.findByNameAndCreatedBy(name, userKey).orElseGet(() -> {
                MusicPlaylist playlist = new MusicPlaylist();
                playlist.setName(name);
                playlist.setType(name.equals("Custom Playlist") ? "CUSTOM" : "SYSTEM");
                playlist.setMood(name);
                playlist.setCreatedBy(userKey);
                return playlistRepository.save(playlist);
            });
        }
    }

    private MusicPlaylist resolvePlaylist(String userKey, Long playlistId, String fallback) {
        seedPlaylists(userKey);
        if (playlistId != null) {
            return playlistRepository.findById(playlistId).orElseThrow();
        }
        return playlistRepository.findByNameAndCreatedBy(fallback, userKey).orElseThrow();
    }

    private void addSongToPlaylist(MusicPlaylist playlist, Song song) {
        if (playlistSongRepository.existsByPlaylistIdAndSongId(playlist.getId(), song.getId())) {
            return;
        }
        PlaylistSong link = new PlaylistSong();
        link.setPlaylist(playlist);
        link.setSong(song);
        playlistSongRepository.save(link);
    }

    private PlaylistResponse toPlaylist(MusicPlaylist playlist) {
        List<SongResponse> songs = playlistSongRepository.findByPlaylistIdOrderByAddedAtAsc(playlist.getId()).stream()
                .map(PlaylistSong::getSong)
                .map(this::toSong)
                .toList();
        return new PlaylistResponse(playlist.getId(), playlist.getName(), playlist.getType(), playlist.getMood(),
                playlist.getCreatedBy(), playlist.getCreatedAt(), songs);
    }

    private SongResponse toSong(Song song) {
        return new SongResponse(song.getId(), song.getTitle(), song.getArtist(), song.getSource().name(),
                song.getSourceUrl(), song.getFilePath(), song.getStreamUrl(), song.getDuration(),
                song.getCoverImage(), song.getCreatedAt());
    }

    private static String cleanName(String value) {
        return value.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    private static String stripExtension(String value) {
        int dot = value.lastIndexOf('.');
        return dot > 0 ? value.substring(0, dot) : value;
    }

    private static String nonBlank(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }
}
