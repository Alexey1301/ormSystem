package com.reputation.controller;

import com.reputation.dto.request.UpdateSentimentRequest;
import com.reputation.dto.response.ReviewResponse;
import com.reputation.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Tag(name = "Работа с отзывами", description = "API для работы с отзывами")
@SecurityRequirement(name = "bearerAuth")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST')")
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        List<ReviewResponse> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST')")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long id) {
        ReviewResponse review = reviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/company/{companyId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST')")
    public ResponseEntity<List<ReviewResponse>> getReviewsByCompanyId(@PathVariable Long companyId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByCompanyId(companyId);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{id}/sentiment")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<ReviewResponse> updateSentiment(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSentimentRequest request) {
        ReviewResponse review = reviewService.updateSentiment(id, request.getSentiment());
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Object> getReviewStatistics() {
        // Упрощенная реализация
        return ResponseEntity.ok(new Object() {
            public final String message = "Statistics endpoint - to be implemented";
        });
    }
}

