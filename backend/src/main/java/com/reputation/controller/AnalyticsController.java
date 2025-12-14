package com.reputation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@Tag(name = "Аналитика", description = "API для получения аналитических данных")
@SecurityRequirement(name = "bearerAuth")
public class AnalyticsController {

    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getOverview() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Analytics overview endpoint - to be implemented";
        });
    }

    @GetMapping("/sentiment")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getSentimentAnalysis() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Sentiment analysis endpoint - to be implemented";
        });
    }

    @GetMapping("/sources")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getSourcesAnalysis() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Sources analysis endpoint - to be implemented";
        });
    }

    @GetMapping("/trends")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getTrendsAnalysis() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Trends analysis endpoint - to be implemented";
        });
    }

    @GetMapping("/geography")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getGeographyAnalysis() {
        return ResponseEntity.ok(new Object() {
            public final String message = "Geography analysis endpoint - to be implemented";
        });
    }
}

