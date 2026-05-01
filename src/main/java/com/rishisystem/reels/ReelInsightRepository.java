package com.rishisystem.reels;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReelInsightRepository extends JpaRepository<ReelInsight, Long> {
    List<ReelInsight> findByUserIdOrderByCreatedAtDesc(String userId);
}
