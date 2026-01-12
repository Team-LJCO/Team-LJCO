package com.korit.team_ljco.service.impl;

import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.mapper.UserMapper;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfo;
import com.korit.team_ljco.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Override
    public User findUserByOauth2Id(String oauth2Id) {
        return userMapper.selectUserByOauth2Id(oauth2Id);
    }

    @Override
    public User findUserById(Long userId) {
        return userMapper.selectUserById(userId);
    }

    @Override
    @Transactional
    public User processOAuth2User(OAuth2UserInfo userInfo, String provider) {
        // provider + providerId 조합으로 고유 식별
        String oauth2Id = provider + "_" + userInfo.getProviderId();

        // 기존 사용자 조회
        User existingUser = userMapper.selectUserByOauth2Id(oauth2Id);

        if (existingUser != null) {
            // 기존 사용자 정보 업데이트
            existingUser.setUserName(userInfo.getName());
            existingUser.setUserEmail(userInfo.getEmail());
            userMapper.updateUser(existingUser);
            return existingUser;
        }

        // 신규 사용자 생성
        User newUser = User.builder()
                .userName(userInfo.getName())
                .userEmail(userInfo.getEmail())
                .userRole("USER")
                .oauth2Provider(provider)
                .oauth2Id(oauth2Id)
                .build();

        userMapper.insertUser(newUser);
        return newUser;
    }

//    @Override
//    public User findUserByEmail(String email) {
//        return userMapper.selectUserByEmail(email);
//    }
}