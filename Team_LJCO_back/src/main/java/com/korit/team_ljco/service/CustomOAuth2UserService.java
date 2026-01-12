package com.korit.team_ljco.service;

import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.security.PrincipalUser;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfo;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        // OAuth2 제공자 식별 (google, naver, kakao)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 사용자 정보 추출
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oauth2User.getAttributes());

        // DB에서 사용자 조회 또는 생성
        User user = userService.processOAuth2User(userInfo, registrationId);

        // PrincipalUser 객체 생성하여 반환
        return new PrincipalUser(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getUserRole())),
                oauth2User.getAttributes(),
                userInfo.getNameAttributeKey(),
                user
        );
    }
}
