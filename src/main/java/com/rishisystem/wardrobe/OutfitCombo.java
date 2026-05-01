package com.rishisystem.wardrobe;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "outfit_combos")
public class OutfitCombo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String name;

    private Long topId;
    private Long pantId;
    private Long shoeId;
    private Long watchId;
    private Long accessoryId;
    private Long jacketId;
    private String occasion;
    private int matchScore;

    @Column(length = 2000)
    private String aiReason;

    private boolean saved;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Long getTopId() { return topId; }
    public void setTopId(Long topId) { this.topId = topId; }
    public Long getPantId() { return pantId; }
    public void setPantId(Long pantId) { this.pantId = pantId; }
    public Long getShoeId() { return shoeId; }
    public void setShoeId(Long shoeId) { this.shoeId = shoeId; }
    public Long getWatchId() { return watchId; }
    public void setWatchId(Long watchId) { this.watchId = watchId; }
    public Long getAccessoryId() { return accessoryId; }
    public void setAccessoryId(Long accessoryId) { this.accessoryId = accessoryId; }
    public Long getJacketId() { return jacketId; }
    public void setJacketId(Long jacketId) { this.jacketId = jacketId; }
    public String getOccasion() { return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }
    public int getMatchScore() { return matchScore; }
    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }
    public String getAiReason() { return aiReason; }
    public void setAiReason(String aiReason) { this.aiReason = aiReason; }
    public boolean isSaved() { return saved; }
    public void setSaved(boolean saved) { this.saved = saved; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
