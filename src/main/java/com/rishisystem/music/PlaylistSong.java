package com.rishisystem.music;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "playlist_songs")
public class PlaylistSong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "playlist_id")
    private MusicPlaylist playlist;

    @ManyToOne(optional = false)
    @JoinColumn(name = "song_id")
    private Song song;

    private Instant addedAt = Instant.now();

    public Long getId() { return id; }
    public MusicPlaylist getPlaylist() { return playlist; }
    public void setPlaylist(MusicPlaylist playlist) { this.playlist = playlist; }
    public Song getSong() { return song; }
    public void setSong(Song song) { this.song = song; }
    public Instant getAddedAt() { return addedAt; }
    public void setAddedAt(Instant addedAt) { this.addedAt = addedAt; }
}
