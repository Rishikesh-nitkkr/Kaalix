package com.rishisystem.music;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMusicPreferenceRepository extends JpaRepository<UserMusicPreference, Long> {
    Optional<UserMusicPreference> findByUserKey(String userKey);
}
