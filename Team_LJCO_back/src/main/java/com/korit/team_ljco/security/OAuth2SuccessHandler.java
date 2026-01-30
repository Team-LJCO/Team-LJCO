package com.korit.team_ljco.security;

import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.jwt.JwtTokenProvider;
import com.korit.team_ljco.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 1. PrincipalUser에서 User 객체 추출
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();

        // 2. JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user);
        Long userId = user.getUserId();

        String finalTargetUrl = redirectUri + "?accessToken=" + accessToken
                + "&userId=" + userId;

        // 3. 프론트엔드로 리다이렉트
        response.sendRedirect(finalTargetUrl);
    }
}