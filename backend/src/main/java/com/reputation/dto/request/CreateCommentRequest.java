package com.reputation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCommentRequest {
    @NotNull(message = "ID задачи обязателен")
    private Long taskId;

    @NotBlank(message = "Текст комментария обязателен")
    private String text;
}

