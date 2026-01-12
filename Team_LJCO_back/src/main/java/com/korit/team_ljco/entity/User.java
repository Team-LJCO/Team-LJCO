package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private Long userId;
    private String userName;
    private String userEmail;
    private String userRole;

    // OAuth2 관련 필드
    private String oauth2Provider;  // google, naver, kakao
    private String oauth2Id;        // provider_providerId (예: google_123456)

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}