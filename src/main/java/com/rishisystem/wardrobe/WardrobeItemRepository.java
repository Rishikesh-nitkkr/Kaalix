package com.rishisystem.wardrobe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardrobeItemRepository extends JpaRepository<WardrobeItem, Long> {
    List<WardrobeItem> findByUserIdOrderByCreatedAtDesc(String userId);
}
