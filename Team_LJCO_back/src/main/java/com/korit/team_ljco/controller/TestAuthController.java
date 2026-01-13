package com.korit.team_ljco.controller;

import com.korit.team_ljco.dto.OAuth2Response;
import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.jwt.JwtTokenProvider;
import com.korit.team_ljco.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Test Auth", description = "테스트용 인증 API (개발용)")
@RestController
@RequestMapping("/api/test/auth")
@RequiredArgsConstructor
public class TestAuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Operation(summary = "테스트용 JWT 토큰 발급",
            description = "userId로 JWT 토큰을 발급받습니다. (개발/테스트용)")
    @PostMapping("/token")
    public ResponseEntity<OAuth2Response> generateTestToken(@RequestParam Long userId) {
        // 사용자 조회
        User user = userService.findUserById(userId);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user);

        // 응답 생성
        OAuth2Response response = OAuth2Response.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userRole(user.getUserRole())
                .build();

        return ResponseEntity.ok(response);
    }
}