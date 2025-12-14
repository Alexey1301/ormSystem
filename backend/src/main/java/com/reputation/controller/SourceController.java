package com.reputation.controller;

import com.reputation.dto.request.CreateSourceRequest;
import com.reputation.dto.response.SourceResponse;
import com.reputation.service.SourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sources")
@RequiredArgsConstructor
@Tag(name = "Управление источниками", description = "API для управления источниками отзывов")
@SecurityRequirement(name = "bearerAuth")
public class SourceController {

    private final SourceService sourceService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<SourceResponse> createSource(@Valid @RequestBody CreateSourceRequest request) {
        SourceResponse response = sourceService.createSource(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<List<SourceResponse>> getAllSources() {
        List<SourceResponse> sources = sourceService.getAllSources();
        return ResponseEntity.ok(sources);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<SourceResponse> getSourceById(@PathVariable Long id) {
        SourceResponse source = sourceService.getSourceById(id);
        return ResponseEntity.ok(source);
    }

    @GetMapping("/company/{companyId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<List<SourceResponse>> getSourcesByCompanyId(@PathVariable Long companyId) {
        List<SourceResponse> sources = sourceService.getSourcesByCompanyId(companyId);
        return ResponseEntity.ok(sources);
    }

    @PostMapping("/{id}/collect")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<Void> triggerCollection(@PathVariable Long id) {
        sourceService.triggerCollection(id);
        return ResponseEntity.ok().build();
    }
}

