package com.rishisystem.friends;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public final class FriendDtos {
    private FriendDtos() {}

    public record FriendRequest(@NotBlank String userId, String photoUrl, @NotBlank String name,
                                String contactNumber, String countryCode, String place, String impact,
                                String lessonLearned, String enhancedLesson, String tags) {}

    public record FriendResponse(Long id, String userId, String photoUrl, String name, String contactNumber,
                                 String countryCode, String place, String impact, String lessonLearned,
                                 String enhancedLesson, String tags, Instant createdAt, Instant updatedAt) {}

    public record PhotoUploadResponse(String photoUrl) {}
}
