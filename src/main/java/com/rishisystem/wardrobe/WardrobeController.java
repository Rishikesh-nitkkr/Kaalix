package com.rishisystem.wardrobe;

import com.rishisystem.wardrobe.WardrobeDtos.CountsResponse;
import com.rishisystem.wardrobe.WardrobeDtos.OutfitComboResponse;
import com.rishisystem.wardrobe.WardrobeDtos.UpdateWardrobeItemRequest;
import com.rishisystem.wardrobe.WardrobeDtos.WardrobeItemResponse;
import com.rishisystem.wardrobe.WardrobeDtos.WardrobeUploadResponse;
import jakarta.validation.constraints.NotBlank;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/wardrobe")
public class WardrobeController {
    private final WardrobeService wardrobeService;

    public WardrobeController(WardrobeService wardrobeService) {
        this.wardrobeService = wardrobeService;
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public WardrobeUploadResponse upload(@RequestParam @NotBlank String userKey,
                                         @RequestParam(required = false) String name,
                                         @RequestParam(required = false) String category,
                                         @RequestParam(required = false) String subCategory,
                                         @RequestParam(required = false) String color,
                                         @RequestParam(required = false) String occasion,
                                         @RequestParam(required = false) String season,
                                         @RequestParam(required = false) String tags,
                                         @RequestParam(required = false) String notes,
                                         @RequestParam(required = false) Integer rating,
                                         @RequestParam(required = false) Boolean favorite,
                                         @RequestPart("files") List<MultipartFile> files) throws IOException {
        return wardrobeService.upload(userKey, files, new UpdateWardrobeItemRequest(name, category, subCategory,
                color, occasion, season, tags, notes, rating, favorite));
    }

    @GetMapping("/items")
    public List<WardrobeItemResponse> items(@RequestParam @NotBlank String userKey,
                                            @RequestParam(required = false) String category,
                                            @RequestParam(required = false) String color,
                                            @RequestParam(required = false) String occasion,
                                            @RequestParam(required = false) String season,
                                            @RequestParam(required = false) Boolean favorite,
                                            @RequestParam(required = false) Integer rating) {
        return wardrobeService.items(userKey, category, color, occasion, season, favorite, rating);
    }

    @GetMapping("/items/{id}")
    public WardrobeItemResponse item(@PathVariable Long id) {
        return wardrobeService.item(id);
    }

    @PutMapping("/items/{id}")
    public WardrobeItemResponse update(@PathVariable Long id, @RequestBody UpdateWardrobeItemRequest request) {
        return wardrobeService.update(id, request);
    }

    @DeleteMapping("/items/{id}")
    public void delete(@PathVariable Long id) {
        wardrobeService.delete(id);
    }

    @GetMapping("/categories/counts")
    public CountsResponse counts(@RequestParam @NotBlank String userKey) {
        return wardrobeService.counts(userKey);
    }

    @PostMapping("/generate-combos")
    public List<OutfitComboResponse> generateCombos(@RequestParam @NotBlank String userKey) {
        return wardrobeService.generateCombos(userKey);
    }

    @GetMapping("/outfits")
    public List<OutfitComboResponse> outfits(@RequestParam @NotBlank String userKey) {
        return wardrobeService.outfits(userKey);
    }

    @PostMapping("/outfits/{id}/save")
    public OutfitComboResponse saveOutfit(@PathVariable Long id) {
        return wardrobeService.saveOutfit(id);
    }

    @DeleteMapping("/outfits/{id}")
    public void deleteOutfit(@PathVariable Long id) {
        wardrobeService.deleteOutfit(id);
    }

    @GetMapping("/files/{folder}/{fileName}")
    public ResponseEntity<Resource> file(@PathVariable String folder, @PathVariable String fileName) throws MalformedURLException {
        Resource resource = wardrobeService.file(folder, fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
