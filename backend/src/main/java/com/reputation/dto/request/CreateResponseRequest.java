package com.reputation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateResponseRequest {
    @NotNull(message = "ID задачи обязателен")
    private Long taskId;

    @NotBlank(message = "Текст ответа обязателен")
    private String text;
}

