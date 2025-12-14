package com.reputation.dto.request;

import com.reputation.model.TaskPriority;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateTaskRequest {
    @NotNull(message = "ID отзыва обязателен")
    private Long reviewId;

    private Long assignedToId;

    private TaskPriority priority;

    private LocalDateTime deadline;
}

