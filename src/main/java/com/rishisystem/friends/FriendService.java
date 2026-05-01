package com.rishisystem.friends;

import com.rishisystem.friends.FriendDtos.FriendRequest;
import com.rishisystem.friends.FriendDtos.FriendResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class FriendService {
    private final FriendLogRepository repository;
    private final Path photoRoot;

    public FriendService(FriendLogRepository repository,
                         @Value("${kaalix.friends.storage:data/uploads/friends}") String storagePath) {
        this.repository = repository;
        this.photoRoot = Path.of(storagePath).toAbsolutePath().normalize();
    }

    public List<FriendResponse> all(String userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public FriendResponse create(FriendRequest request) {
        FriendLog log = new FriendLog();
        apply(log, request);
        log.setCreatedAt(Instant.now());
        log.setUpdatedAt(Instant.now());
        return toResponse(repository.save(log));
    }

    @Transactional
    public FriendResponse update(Long id, FriendRequest request) {
        FriendLog log = repository.findById(id).orElseThrow();
        apply(log, request);
        log.setUpdatedAt(Instant.now());
        return toResponse(repository.save(log));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public String uploadPhoto(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("Photo is required.");
        String type = file.getContentType() == null ? "" : file.getContentType().toLowerCase(Locale.ROOT);
        if (!List.of("image/jpeg", "image/png", "image/webp").contains(type)) {
            throw new IllegalArgumentException("Use JPG, PNG, or WebP for friend photos.");
        }
        if (file.getSize() > 5 * 1024 * 1024) throw new IllegalArgumentException("Photo must be 5MB or smaller.");
        Files.createDirectories(photoRoot);
        String original = clean(file.getOriginalFilename() == null ? "friend.png" : file.getOriginalFilename());
        String ext = original.contains(".") ? original.substring(original.lastIndexOf('.')) : ".png";
        String name = UUID.randomUUID() + ext.toLowerCase(Locale.ROOT);
        Path target = photoRoot.resolve(name).normalize();
        if (!target.startsWith(photoRoot)) throw new IllegalArgumentException("Invalid photo path.");
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return "/api/friends/files/" + name;
    }

    public Resource file(String fileName) throws MalformedURLException {
        Path target = photoRoot.resolve(clean(fileName)).normalize();
        if (!target.startsWith(photoRoot) || !Files.exists(target)) throw new IllegalArgumentException("Photo not found.");
        return new UrlResource(target.toUri());
    }

    private void apply(FriendLog log, FriendRequest request) {
        log.setUserId(request.userId());
        log.setPhotoUrl(request.photoUrl());
        log.setName(request.name().trim());
        log.setContactNumber(request.contactNumber());
        log.setCountryCode(request.countryCode() == null || request.countryCode().isBlank() ? "+91" : request.countryCode());
        log.setPlace(request.place());
        log.setImpact(request.impact() == null || request.impact().isBlank() ? "Neutral" : request.impact());
        log.setLessonLearned(request.lessonLearned());
        log.setEnhancedLesson(request.enhancedLesson());
        log.setTags(request.tags());
    }

    private FriendResponse toResponse(FriendLog log) {
        return new FriendResponse(log.getId(), log.getUserId(), log.getPhotoUrl(), log.getName(), log.getContactNumber(),
                log.getCountryCode(), log.getPlace(), log.getImpact(), log.getLessonLearned(), log.getEnhancedLesson(),
                log.getTags(), log.getCreatedAt(), log.getUpdatedAt());
    }

    private static String clean(String value) {
        return value.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
