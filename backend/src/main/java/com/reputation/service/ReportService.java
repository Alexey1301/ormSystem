package com.reputation.service;

import com.reputation.dto.request.GenerateReportRequest;
import com.reputation.dto.response.ReportResponse;
import com.reputation.model.Company;
import com.reputation.model.Report;
import com.reputation.model.User;
import com.reputation.repository.CompanyRepository;
import com.reputation.repository.ReportRepository;
import com.reputation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ReportRepository reportRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReportResponse generateReport(GenerateReportRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Упрощенная логика - просто создаем запись об отчете
        // В реальной системе здесь была бы генерация файла
        Report report = Report.builder()
                .company(company)
                .createdBy(user)
                .type(request.getType())
                .periodStart(request.getPeriodStart())
                .periodEnd(request.getPeriodEnd())
                .format(request.getFormat())
                .filePath("reports/" + company.getId() + "/report_" + System.currentTimeMillis() + "." + request.getFormat().name().toLowerCase())
                .parameters("{}")
                .build();
        
        report = reportRepository.save(report);
        return mapToResponse(report);
    }

    public List<ReportResponse> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReportResponse getReportById(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        return mapToResponse(report);
    }

    @Transactional
    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("Report not found");
        }
        reportRepository.deleteById(id);
    }

    private ReportResponse mapToResponse(Report report) {
        return ReportResponse.builder()
                .id(report.getId())
                .companyId(report.getCompany().getId())
                .createdById(report.getCreatedBy().getId())
                .createdByName(report.getCreatedBy().getFullName())
                .type(report.getType())
                .periodStart(report.getPeriodStart())
                .periodEnd(report.getPeriodEnd())
                .format(report.getFormat())
                .filePath(report.getFilePath())
                .createdAt(report.getCreatedAt())
                .build();
    }
}

