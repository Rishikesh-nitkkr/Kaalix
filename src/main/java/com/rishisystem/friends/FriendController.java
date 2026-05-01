package com.rishisystem.friends;

import com.rishisystem.friends.FriendDtos.FriendRequest;
import com.rishisystem.friends.FriendDtos.FriendResponse;
import com.rishisystem.friends.FriendDtos.PhotoUploadResponse;
import jakarta.validation.Valid;
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
@RequestMapping("/api/friends")
public class FriendController {
    private final FriendService service;

    public FriendController(FriendService service) {
        this.service = service;
    }

    @GetMapping
    public List<FriendResponse> all(@RequestParam @NotBlank String userId) {
        return service.all(userId);
    }

    @PostMapping
    public FriendResponse create(@Valid @RequestBody FriendRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public FriendResponse update(@PathVariable Long id, @Valid @RequestBody FriendRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping(path = "/upload-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoUploadResponse uploadPhoto(@RequestPart("file") MultipartFile file) throws IOException {
        return new PhotoUploadResponse(service.uploadPhoto(file));
    }

    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> file(@PathVariable String fileName) throws MalformedURLException {
        Resource resource = service.file(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
