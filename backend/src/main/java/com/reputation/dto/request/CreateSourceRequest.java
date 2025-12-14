package com.reputation.dto.request;

import com.reputation.model.PlatformType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateSourceRequest {
    @NotNull(message = "ID компании обязателен")
    private Long companyId;

    @NotNull(message = "Платформа обязательна")
    private PlatformType platform;

    @NotBlank(message = "Название источника обязательно")
    @Size(max = 200, message = "Название не должно превышать 200 символов")
    private String name;

    @Size(max = 500, message = "URL не должен превышать 500 символов")
    private String url;

    @Size(max = 255, message = "API ключ не должен превышать 255 символов")
    private String apiKey;
}

