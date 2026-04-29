package com.rishisystem.model;

import jakarta.validation.constraints.Size;

public record ReelAnalysisRequest(
        @Size(max = 500) String link,
        @Size(max = 200) String title,
        @Size(max = 5000) String caption,
        @Size(max = 10000) String transcript,
        @Size(max = 5000) String notes,
        @Size(max = 200) String screenshotName
) {
}
