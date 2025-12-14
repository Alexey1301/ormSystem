package com.reputation.service;

import com.reputation.dto.request.CreateResponseRequest;
import com.reputation.dto.response.ResponseResponse;
import com.reputation.model.Response;
import com.reputation.model.Task;
import com.reputation.model.User;
import com.reputation.repository.ResponseRepository;
import com.reputation.repository.TaskRepository;
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
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResponseResponse createResponse(CreateResponseRequest request) {
        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Response response = Response.builder()
                .task(task)
                .review(task.getReview())
                .user(user)
                .text(request.getText())
                .isPublished(false)
                .build();
        
        response = responseRepository.save(response);
        return mapToResponse(response);
    }

    public List<ResponseResponse> getAllResponses() {
        return responseRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ResponseResponse getResponseById(Long id) {
        Response response = responseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response not found"));
        return mapToResponse(response);
    }

    @Transactional
    public ResponseResponse approveResponse(Long id) {
        Response response = responseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response not found"));
        response.setIsPublished(true);
        response.setPublishedAt(java.time.LocalDateTime.now());
        response = responseRepository.save(response);
        return mapToResponse(response);
    }

    @Transactional
    public void deleteResponse(Long id) {
        if (!responseRepository.existsById(id)) {
            throw new RuntimeException("Response not found");
        }
        responseRepository.deleteById(id);
    }

    private ResponseResponse mapToResponse(Response response) {
        return ResponseResponse.builder()
                .id(response.getId())
                .taskId(response.getTask().getId())
                .reviewId(response.getReview().getId())
                .userId(response.getUser().getId())
                .userName(response.getUser().getFullName())
                .text(response.getText())
                .recordedAt(response.getRecordedAt())
                .publishedAt(response.getPublishedAt())
                .isPublished(response.getIsPublished())
                .createdAt(response.getCreatedAt())
                .build();
    }
}

