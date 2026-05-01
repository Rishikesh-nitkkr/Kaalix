package com.rishisystem.wardrobe;

import com.rishisystem.wardrobe.WardrobeDtos.CountsResponse;
import com.rishisystem.wardrobe.WardrobeDtos.OutfitComboResponse;
import com.rishisystem.wardrobe.WardrobeDtos.UpdateWardrobeItemRequest;
import com.rishisystem.wardrobe.WardrobeDtos.WardrobeItemResponse;
import com.rishisystem.wardrobe.WardrobeDtos.WardrobeUploadResponse;
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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.function.Predicate;

@Service
public class WardrobeService {
    private static final List<String> CATEGORIES = List.of("Shirts", "T-shirts", "Pants", "Jeans", "Shoes", "Watches", "Accessories", "Jackets", "Hoodies", "Others");
    private final WardrobeItemRepository itemRepository;
    private final OutfitComboRepository comboRepository;
    private final Path originalRoot;
    private final Path processedRoot;

    public WardrobeService(
            WardrobeItemRepository itemRepository,
            OutfitComboRepository comboRepository,
            @Value("${kaalix.wardrobe.storage:data/uploads/wardrobe}") String storagePath
    ) {
        this.itemRepository = itemRepository;
        this.comboRepository = comboRepository;
        Path root = Path.of(storagePath).toAbsolutePath().normalize();
        this.originalRoot = root.resolve("original").normalize();
        this.processedRoot = root.resolve("processed").normalize();
    }

    @Transactional
    public WardrobeUploadResponse upload(String userKey, List<MultipartFile> files, UpdateWardrobeItemRequest details) throws IOException {
        if (files == null || files.isEmpty()) {
            throw new IllegalArgumentException("Upload at least one wardrobe image.");
        }
        Files.createDirectories(originalRoot);
        Files.createDirectories(processedRoot);
        List<WardrobeItemResponse> created = new ArrayList<>();
        for (MultipartFile file : files) {
            validateImage(file);
            StoredImage stored = storeImage(file);
            List<DetectedCloth> detections = detectPlaceholder(file.getOriginalFilename(), details);
            for (DetectedCloth detected : detections) {
                WardrobeItem item = new WardrobeItem();
                item.setUserId(userKey);
                item.setName(nonBlank(details.name(), detected.name()));
                item.setCategory(nonBlank(details.category(), detected.category()));
                item.setSubCategory(nonBlank(details.subCategory(), detected.category()));
                item.setColor(nonBlank(details.color(), detected.color()));
                item.setOccasion(nonBlank(details.occasion(), "Casual"));
                item.setSeason(nonBlank(details.season(), "All Season"));
                item.setTags(nonBlank(details.tags(), detected.category() + ", " + detected.color()));
                item.setNotes(nonBlank(details.notes(), "AI placeholder processed. Ready for YOLO/SAM/rembg upgrade."));
                item.setRating(details.rating() == null ? 4 : clamp(details.rating(), 1, 5));
                item.setFavorite(Boolean.TRUE.equals(details.favorite()));
                item.setOriginalImageUrl(stored.originalUrl());
                item.setImageUrl(stored.processedUrl());
                item.setCreatedAt(Instant.now());
                item.setUpdatedAt(Instant.now());
                created.add(toItem(itemRepository.save(item)));
            }
        }
        return new WardrobeUploadResponse(created, created.size() + " wardrobe item(s) imported.");
    }

    public List<WardrobeItemResponse> items(String userKey, String category, String color, String occasion,
                                            String season, Boolean favorite, Integer rating) {
        Predicate<WardrobeItem> filter = item -> matches(category, item.getCategory())
                && matches(color, item.getColor())
                && matches(occasion, item.getOccasion())
                && matches(season, item.getSeason())
                && (favorite == null || item.isFavorite() == favorite)
                && (rating == null || item.getRating() >= rating);
        return itemRepository.findByUserIdOrderByCreatedAtDesc(userKey).stream()
                .filter(filter)
                .map(this::toItem)
                .toList();
    }

    public WardrobeItemResponse item(Long id) {
        return itemRepository.findById(id).map(this::toItem).orElseThrow();
    }

    @Transactional
    public WardrobeItemResponse update(Long id, UpdateWardrobeItemRequest request) {
        WardrobeItem item = itemRepository.findById(id).orElseThrow();
        if (request.name() != null) item.setName(request.name());
        if (request.category() != null) item.setCategory(request.category());
        if (request.subCategory() != null) item.setSubCategory(request.subCategory());
        if (request.color() != null) item.setColor(request.color());
        if (request.occasion() != null) item.setOccasion(request.occasion());
        if (request.season() != null) item.setSeason(request.season());
        if (request.tags() != null) item.setTags(request.tags());
        if (request.notes() != null) item.setNotes(request.notes());
        if (request.rating() != null) item.setRating(clamp(request.rating(), 1, 5));
        if (request.favorite() != null) item.setFavorite(request.favorite());
        item.setUpdatedAt(Instant.now());
        return toItem(itemRepository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        itemRepository.deleteById(id);
    }

    public CountsResponse counts(String userKey) {
        Map<String, Long> counts = new LinkedHashMap<>();
        CATEGORIES.forEach(category -> counts.put(category, 0L));
        for (WardrobeItem item : itemRepository.findByUserIdOrderByCreatedAtDesc(userKey)) {
            counts.put(item.getCategory(), counts.getOrDefault(item.getCategory(), 0L) + 1);
        }
        return new CountsResponse(counts);
    }

    @Transactional
    public List<OutfitComboResponse> generateCombos(String userKey) {
        List<WardrobeItem> items = itemRepository.findByUserIdOrderByCreatedAtDesc(userKey);
        List<WardrobeItem> tops = items.stream().filter(item -> List.of("Shirts", "T-shirts", "Hoodies").contains(item.getCategory())).toList();
        List<WardrobeItem> bottoms = items.stream().filter(item -> List.of("Pants", "Jeans").contains(item.getCategory())).toList();
        List<WardrobeItem> shoes = items.stream().filter(item -> "Shoes".equals(item.getCategory())).toList();
        List<WardrobeItem> watches = items.stream().filter(item -> "Watches".equals(item.getCategory())).toList();
        List<WardrobeItem> accessories = items.stream().filter(item -> "Accessories".equals(item.getCategory())).toList();
        List<WardrobeItem> jackets = items.stream().filter(item -> "Jackets".equals(item.getCategory())).toList();
        if (tops.isEmpty() || bottoms.isEmpty() || shoes.isEmpty()) {
            return generateAssistedCombos(userKey, items, tops, bottoms, shoes, watches, accessories, jackets);
        }
        comboRepository.deleteByUserIdAndSavedFalse(userKey);
        List<OutfitComboResponse> responses = new ArrayList<>();
        int limit = Math.min(6, Math.max(tops.size(), Math.max(bottoms.size(), shoes.size())));
        for (int index = 0; index < limit; index++) {
            WardrobeItem top = tops.get(index % tops.size());
            WardrobeItem bottom = bottoms.get(index % bottoms.size());
            WardrobeItem shoe = shoes.get(index % shoes.size());
            WardrobeItem watch = watches.isEmpty() ? null : watches.get(index % watches.size());
            WardrobeItem accessory = accessories.isEmpty() ? null : accessories.get(index % accessories.size());
            WardrobeItem jacket = jackets.isEmpty() ? null : jackets.get(index % jackets.size());
            OutfitCombo combo = new OutfitCombo();
            combo.setUserId(userKey);
            combo.setName(comboName(top, bottom));
            combo.setTopId(top.getId());
            combo.setPantId(bottom.getId());
            combo.setShoeId(shoe.getId());
            combo.setWatchId(watch == null ? null : watch.getId());
            combo.setAccessoryId(accessory == null ? null : accessory.getId());
            combo.setJacketId(jacket == null ? null : jacket.getId());
            combo.setOccasion(nonBlank(top.getOccasion(), "Casual"));
            combo.setMatchScore(matchScore(top, bottom, shoe));
            combo.setAiReason(reason(top, bottom, shoe));
            responses.add(toCombo(comboRepository.save(combo), items));
        }
        return responses;
    }

    private List<OutfitComboResponse> generateAssistedCombos(String userKey, List<WardrobeItem> items,
                                                             List<WardrobeItem> tops, List<WardrobeItem> bottoms,
                                                             List<WardrobeItem> shoes, List<WardrobeItem> watches,
                                                             List<WardrobeItem> accessories, List<WardrobeItem> jackets) {
        if (items.isEmpty()) {
            return List.of();
        }
        comboRepository.deleteByUserIdAndSavedFalse(userKey);
        WardrobeItem top = tops.isEmpty() ? items.get(0) : tops.get(0);
        WardrobeItem bottom = bottoms.isEmpty() ? null : bottoms.get(0);
        WardrobeItem shoe = shoes.isEmpty() ? null : shoes.get(0);
        WardrobeItem watch = watches.isEmpty() ? null : watches.get(0);
        WardrobeItem accessory = accessories.isEmpty() ? null : accessories.get(0);
        WardrobeItem jacket = jackets.isEmpty() ? null : jackets.get(0);
        int presentSlots = 1 + (bottom == null ? 0 : 1) + (shoe == null ? 0 : 1)
                + (watch == null ? 0 : 1) + (accessory == null ? 0 : 1) + (jacket == null ? 0 : 1);
        List<String> missing = new ArrayList<>();
        if (tops.isEmpty()) {
            missing.add("top");
        }
        if (bottoms.isEmpty()) {
            missing.add("bottom");
        }
        if (shoes.isEmpty()) {
            missing.add("shoes");
        }
        OutfitCombo combo = new OutfitCombo();
        combo.setUserId(userKey);
        combo.setName("Assisted Combo Draft");
        combo.setTopId(top.getId());
        combo.setPantId(bottom == null ? null : bottom.getId());
        combo.setShoeId(shoe == null ? null : shoe.getId());
        combo.setWatchId(watch == null ? null : watch.getId());
        combo.setAccessoryId(accessory == null ? null : accessory.getId());
        combo.setJacketId(jacket == null ? null : jacket.getId());
        combo.setOccasion(nonBlank(top.getOccasion(), "Casual"));
        combo.setMatchScore(clamp(58 + presentSlots * 6 - missing.size() * 4, 55, 84));
        combo.setAiReason(missing.isEmpty()
                ? "Draft created from your available wardrobe items."
                : "Draft created from available wardrobe items. Add " + String.join(", ", missing) + " to unlock a complete outfit combo.");
        return List.of(toCombo(comboRepository.save(combo), items));
    }

    public List<OutfitComboResponse> outfits(String userKey) {
        List<WardrobeItem> items = itemRepository.findByUserIdOrderByCreatedAtDesc(userKey);
        return comboRepository.findByUserIdOrderByCreatedAtDesc(userKey).stream()
                .map(combo -> toCombo(combo, items))
                .toList();
    }

    @Transactional
    public OutfitComboResponse saveOutfit(Long id) {
        OutfitCombo combo = comboRepository.findById(id).orElseThrow();
        combo.setSaved(true);
        return toCombo(comboRepository.save(combo), itemRepository.findByUserIdOrderByCreatedAtDesc(combo.getUserId()));
    }

    @Transactional
    public void deleteOutfit(Long id) {
        comboRepository.deleteById(id);
    }

    public Resource file(String folder, String fileName) throws MalformedURLException {
        Path root = "original".equals(folder) ? originalRoot : processedRoot;
        Path target = root.resolve(cleanName(fileName)).normalize();
        if (!target.startsWith(root) || !Files.exists(target)) {
            throw new IllegalArgumentException("Wardrobe file not found.");
        }
        return new UrlResource(target.toUri());
    }

    private StoredImage storeImage(MultipartFile file) throws IOException {
        String original = cleanName(file.getOriginalFilename() == null ? "wardrobe-item.png" : file.getOriginalFilename());
        String extension = original.contains(".") ? original.substring(original.lastIndexOf('.')) : ".png";
        String storedName = UUID.randomUUID() + extension.toLowerCase(Locale.ROOT);
        Path originalTarget = originalRoot.resolve(storedName).normalize();
        Path processedTarget = processedRoot.resolve(storedName).normalize();
        if (!originalTarget.startsWith(originalRoot) || !processedTarget.startsWith(processedRoot)) {
            throw new IllegalArgumentException("Invalid wardrobe file path.");
        }
        Files.copy(file.getInputStream(), originalTarget, StandardCopyOption.REPLACE_EXISTING);
        Files.copy(originalTarget, processedTarget, StandardCopyOption.REPLACE_EXISTING);
        return new StoredImage("/api/wardrobe/files/original/" + storedName, "/api/wardrobe/files/processed/" + storedName);
    }

    private List<DetectedCloth> detectPlaceholder(String filename, UpdateWardrobeItemRequest details) {
        String source = (filename == null ? "" : filename).toLowerCase(Locale.ROOT);
        if (details.category() != null && !details.category().isBlank()) {
            return List.of(new DetectedCloth(nonBlank(details.name(), details.category()), details.category(), nonBlank(details.color(), detectColor(source))));
        }
        if (source.contains("outfit") || source.contains("messy") || source.contains("clothes") || source.contains("mix") || "Others".equals(detectCategory(source))) {
            return List.of(
                    new DetectedCloth("Detected Shirt", "Shirts", detectColor(source)),
                    new DetectedCloth("Detected Pant", "Pants", "Black"),
                    new DetectedCloth("Detected Shoes", "Shoes", "White")
            );
        }
        String category = detectCategory(source);
        return List.of(new DetectedCloth(category.replace("s", "") + " Item", category, detectColor(source)));
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required.");
        }
        String type = file.getContentType() == null ? "" : file.getContentType().toLowerCase(Locale.ROOT);
        if (!List.of("image/jpeg", "image/png", "image/webp").contains(type)) {
            throw new IllegalArgumentException("Only JPG, PNG, and WebP wardrobe images are supported.");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Wardrobe images must be 5MB or smaller.");
        }
    }

    private OutfitComboResponse toCombo(OutfitCombo combo, List<WardrobeItem> items) {
        List<Long> ids = List.of(
                combo.getTopId() == null ? -1L : combo.getTopId(),
                combo.getPantId() == null ? -1L : combo.getPantId(),
                combo.getShoeId() == null ? -1L : combo.getShoeId(),
                combo.getWatchId() == null ? -1L : combo.getWatchId(),
                combo.getAccessoryId() == null ? -1L : combo.getAccessoryId(),
                combo.getJacketId() == null ? -1L : combo.getJacketId()
        );
        List<WardrobeItemResponse> comboItems = items.stream()
                .filter(item -> ids.contains(item.getId()))
                .sorted(Comparator.comparingInt(item -> ids.indexOf(item.getId())))
                .map(this::toItem)
                .toList();
        return new OutfitComboResponse(combo.getId(), combo.getName(), comboItems, combo.getOccasion(),
                combo.getMatchScore(), combo.getAiReason(), combo.isSaved(), combo.getCreatedAt());
    }

    private WardrobeItemResponse toItem(WardrobeItem item) {
        return new WardrobeItemResponse(item.getId(), item.getUserId(), item.getName(), item.getCategory(),
                item.getSubCategory(), item.getColor(), item.getOccasion(), item.getSeason(), item.getImageUrl(),
                item.getOriginalImageUrl(), item.getTags(), item.getNotes(), item.getRating(), item.isFavorite(),
                item.getCreatedAt(), item.getUpdatedAt());
    }

    private static String detectCategory(String source) {
        if (source.contains("tshirt") || source.contains("tee")) return "T-shirts";
        if (source.contains("shirt") || source.contains("top")) return "Shirts";
        if (source.contains("jean")) return "Jeans";
        if (source.contains("pant") || source.contains("trouser")) return "Pants";
        if (source.contains("shoe") || source.contains("sneaker")) return "Shoes";
        if (source.contains("watch")) return "Watches";
        if (source.contains("jacket")) return "Jackets";
        if (source.contains("hoodie")) return "Hoodies";
        if (source.contains("belt") || source.contains("cap") || source.contains("bag") || source.contains("glass")) return "Accessories";
        return "Others";
    }

    private static String detectColor(String source) {
        for (String color : List.of("black", "white", "blue", "navy", "grey", "gray", "red", "green", "brown", "beige", "cream")) {
            if (source.contains(color)) {
                return color.equals("gray") ? "Grey" : title(color);
            }
        }
        return "Black";
    }

    private static int matchScore(WardrobeItem top, WardrobeItem bottom, WardrobeItem shoe) {
        int score = 82;
        if (same(top.getColor(), bottom.getColor())) score += 4;
        if ("White".equalsIgnoreCase(shoe.getColor()) || "Black".equalsIgnoreCase(shoe.getColor())) score += 6;
        if (same(top.getOccasion(), bottom.getOccasion())) score += 5;
        return Math.min(98, score);
    }

    private static String reason(WardrobeItem top, WardrobeItem bottom, WardrobeItem shoe) {
        return "Balanced " + nonBlank(top.getOccasion(), "casual") + " fit: " + top.getColor() + " top, "
                + bottom.getColor() + " bottom, and " + shoe.getColor() + " footwear.";
    }

    private static String comboName(WardrobeItem top, WardrobeItem bottom) {
        return nonBlank(top.getColor(), "Shadow") + " " + nonBlank(bottom.getCategory(), "Combo");
    }

    private static boolean matches(String expected, String actual) {
        return expected == null || expected.isBlank() || "All Items".equalsIgnoreCase(expected) || same(expected, actual);
    }

    private static boolean same(String left, String right) {
        return left != null && right != null && left.equalsIgnoreCase(right);
    }

    private static int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }

    private static String nonBlank(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }

    private static String title(String value) {
        return value.substring(0, 1).toUpperCase(Locale.ROOT) + value.substring(1).toLowerCase(Locale.ROOT);
    }

    private static String cleanName(String value) {
        return value.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    private record StoredImage(String originalUrl, String processedUrl) {
    }

    private record DetectedCloth(String name, String category, String color) {
    }
}
