package com.rishisystem.progression;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String userKey;

    @Column(nullable = false)
    private int level = 1;

    @Column(nullable = false)
    private int txp = 0;

    @Column(nullable = false)
    private int nextLevelXp = 120;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rank rank = Rank.E;

    @Column(nullable = false)
    private int streak = 0;

    private LocalDate lastActiveDate;

    @Column(name = "initial_rank_locked", nullable = false)
    private boolean rankSeedLocked = false;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserKey() {
        return userKey;
    }

    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getTxp() {
        return txp;
    }

    public void setTxp(int txp) {
        this.txp = txp;
    }

    public int getNextLevelXp() {
        return nextLevelXp;
    }

    public void setNextLevelXp(int nextLevelXp) {
        this.nextLevelXp = nextLevelXp;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public LocalDate getLastActiveDate() {
        return lastActiveDate;
    }

    public void setLastActiveDate(LocalDate lastActiveDate) {
        this.lastActiveDate = lastActiveDate;
    }

    public boolean isRankSeedLocked() {
        return rankSeedLocked;
    }

    public void setRankSeedLocked(boolean rankSeedLocked) {
        this.rankSeedLocked = rankSeedLocked;
    }

}
