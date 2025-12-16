package com.reputation.service;

import com.reputation.dto.request.LoginRequest;
import com.reputation.dto.request.RefreshTokenRequest;
import com.reputation.dto.response.JwtResponse;
import com.reputation.exception.TokenRefreshException;
import com.reputation.model.RefreshToken;
import com.reputation.model.User;
import com.reputation.model.UserRole;
import com.reputation.repository.UserRepository;
import com.reputation.security.UserPrincipal;
import com.reputation.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Unit-тесты для AuthService")
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private UserPrincipal userPrincipal;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .passwordHash("$2a$10$encodedPassword")
            .fullName("Test User")
            .role(UserRole.ADMIN)
            .isActive(true)
            .build();

        userPrincipal = UserPrincipal.create(testUser);
    }

    @Test
    @DisplayName("Успешный вход с валидными учетными данными должен вернуть JWT токены")
    void login_WithValidCredentials_ReturnsJwtResponse() {
        LoginRequest request = new LoginRequest("testuser", "password123");
        Authentication authentication = mock(Authentication.class);
        RefreshToken refreshToken = RefreshToken.builder()
            .id(1L)
            .user(testUser)
            .token(UUID.randomUUID().toString())
            .expiryDate(LocalDateTime.now().plusDays(7))
            .build();

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(tokenProvider.generateAccessToken(1L)).thenReturn("access-token-123");
        doNothing().when(refreshTokenService).deleteByUser(any(User.class));
        when(refreshTokenService.createRefreshToken(testUser)).thenReturn(refreshToken);

        JwtResponse response = authService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("access-token-123");
        assertThat(response.getRefreshToken()).isEqualTo(refreshToken.getToken());
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getUser()).isNotNull();
        assertThat(response.getUser().getUsername()).isEqualTo("testuser");
        assertThat(response.getUser().getRole()).isEqualTo("ADMIN");

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findById(1L);
        verify(tokenProvider).generateAccessToken(1L);
        verify(refreshTokenService).deleteByUser(testUser);
        verify(refreshTokenService).createRefreshToken(testUser);
        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("Вход с неверными учетными данными должен выбросить исключение")
    void login_WithInvalidCredentials_ThrowsBadCredentialsException() {
        LoginRequest request = new LoginRequest("testuser", "wrong-password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenThrow(new BadCredentialsException("Invalid username or password"));

        assertThatThrownBy(() -> authService.login(request))
            .isInstanceOf(BadCredentialsException.class)
            .hasMessageContaining("Invalid username or password");

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findById(anyLong());
        verify(tokenProvider, never()).generateAccessToken(anyLong());
    }

    @Test
    @DisplayName("Обновление токена с валидным refresh токеном должно вернуть новый access токен")
    void refreshToken_WithValidRefreshToken_ReturnsNewAccessToken() {
        String refreshTokenValue = UUID.randomUUID().toString();
        RefreshTokenRequest request = new RefreshTokenRequest(refreshTokenValue);
        RefreshToken refreshToken = RefreshToken.builder()
            .id(1L)
            .user(testUser)
            .token(refreshTokenValue)
            .expiryDate(LocalDateTime.now().plusDays(7))
            .build();

        when(refreshTokenService.findByToken(refreshTokenValue))
            .thenReturn(Optional.of(refreshToken));
        when(refreshTokenService.verifyExpiration(refreshToken)).thenReturn(refreshToken);
        when(tokenProvider.generateAccessToken(1L)).thenReturn("new-access-token-456");

        JwtResponse response = authService.refreshToken(request);

        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("new-access-token-456");
        assertThat(response.getRefreshToken()).isEqualTo(refreshTokenValue);
        assertThat(response.getTokenType()).isEqualTo("Bearer");

        verify(refreshTokenService).findByToken(refreshTokenValue);
        verify(refreshTokenService).verifyExpiration(refreshToken);
        verify(tokenProvider).generateAccessToken(1L);
    }

    @Test
    @DisplayName("Обновление токена с несуществующим refresh токеном должно выбросить исключение")
    void refreshToken_WithNonExistentToken_ThrowsTokenRefreshException() {
        String refreshTokenValue = UUID.randomUUID().toString();
        RefreshTokenRequest request = new RefreshTokenRequest(refreshTokenValue);

        when(refreshTokenService.findByToken(refreshTokenValue))
            .thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.refreshToken(request))
            .isInstanceOf(TokenRefreshException.class)
            .hasMessageContaining("Refresh token not found");

        verify(refreshTokenService).findByToken(refreshTokenValue);
        verify(tokenProvider, never()).generateAccessToken(anyLong());
    }

    @Test
    @DisplayName("Выход из системы должен удалить refresh токен")
    void logout_WithValidRefreshToken_DeletesRefreshToken() {
        String refreshTokenValue = UUID.randomUUID().toString();
        RefreshTokenRequest request = new RefreshTokenRequest(refreshTokenValue);

        doNothing().when(refreshTokenService).deleteByToken(refreshTokenValue);

        authService.logout(request);

        verify(refreshTokenService).deleteByToken(refreshTokenValue);
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    }
}

