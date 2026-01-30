package com.korit.team_ljco.service;

import com.korit.team_ljco.entity.RecipeStep;
import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.jwt.JwtTokenProvider;
import com.korit.team_ljco.mapper.UserIngredientMapper;
import com.korit.team_ljco.mapper.UserMapper;
import com.korit.team_ljco.security.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserIngredientMapper userIngredientMapper;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")  // ← 여기 오타 수정!
    private String adminPassword;

    // 생성자
    public UserServiceImpl(UserMapper userMapper, UserIngredientMapper userIngredientMapper, JwtTokenProvider jwtTokenProvider) {
        this.userMapper = userMapper;
        this.userIngredientMapper = userIngredientMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String adminLogin(String username, String password) {
        if (!adminUsername.equals(username) || !adminPassword.equals(password)) {
            throw new RuntimeException("Invalid admin credentials");
        }

        User adminUser = User.builder()
                .userId(0L)
                .userName(username)
                .userEmail("admin@system.com")
                .userRole("ROLE_ADMIN")
                .build();

        return jwtTokenProvider.createAccessToken(adminUser);
    }

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
        String oauth2Id = provider + "_" + userInfo.getProviderId();
        User existingUser = userMapper.selectUserByOauth2Id(oauth2Id);

        if (existingUser != null) {
            existingUser.setUserName(userInfo.getName());
            existingUser.setUserEmail(userInfo.getEmail());
            userMapper.updateUser(existingUser);
            return existingUser;
        }

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

    @Override
    public int getTotalUserCount() {
        return userMapper.selectTotalUserCount();
    }

    @Override
    public List<User> getAllUsers() {
        return userMapper.selectAllUsers();
    }

    @Override
    @Transactional
    public User updateUserRole(Long userId, String role) {
        User user = userMapper.selectUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + userId);
        }
        user.setUserRole(role);
        userMapper.updateUser(user);
        return user;
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        // 사용자의 재료 데이터 먼저 삭제 (외래 키 제약조건)
        userIngredientMapper.deleteUserIngredientsByUser(userId);
        userMapper.deleteUser(userId);
    }

    @Override
    public List<User> searchUsers(Map<String, Object> params) {
        return userMapper.searchUsers(params);
    }
    // RecipeServiceImpl.java 파일에 삭제

}