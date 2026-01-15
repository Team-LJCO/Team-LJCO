package com.korit.team_ljco.service;

import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfo;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Map;

public interface UserService {



    /**
     * OAuth2 ID로 사용자 조회
     */
    User findUserByOauth2Id(String oauth2Id);

    /**
     * 사용자 ID로 조회
     */
    User findUserById(Long userId);

    /**
     * OAuth2 사용자 정보로 회원가입 또는 로그인 처리
     */
    User processOAuth2User(OAuth2UserInfo userInfo, String provider);

    /**
     * 전체 사용자 수 조회
     */
    int getTotalUserCount();

    /**
     * 전체 사용자 목록 조회
     */
    List<User> getAllUsers();

    /**
     * 사용자 역할 변경
     */
    User updateUserRole(Long userId, String role);

    /**
     * 사용자 삭제
     */
    void deleteUser(Long userId);

    /**
     * 사용자 검색 (이름, 이메일, 역할, 제공자, 날짜 등)
     */
    List<User> searchUsers(Map<String, Object> params);
}