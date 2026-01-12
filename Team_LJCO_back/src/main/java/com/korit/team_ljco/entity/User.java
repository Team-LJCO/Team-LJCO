package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long userId;
    private String email;
    private String name;     // DB: user_name
    private String provider;     // ex) google, kakao
    private String providerId;   // 소셜 로그인 ID
    private String role;         // ex) USER, ADMIN
    private LocalDateTime createdAt;
}