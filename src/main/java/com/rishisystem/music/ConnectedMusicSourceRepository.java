package com.rishisystem.music;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConnectedMusicSourceRepository extends JpaRepository<ConnectedMusicSource, Long> {
    List<ConnectedMusicSource> findByUserKey(String userKey);
    Optional<ConnectedMusicSource> findByUserKeyAndSource(String userKey, MusicSource source);
}
