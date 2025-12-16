package com.reputation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reputation.model.User;
import com.reputation.model.UserRole;
import com.reputation.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@DisplayName("Интеграционные тесты для AuthController")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User testUser;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        testUser = User.builder()
            .username("testuser")
            .email("test@example.com")
            .passwordHash(passwordEncoder.encode("password123"))
            .fullName("Test User")
            .role(UserRole.ADMIN)
            .isActive(true)
            .build();
        userRepository.save(testUser);
    }

    @Test
    @DisplayName("POST /api/auth/login с валидными учетными данными должен вернуть JWT токены")
    void login_WithValidCredentials_ReturnsJwtResponse() throws Exception {
        String requestBody = """
            {
                "username": "testuser",
                "password": "password123"
            }
            """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.accessToken").isNotEmpty())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andExpect(jsonPath("$.refreshToken").isNotEmpty())
            .andExpect(jsonPath("$.tokenType").value("Bearer"))
            .andExpect(jsonPath("$.expiresIn").exists())
            .andExpect(jsonPath("$.user").exists())
            .andExpect(jsonPath("$.user.id").value(testUser.getId()))
            .andExpect(jsonPath("$.user.username").value("testuser"))
            .andExpect(jsonPath("$.user.email").value("test@example.com"))
            .andExpect(jsonPath("$.user.role").value("ADMIN"));
    }

    @Test
    @DisplayName("POST /api/auth/login с неверным паролем должен вернуть 401")
    void login_WithInvalidPassword_Returns401() throws Exception {
        String requestBody = """
            {
                "username": "testuser",
                "password": "wrong-password"
            }
            """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/auth/login с несуществующим пользователем должен вернуть 401")
    void login_WithNonExistentUser_Returns401() throws Exception {
        String requestBody = """
            {
                "username": "nonexistent",
                "password": "password123"
            }
            """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/auth/login с неактивным пользователем должен вернуть 401")
    void login_WithInactiveUser_Returns401() throws Exception {
        User inactiveUser = User.builder()
            .username("inactive")
            .email("inactive@example.com")
            .passwordHash(passwordEncoder.encode("password123"))
            .fullName("Inactive User")
            .role(UserRole.SPECIALIST)
            .isActive(false)
            .build();
        userRepository.save(inactiveUser);

        String requestBody = """
            {
                "username": "inactive",
                "password": "password123"
            }
            """;

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/auth/login с пустым телом запроса должен вернуть 400")
    void login_WithEmptyBody_Returns400() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/auth/refresh с валидным refresh токеном должен вернуть новый access токен")
    void refreshToken_WithValidRefreshToken_ReturnsNewAccessToken() throws Exception {

        String loginBody = """
            {
                "username": "testuser",
                "password": "password123"
            }
            """;

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginBody))
            .andReturn()
            .getResponse()
            .getContentAsString();

        String refreshToken = extractRefreshToken(loginResponse);

        String refreshBody = String.format("""
            {
                "refreshToken": "%s"
            }
            """, refreshToken);

        mockMvc.perform(post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(refreshBody))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.accessToken").isNotEmpty())
            .andExpect(jsonPath("$.refreshToken").value(refreshToken))
            .andExpect(jsonPath("$.tokenType").value("Bearer"));
    }

    @Test
    @DisplayName("POST /api/auth/refresh с невалидным refresh токеном должен вернуть 403")
    void refreshToken_WithInvalidRefreshToken_Returns403() throws Exception {
        String refreshBody = """
            {
                "refreshToken": "invalid-token-uuid"
            }
            """;

        mockMvc.perform(post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(refreshBody))
            .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /api/auth/logout с валидным refresh токеном должен успешно выполнить выход")
    void logout_WithValidRefreshToken_Returns200() throws Exception {

        String loginBody = """
            {
                "username": "testuser",
                "password": "password123"
            }
            """;

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginBody))
            .andReturn()
            .getResponse()
            .getContentAsString();

        String refreshToken = extractRefreshToken(loginResponse);

        String logoutBody = String.format("""
            {
                "refreshToken": "%s"
            }
            """, refreshToken);

        mockMvc.perform(post("/api/auth/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(logoutBody))
            .andExpect(status().isOk());

        mockMvc.perform(post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(logoutBody))
            .andExpect(status().isForbidden());
    }

    private String extractRefreshToken(String jsonResponse) {
        try {

            int start = jsonResponse.indexOf("\"refreshToken\":\"") + 16;
            int end = jsonResponse.indexOf("\"", start);
            return jsonResponse.substring(start, end);
        } catch (Exception e) {
            return "invalid-token";
        }
    }
}
