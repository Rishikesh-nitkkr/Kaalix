package com.rishisystem.reels;

import com.rishisystem.model.ReelAnalysisRequest;
import com.rishisystem.model.ReelAnalysisResponse;
import com.rishisystem.reels.ReelDtos.ReelAnalyzeRequest;
import com.rishisystem.reels.ReelDtos.ReelResponse;
import com.rishisystem.service.ReelAnalysisService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/reels")
public class ReelController {
    private final ReelInsightRepository repository;
    private final ReelAnalysisService analysisService;

    public ReelController(ReelInsightRepository repository, ReelAnalysisService analysisService) {
        this.repository = repository;
        this.analysisService = analysisService;
    }

    @PostMapping("/analyze")
    @Transactional
    public ReelResponse analyze(@Valid @RequestBody ReelAnalyzeRequest request) {
        ReelAnalysisResponse analysis = analysisService.analyze(new ReelAnalysisRequest(
                request.url(), request.title(), request.caption(), "", request.notes(), ""
        ));
        ReelInsight insight = new ReelInsight();
        insight.setUserId(request.userId());
        insight.setPlatform(request.platform());
        insight.setUrl(request.url());
        insight.setTitle(analysis.titleOrCaption());
        insight.setCaption(request.caption());
        insight.setKeywords(String.join(",", analysis.keywords()));
        insight.setCategory(analysis.category());
        insight.setSummary(analysis.summary());
        insight.setLesson(analysis.lessonLearned());
        insight.setActionItem(analysis.actionItem());
        insight.setPriority(analysis.priorityLevel());
        insight.setShouldUpdateTimetable(analysis.affectTimetable());
        insight.setCreatedAt(Instant.now());
        return toResponse(repository.save(insight));
    }

    @GetMapping
    public List<ReelResponse> all(@RequestParam @NotBlank String userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(this::toResponse).toList();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    private ReelResponse toResponse(ReelInsight insight) {
        List<String> keywords = Arrays.stream(String.valueOf(insight.getKeywords()).split(","))
                .map(String::trim)
                .filter(value -> !value.isBlank() && !"null".equals(value))
                .toList();
        return new ReelResponse(insight.getId(), insight.getUserId(), insight.getPlatform(), insight.getUrl(),
                insight.getTitle(), insight.getCaption(), keywords, insight.getCategory(), insight.getSummary(),
                insight.getLesson(), insight.getActionItem(), insight.getPriority(), insight.isShouldUpdateTimetable(),
                insight.getCreatedAt());
    }
}
