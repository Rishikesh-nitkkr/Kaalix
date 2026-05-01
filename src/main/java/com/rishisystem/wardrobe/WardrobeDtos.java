package com.rishisystem.wardrobe;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public final class WardrobeDtos {
    private WardrobeDtos() {
    }

    public record WardrobeItemResponse(Long id, String userId, String name, String category, String subCategory,
                                       String color, String occasion, String season, String imageUrl,
                                       String originalImageUrl, String tags, String notes, int rating,
                                       boolean favorite, Instant createdAt, Instant updatedAt) {
    }

    public record UpdateWardrobeItemRequest(String name, String category, String subCategory, String color,
                                            String occasion, String season, String tags, String notes,
                                            Integer rating, Boolean favorite) {
    }

    public record OutfitComboResponse(Long id, String name, List<WardrobeItemResponse> items, String occasion,
                                      int matchScore, String aiReason, boolean saved, Instant createdAt) {
    }

    public record WardrobeUploadResponse(List<WardrobeItemResponse> items, String message) {
    }

    public record CountsResponse(Map<String, Long> counts) {
    }
}
