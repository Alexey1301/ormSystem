package com.reputation.service;

import com.reputation.dto.request.LoginRequest;
import com.reputation.dto.request.RefreshTokenRequest;
import com.reputation.dto.response.JwtResponse;
import com.reputation.exception.TokenRefreshException;
import com.reputation.model.RefreshToken;
import com.reputation.model.User;
import com.reputation.repository.UserRepository;
import com.reputation.security.UserPrincipal;
import com.reputation.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;

    @Transactional
    public JwtResponse login(LoginRequest loginRequest) {
        // Аутентификация пользователя
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Получение UserPrincipal
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // Генерация access token
        String accessToken = tokenProvider.generateAccessToken(authentication);

        // Получение пользователя из БД
        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Удаление старых refresh токенов пользователя
        refreshTokenService.deleteByUser(user);

        // Создание нового refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        // Обновление last_login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        log.info("User {} logged in successfully", user.getUsername());

        // Формирование ответа
        return JwtResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken.getToken())
            .tokenType("Bearer")
            .expiresIn(tokenProvider.getAccessTokenExpiration() / 1000)
            .user(JwtResponse.UserInfo.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .companyId(user.getCompany() != null ? user.getCompany().getId() : null)
                .build())
            .build();
    }

    @Transactional
    public JwtResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
                String newAccessToken = tokenProvider.generateAccessToken(user.getId());
                
                log.info("Access token refreshed for user {}", user.getUsername());

                return JwtResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(requestRefreshToken)
                    .tokenType("Bearer")
                    .expiresIn(tokenProvider.getAccessTokenExpiration() / 1000)
                    .build();
            })
            .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token not found"));
    }

    @Transactional
    public void logout(RefreshTokenRequest request) {
        refreshTokenService.deleteByToken(request.getRefreshToken());
        SecurityContextHolder.clearContext();
        log.info("User logged out successfully");
    }
}













