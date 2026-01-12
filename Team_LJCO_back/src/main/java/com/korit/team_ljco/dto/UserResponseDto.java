package com.korit.team_ljco.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserResponseDto {
    private Long userId;        // 고유 번호 (관리용)
    private String name;    // 이름 (홍길동)
    private String email;       // 이메일
    private String provider;    // 로그인 정보 (google, naver 등)
    private LocalDateTime createdAt; // 가입 날짜
}