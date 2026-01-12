package com.korit.team_ljco.service;


import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfo;

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
}
