package com.rishisystem.reels;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "reels")
public class ReelInsight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private String platform;
    @Column(length = 1200)
    private String url;
    private String title;
    @Column(length = 5000)
    private String caption;
    @Column(length = 2000)
    private String keywords;
    private String category;
    @Column(length = 4000)
    private String summary;
    @Column(length = 4000)
    private String lesson;
    @Column(length = 4000)
    private String actionItem;
    private String priority;
    private boolean shouldUpdateTimetable;
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }
    public String getKeywords() { return keywords; }
    public void setKeywords(String keywords) { this.keywords = keywords; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getLesson() { return lesson; }
    public void setLesson(String lesson) { this.lesson = lesson; }
    public String getActionItem() { return actionItem; }
    public void setActionItem(String actionItem) { this.actionItem = actionItem; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public boolean isShouldUpdateTimetable() { return shouldUpdateTimetable; }
    public void setShouldUpdateTimetable(boolean shouldUpdateTimetable) { this.shouldUpdateTimetable = shouldUpdateTimetable; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
