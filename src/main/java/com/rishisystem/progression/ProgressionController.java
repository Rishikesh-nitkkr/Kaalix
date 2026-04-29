package com.rishisystem.progression;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class ProgressionController {

    private final ProgressionService progressionService;

    public ProgressionController(ProgressionService progressionService) {
        this.progressionService = progressionService;
    }

    @PostMapping({"/daily-log", "/api/daily-log"})
    public UserStatusResponse submitDailyLog(@Valid @RequestBody DailyLogRequest request) {
        return progressionService.submitDailyLog(request);
    }

    @GetMapping({"/user-status", "/api/user-status"})
    public UserStatusResponse userStatus(@RequestParam @NotBlank String userKey) {
        return progressionService.getUserStatus(userKey);
    }

    @PostMapping({"/user-reset", "/api/user-reset"})
    public UserStatusResponse resetUser(@Valid @RequestBody ResetUserRequest request) {
        return progressionService.resetUser(request);
    }
}
