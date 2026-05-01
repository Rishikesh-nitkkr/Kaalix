package com.rishisystem.wardrobe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutfitComboRepository extends JpaRepository<OutfitCombo, Long> {
    List<OutfitCombo> findByUserIdOrderByCreatedAtDesc(String userId);
    void deleteByUserIdAndSavedFalse(String userId);
}
