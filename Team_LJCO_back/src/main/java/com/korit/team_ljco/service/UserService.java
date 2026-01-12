package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.UserResponseDto;
import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service  // 비즈니스 로직을 처리하는 서비스 객체임을 스프링에 등록
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<UserResponseDto> searchUsers(String name) {
        // 1. DB에서 데이터 가져오기 (Entity)
        List<User> userList = userMapper.findUsersByName(name);

        // 2. Entity -> DTO 변환 (Java Stream 문법 사용)
        // UserService.java 수정 부분
        return userList.stream()
                .map(user -> UserResponseDto.builder()
                        .userId(user.getUserId())
                        .name(user.getName())     // 엔티티의 getName()을 DTO의 name()에 담기!
                        .email(user.getEmail())
                        .provider(user.getRole()) // role 정보를 provider 자리에 임시 매핑
                        .createdAt(user.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}