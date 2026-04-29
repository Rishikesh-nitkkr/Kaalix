package com.rishisystem.music;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MusicPlaylistRepository extends JpaRepository<MusicPlaylist, Long> {
    List<MusicPlaylist> findByCreatedByOrCreatedByIsNullOrderByCreatedAtAsc(String createdBy);
    Optional<MusicPlaylist> findByNameAndCreatedBy(String name, String createdBy);
}
