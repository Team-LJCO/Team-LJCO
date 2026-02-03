package com.korit.team_ljco.filter;

import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.jwt.JwtTokenProvider;
import com.korit.team_ljco.security.PrincipalUser;
import com.korit.team_ljco.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getTokenFromRequest(request);

        if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            Long userId = jwtTokenProvider.getUserIdFromToken(token);

            // 관리자 토큰 처리 (userId == 0)
            if (userId == 0L) {
                Map<String, Object> attributes = new HashMap<>();
                attributes.put("sub", "0");
                attributes.put("name", "admin");
                attributes.put("email", "admin@system.com");

                User adminUser = User.builder()
                        .userId(0L)
                        .userName("admin")
                        .userEmail("admin@system.com")
                        .userRole("ADMIN")
                        .build();

                PrincipalUser principalUser = new PrincipalUser(
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")),
                        attributes,
                        "sub",
                        adminUser
                );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                principalUser,
                                null,
                                principalUser.getAuthorities()
                        );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            // 일반 사용자 처리
            else {
                User user = userService.findUserById(userId);

                if (user != null) {
                    Map<String, Object> attributes = new HashMap<>();
                    attributes.put("sub", String.valueOf(user.getUserId()));
                    attributes.put("name", user.getUserName());
                    attributes.put("email", user.getUserEmail());

                    PrincipalUser principalUser = new PrincipalUser(
                            Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getUserRole())),
                            attributes,
                            "sub",
                            user
                    );

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    principalUser,
                                    null,
                                    principalUser.getAuthorities()
                            );

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        // 1. 헤더에서 토큰 추출 (기존 방식)
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        // 2. ⭐ 쿠키에서 토큰 추출 (추가된 정답 로직)
        // 브라우저가 withCredentials: true로 보낸 쿠키를 여기서 읽습니다.
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}