package com.reputation.service;

import com.reputation.dto.request.CreateSourceRequest;
import com.reputation.dto.response.SourceResponse;
import com.reputation.model.Company;
import com.reputation.model.Source;
import com.reputation.repository.CompanyRepository;
import com.reputation.repository.SourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SourceService {

    private final SourceRepository sourceRepository;
    private final CompanyRepository companyRepository;

    @Transactional
    public SourceResponse createSource(CreateSourceRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Source source = Source.builder()
                .company(company)
                .platform(request.getPlatform())
                .name(request.getName())
                .url(request.getUrl())
                .apiKey(request.getApiKey())
                .isActive(true)
                .build();
        
        source = sourceRepository.save(source);
        return mapToResponse(source);
    }

    public List<SourceResponse> getAllSources() {
        return sourceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public SourceResponse getSourceById(Long id) {
        Source source = sourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Source not found"));
        return mapToResponse(source);
    }

    public List<SourceResponse> getSourcesByCompanyId(Long companyId) {
        return sourceRepository.findByCompanyId(companyId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void triggerCollection(Long id) {
        Source source = sourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Source not found"));
        // Упрощенная логика - просто обновляем время последнего сбора
        source.setLastCollection(java.time.LocalDateTime.now());
        sourceRepository.save(source);
    }

    private SourceResponse mapToResponse(Source source) {
        return SourceResponse.builder()
                .id(source.getId())
                .companyId(source.getCompany().getId())
                .platform(source.getPlatform())
                .name(source.getName())
                .url(source.getUrl())
                .isActive(source.getIsActive())
                .lastCollection(source.getLastCollection())
                .createdAt(source.getCreatedAt())
                .build();
    }
}

