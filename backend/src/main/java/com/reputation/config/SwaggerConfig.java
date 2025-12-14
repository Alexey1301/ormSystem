package com.reputation.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        
        return new OpenAPI()
                .info(new Info()
                        .title("Reputation Management System API")
                        .version("1.0.0")
                        .description("API для системы управления репутацией компании. " +
                                "Система позволяет автоматизировать сбор, анализ и мониторинг отзывов " +
                                "о компаниях из различных источников (Яндекс, Google, 2GIS).")
                        .contact(new Contact()
                                .name("Reputation Management System")
                                .email("support@reputation-system.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080/api")
                                .description("Локальный сервер разработки"),
                        new Server()
                                .url("https://api.reputation-system.com/api")
                                .description("Production сервер")
                ))
                .addSecurityItem(new SecurityRequirement()
                        .addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("JWT токен аутентификации. " +
                                                "Получите токен через /auth/login, затем используйте его в формате: Bearer {token}")));
    }
}

