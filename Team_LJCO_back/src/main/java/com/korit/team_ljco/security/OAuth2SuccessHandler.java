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

    @Value("${app.oauth2.redirect-uri:http://localhost:5173/auth/oauth2/callback}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 1. PrincipalUser에서 User 객체 추출
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();

        // 2. JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user);

        // ★ 여기에 로그를 넣어주세요 ★
        System.out.println("OAuth2 로그인 성공: " + user.getUserEmail());
        System.out.println("설정된 Redirect URI: " + redirectUri);

        String finalTargetUrl = redirectUri + "?accessToken=" + accessToken;
        System.out.println("최종 이동 주소: " + finalTargetUrl);

        // 3. 프론트엔드로 리다이렉트
        response.sendRedirect(finalTargetUrl);
    }
}