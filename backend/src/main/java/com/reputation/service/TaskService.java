package com.reputation.service;

import com.reputation.dto.request.CreateTaskRequest;
import com.reputation.dto.response.TaskResponse;
import com.reputation.model.Review;
import com.reputation.model.Task;
import com.reputation.model.TaskStatus;
import com.reputation.model.User;
import com.reputation.repository.ReviewRepository;
import com.reputation.repository.TaskRepository;
import com.reputation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final TaskRepository taskRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskResponse createTask(CreateTaskRequest request) {
        Review review = reviewRepository.findById(request.getReviewId())
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        Task task = Task.builder()
                .review(review)
                .status(TaskStatus.NEW)
                .priority(request.getPriority() != null ? request.getPriority() : com.reputation.model.TaskPriority.MEDIUM)
                .deadline(request.getDeadline())
                .build();
        
        if (request.getAssignedToId() != null) {
            User user = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(user);
            task.setStatus(TaskStatus.ASSIGNED);
        }
        
        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToResponse(task);
    }

    public List<TaskResponse> getMyTasks(Long userId) {
        return taskRepository.findByAssignedToId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskResponse assignTask(Long id, Long userId) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setAssignedTo(user);
        task.setStatus(TaskStatus.ASSIGNED);
        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    @Transactional
    public TaskResponse startTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.IN_PROGRESS);
        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    @Transactional
    public TaskResponse completeTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.PENDING_REVIEW);
        task.setCompletedAt(java.time.LocalDateTime.now());
        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    @Transactional
    public TaskResponse cancelTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.CANCELLED);
        task = taskRepository.save(task);
        return mapToResponse(task);
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .reviewId(task.getReview().getId())
                .assignedToId(task.getAssignedTo() != null ? task.getAssignedTo().getId() : null)
                .assignedToName(task.getAssignedTo() != null ? task.getAssignedTo().getFullName() : null)
                .status(task.getStatus())
                .priority(task.getPriority())
                .deadline(task.getDeadline())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .completedAt(task.getCompletedAt())
                .build();
    }
}

