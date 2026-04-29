package com.rishisystem.music;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_music_preferences")
public class UserMusicPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userKey;

    private boolean musicEnabled;
    private double volume = 0.35;
    private boolean repeatEnabled;
    private boolean shuffleEnabled;

    public Long getId() { return id; }
    public String getUserKey() { return userKey; }
    public void setUserKey(String userKey) { this.userKey = userKey; }
    public boolean isMusicEnabled() { return musicEnabled; }
    public void setMusicEnabled(boolean musicEnabled) { this.musicEnabled = musicEnabled; }
    public double getVolume() { return volume; }
    public void setVolume(double volume) { this.volume = volume; }
    public boolean isRepeatEnabled() { return repeatEnabled; }
    public void setRepeatEnabled(boolean repeatEnabled) { this.repeatEnabled = repeatEnabled; }
    public boolean isShuffleEnabled() { return shuffleEnabled; }
    public void setShuffleEnabled(boolean shuffleEnabled) { this.shuffleEnabled = shuffleEnabled; }
}
