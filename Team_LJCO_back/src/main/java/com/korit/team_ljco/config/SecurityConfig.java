package com.korit.team_ljco.config;

import com.korit.team_ljco.filter.JwtAuthenticationFilter;
import com.korit.team_ljco.security.JwtAuthenticationEntryPoint;
import com.korit.team_ljco.security.OAuth2SuccessHandler;
import com.korit.team_ljco.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // ← @PreAuthorize 활성화!
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final OAuth2SuccessHandler oauth2SuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. Swagger UI 및 API 문서 - 최우선 허용
                        .requestMatchers(
                                "/doc",
                                "/doc/**",
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs",
                                "/api/test/**",
                                "/v3/api-docs/**",
                                "/api-docs",
                                "/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                                // SecurityConfig.java의 71~74번 라인 근처 수정
// 3. 공개 API - 재료, 레시피 (인증 불필요)
                                .requestMatchers(
                                        "/api/ingredients/**",
                                        "/api/recipes/**", // 기존 경로
                                        "/recipes/**"      // ← 이 줄을 추가하세요! (컨트롤러 주소와 일치시킴)
                                ).permitAll()

                        // 2. OAuth2 및 인증 관련 경로
                        .requestMatchers(
                                "/api/auth/**",
                                "/oauth2/**",
                                "/login/**"
                        ).permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .requestMatchers("/api/images/upload").authenticated()

                        // 3. 공개 API - 재료, 레시피 (인증 불필요)
                        .requestMatchers(
                                "/api/ingredients/**",
                                "/api/recipes/**"
                        ).permitAll()

                        // 4. 관리자 로그인 - 누구나 접근
                        .requestMatchers("/api/admin/login").permitAll()

                        // 5. 관리자 API - ADMIN 역할만
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // 6. 사용자 전용 API - 인증 필요
                        .requestMatchers("/api/user/**").authenticated()

                        // 7. 그 외 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                        .successHandler(oauth2SuccessHandler)
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // 테스트를 위해 모든 origin 허용
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}