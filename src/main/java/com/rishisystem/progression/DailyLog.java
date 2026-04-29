package com.rishisystem.progression;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "daily_logs", indexes = @Index(name = "idx_daily_logs_user_date", columnList = "user_id,date"))
public class DailyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserProgress user;

    private LocalDate date;
    private double studyHours;
    private int dsaCount;
    private boolean workout;
    private boolean wakeOnTime;
    private boolean noDistractions;
    private boolean skipStudy;
    private boolean lateWake;
    private boolean overthinkingAnger;
    private double wastedTime;
    private int tasksCompleted;
    private int totalTasks;
    private int score;
    private int txpEarned;

    public Long getId() {
        return id;
    }

    public UserProgress getUser() {
        return user;
    }

    public void setUser(UserProgress user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getStudyHours() {
        return studyHours;
    }

    public void setStudyHours(double studyHours) {
        this.studyHours = studyHours;
    }

    public int getDsaCount() {
        return dsaCount;
    }

    public void setDsaCount(int dsaCount) {
        this.dsaCount = dsaCount;
    }

    public boolean isWorkout() {
        return workout;
    }

    public void setWorkout(boolean workout) {
        this.workout = workout;
    }

    public boolean isWakeOnTime() {
        return wakeOnTime;
    }

    public void setWakeOnTime(boolean wakeOnTime) {
        this.wakeOnTime = wakeOnTime;
    }

    public boolean isNoDistractions() {
        return noDistractions;
    }

    public void setNoDistractions(boolean noDistractions) {
        this.noDistractions = noDistractions;
    }

    public boolean isSkipStudy() {
        return skipStudy;
    }

    public void setSkipStudy(boolean skipStudy) {
        this.skipStudy = skipStudy;
    }

    public boolean isLateWake() {
        return lateWake;
    }

    public void setLateWake(boolean lateWake) {
        this.lateWake = lateWake;
    }

    public boolean isOverthinkingAnger() {
        return overthinkingAnger;
    }

    public void setOverthinkingAnger(boolean overthinkingAnger) {
        this.overthinkingAnger = overthinkingAnger;
    }

    public double getWastedTime() {
        return wastedTime;
    }

    public void setWastedTime(double wastedTime) {
        this.wastedTime = wastedTime;
    }

    public int getTasksCompleted() {
        return tasksCompleted;
    }

    public void setTasksCompleted(int tasksCompleted) {
        this.tasksCompleted = tasksCompleted;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTxpEarned() {
        return txpEarned;
    }

    public void setTxpEarned(int txpEarned) {
        this.txpEarned = txpEarned;
    }
}
