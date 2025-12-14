package com.reputation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCompanyRequest {
    @NotBlank(message = "Название компании обязательно")
    @Size(max = 200, message = "Название компании не должно превышать 200 символов")
    private String name;

    @Size(max = 1000, message = "Описание не должно превышать 1000 символов")
    private String description;

    @Size(max = 100, message = "Отрасль не должна превышать 100 символов")
    private String industry;

    @Size(max = 255, message = "URL веб-сайта не должен превышать 255 символов")
    private String website;
}

