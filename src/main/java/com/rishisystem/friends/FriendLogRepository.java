package com.rishisystem.friends;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendLogRepository extends JpaRepository<FriendLog, Long> {
    List<FriendLog> findByUserIdOrderByCreatedAtDesc(String userId);
}
