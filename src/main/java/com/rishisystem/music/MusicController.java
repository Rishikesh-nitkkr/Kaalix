package com.rishisystem.music;

import com.rishisystem.music.MusicDtos.AddSongRequest;
import com.rishisystem.music.MusicDtos.ConnectSourceRequest;
import com.rishisystem.music.MusicDtos.CreatePlaylistRequest;
import com.rishisystem.music.MusicDtos.ImportLinkRequest;
import com.rishisystem.music.MusicDtos.MusicLibraryResponse;
import com.rishisystem.music.MusicDtos.PlaylistResponse;
import com.rishisystem.music.MusicDtos.SongResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/api/music")
public class MusicController {
    private final MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @GetMapping("/library")
    public MusicLibraryResponse library(@RequestParam @NotBlank String userKey) {
        return musicService.library(userKey);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public SongResponse upload(@RequestParam @NotBlank String userKey,
                               @RequestParam(required = false) String title,
                               @RequestParam(required = false) String artist,
                               @RequestParam(required = false) Long playlistId,
                               @RequestPart("file") MultipartFile file) throws IOException {
        return musicService.upload(userKey, file, title, artist, playlistId);
    }

    @PostMapping("/import-link")
    public SongResponse importLink(@Valid @RequestBody ImportLinkRequest request) {
        return musicService.importLink(request);
    }

    @PostMapping("/connect")
    public Map<String, String> connect(@Valid @RequestBody ConnectSourceRequest request) {
        return Map.of("message", musicService.connect(request));
    }

    @PostMapping("/playlists")
    public PlaylistResponse createPlaylist(@Valid @RequestBody CreatePlaylistRequest request) {
        return musicService.createPlaylist(request);
    }

    @PostMapping("/playlists/songs")
    public PlaylistResponse addSong(@Valid @RequestBody AddSongRequest request) {
        return musicService.addSong(request);
    }

    @DeleteMapping("/playlists/{playlistId}/songs/{songId}")
    public PlaylistResponse removeSong(@PathVariable Long playlistId, @PathVariable Long songId) {
        return musicService.removeSong(playlistId, songId);
    }

    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> file(@PathVariable String fileName) throws MalformedURLException {
        Resource resource = musicService.file(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
