package com.rishisystem.music;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public final class MusicDtos {
    private MusicDtos() {
    }

    public record SongResponse(Long id, String title, String artist, String source, String sourceUrl, String filePath,
                               String streamUrl, String duration, String coverImage, Instant createdAt) {
    }

    public record PlaylistResponse(Long id, String name, String type, String mood, String createdBy, Instant createdAt,
                                   List<SongResponse> songs) {
    }

    public record MusicLibraryResponse(List<PlaylistResponse> playlists, List<SongResponse> recentSongs,
                                       List<String> connectedSources) {
    }

    public record CreatePlaylistRequest(@NotBlank String userKey, @NotBlank String name, String mood) {
    }

    public record ImportLinkRequest(@NotBlank String userKey, @NotNull MusicSource source, @NotBlank String sourceUrl,
                                    String title, String artist, Long playlistId) {
    }

    public record ConnectSourceRequest(@NotBlank String userKey, @NotNull MusicSource source) {
    }

    public record AddSongRequest(@NotNull Long playlistId, @NotNull Long songId) {
    }
}
