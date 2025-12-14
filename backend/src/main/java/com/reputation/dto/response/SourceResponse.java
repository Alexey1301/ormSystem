package com.reputation.dto.response;

import com.reputation.model.PlatformType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SourceResponse {
    private Long id;
    private Long companyId;
    private PlatformType platform;
    private String name;
    private String url;
    private Boolean isActive;
    private LocalDateTime lastCollection;
    private LocalDateTime createdAt;
}

