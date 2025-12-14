package com.reputation.dto.response;

import com.reputation.model.ReportFormat;
import com.reputation.model.ReportType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {
    private Long id;
    private Long companyId;
    private Long createdById;
    private String createdByName;
    private ReportType type;
    private LocalDateTime periodStart;
    private LocalDateTime periodEnd;
    private ReportFormat format;
    private String filePath;
    private LocalDateTime createdAt;
}

