package com.reputation.service;

import com.reputation.dto.response.ReviewResponse;
import com.reputation.model.Review;
import com.reputation.model.SentimentType;
import com.reputation.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReviewResponse getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return mapToResponse(review);
    }

    public List<ReviewResponse> getReviewsByCompanyId(Long companyId) {
        return reviewRepository.findBySourceCompanyId(companyId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewResponse updateSentiment(Long id, SentimentType sentiment) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.setSentiment(sentiment);
        review = reviewRepository.save(review);
        return mapToResponse(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(id);
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .sourceId(review.getSource().getId())
                .externalId(review.getExternalId())
                .author(review.getAuthor())
                .rating(review.getRating())
                .text(review.getText())
                .publishedAt(review.getPublishedAt())
                .collectedAt(review.getCollectedAt())
                .sentiment(review.getSentiment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}

