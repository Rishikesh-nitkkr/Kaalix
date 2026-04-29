package com.rishisystem.web;

import com.rishisystem.model.ReelAnalysisRequest;
import com.rishisystem.model.ReelAnalysisResponse;
import com.rishisystem.service.DailyReportService;
import com.rishisystem.service.ReelAnalysisService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SystemController {

    private final ReelAnalysisService reelAnalysisService;
    private final DailyReportService dailyReportService;

    public SystemController(ReelAnalysisService reelAnalysisService, DailyReportService dailyReportService) {
        this.reelAnalysisService = reelAnalysisService;
        this.dailyReportService = dailyReportService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "KAALIX");
        response.put("timestamp", Instant.now().toString());
        return response;
    }

    @PostMapping("/analyze/reel")
    public ReelAnalysisResponse analyzeReel(@Valid @RequestBody ReelAnalysisRequest request) {
        return reelAnalysisService.analyze(request);
    }

    @PostMapping("/report/daily")
    public Map<String, Object> generateDailyReport(@RequestBody Map<String, Object> state) {
        return dailyReportService.generate(state);
    }
}
