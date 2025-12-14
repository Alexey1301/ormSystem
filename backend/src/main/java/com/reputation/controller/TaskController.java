package com.reputation.controller;

import com.reputation.dto.request.CreateTaskRequest;
import com.reputation.dto.response.TaskResponse;
import com.reputation.security.UserPrincipal;
import com.reputation.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Tag(name = "Управление задачами", description = "API для управления задачами по работе с отзывами")
@SecurityRequirement(name = "bearerAuth")
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "Создать задачу", description = "Создание новой задачи для работы с отзывом")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody CreateTaskRequest request) {
        TaskResponse response = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        List<TaskResponse> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR', 'SPECIALIST')")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @Operation(summary = "Получить мои задачи", description = "Получение списка задач, назначенных текущему специалисту")
    @GetMapping("/my-tasks")
    @PreAuthorize("hasRole('SPECIALIST')")
    public ResponseEntity<List<TaskResponse>> getMyTasks(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<TaskResponse> tasks = taskService.getMyTasks(currentUser.getId());
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<TaskResponse> assignTask(
            @PathVariable Long id,
            @RequestParam Long userId) {
        TaskResponse task = taskService.assignTask(id, userId);
        return ResponseEntity.ok(task);
    }

    @Operation(summary = "Начать работу над задачей", description = "Начало работы специалиста над задачей")
    @PutMapping("/{id}/start")
    @PreAuthorize("hasRole('SPECIALIST')")
    public ResponseEntity<TaskResponse> startTask(@PathVariable Long id) {
        TaskResponse task = taskService.startTask(id);
        return ResponseEntity.ok(task);
    }

    @Operation(summary = "Завершить задачу", description = "Завершение работы над задачей и отправка на проверку")
    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('SPECIALIST')")
    public ResponseEntity<TaskResponse> completeTask(@PathVariable Long id) {
        TaskResponse task = taskService.completeTask(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<TaskResponse> cancelTask(@PathVariable Long id) {
        TaskResponse task = taskService.cancelTask(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}/return")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MODERATOR')")
    public ResponseEntity<TaskResponse> returnTaskForRevision(@PathVariable Long id) {
        // Упрощенная реализация - используем существующий метод
        TaskResponse task = taskService.getTaskById(id);
        // В реальной системе здесь была бы логика возврата на доработку
        return ResponseEntity.ok(task);
    }
}

