package com.rishisystem.progression;

public enum Rank {
    E("#94a3b8"),
    D("#38bdf8"),
    C("#22c55e"),
    B("#a78bfa"),
    A("#f59e0b"),
    S("#f472b6"),
    SS("#c084fc"),
    SSS("#fef08a"),
    ELITE_RANKER("#ffffff");

    private final String color;

    Rank(String color) {
        this.color = color;
    }

    public String color() {
        return color;
    }
}
