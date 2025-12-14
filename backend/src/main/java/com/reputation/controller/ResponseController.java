package com.reputation.controller;

import com.reputation.dto.request.CreateResponseRequest;
import com.reputation.dto.response.ResponseResponse;
import com.reputation.service.ResponseService;
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
@RequestMapping("/responses")
@RequiredArgsConstructor
@Tag(name = "Работа с ответами", description = "API для работы с ответами на отзывы")
@SecurityRequirement(name = "bearerAuth")
public class ResponseController {

    private final ResponseService responseService;

    @PostMapping
    @PreAuthorize("hasRole('SPECIALIST')")
    public ResponseEntity<ResponseResponse> createResponse(@Valid @RequestBody CreateResponseRequest request) {
        ResponseResponse response = responseService.createResponse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<List<ResponseResponse>> getAllResponses() {
        List<ResponseResponse> responses = responseService.getAllResponses();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST')")
    public ResponseEntity<ResponseResponse> getResponseById(@PathVariable Long id) {
        ResponseResponse response = responseService.getResponseById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<ResponseResponse> approveResponse(@PathVariable Long id) {
        ResponseResponse response = responseService.approveResponse(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<ResponseResponse> publishResponse(@PathVariable Long id) {
        // Упрощенная реализация - используем approve
        ResponseResponse response = responseService.approveResponse(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long id) {
        responseService.deleteResponse(id);
        return ResponseEntity.noContent().build();
    }
}

