package com.reputation.dto.response;

import com.reputation.model.SentimentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {
    private Long id;
    private Long sourceId;
    private String externalId;
    private String author;
    private BigDecimal rating;
    private String text;
    private LocalDateTime publishedAt;
    private LocalDateTime collectedAt;
    private SentimentType sentiment;
    private LocalDateTime createdAt;
}

