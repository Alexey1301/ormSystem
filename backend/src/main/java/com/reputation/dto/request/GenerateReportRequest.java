package com.reputation.dto.request;

import com.reputation.model.ReportFormat;
import com.reputation.model.ReportType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GenerateReportRequest {
    @NotNull(message = "ID компании обязателен")
    private Long companyId;

    @NotNull(message = "Тип отчета обязателен")
    private ReportType type;

    @NotNull(message = "Начало периода обязательно")
    private LocalDateTime periodStart;

    @NotNull(message = "Конец периода обязателен")
    private LocalDateTime periodEnd;

    @NotNull(message = "Формат отчета обязателен")
    private ReportFormat format;
}

