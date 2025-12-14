package com.reputation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseResponse {
    private Long id;
    private Long taskId;
    private Long reviewId;
    private Long userId;
    private String userName;
    private String text;
    private LocalDateTime recordedAt;
    private LocalDateTime publishedAt;
    private Boolean isPublished;
    private LocalDateTime createdAt;
}

