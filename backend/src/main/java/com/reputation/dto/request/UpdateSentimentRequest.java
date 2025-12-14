package com.reputation.dto.request;

import com.reputation.model.SentimentType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateSentimentRequest {
    @NotNull(message = "Тональность обязательна")
    private SentimentType sentiment;
}

