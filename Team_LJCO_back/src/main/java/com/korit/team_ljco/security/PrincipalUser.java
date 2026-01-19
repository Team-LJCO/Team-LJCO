package com.korit.team_ljco.security;


import com.korit.team_ljco.entity.User;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class PrincipalUser extends DefaultOAuth2User {

    private User user;

    public PrincipalUser(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            User user) {
        super(authorities, attributes, nameAttributeKey);
        this.user = user;
    }

    /**
     * 현재 인증된 사용자 정보 가져오기
     */
    public static PrincipalUser getAuthenticatedPrincipalUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof PrincipalUser)) {
            return null;
        }
        return (PrincipalUser) authentication.getPrincipal();
    }

    /**
     * 현재 인증된 User 엔티티 가져오기
     */
    public static User getAuthenticatedUser() {
        PrincipalUser principalUser = getAuthenticatedPrincipalUser();
        return principalUser != null ? principalUser.getUser() : null;
    }

    /**
     * 사용자 ID 가져오기 (편의 메서드)
     */
    public Long getUserId() {
        return this.user != null ? this.user.getUserId() : null;
    }

    /**
     * 사용자 이름 가져오기 (편의 메서드)
     */
    public String getUserName() {
        return this.user != null ? this.user.getUserName() : null;
    }

    /**
     * 사용자 이메일 가져오기 (편의 메서드)
     */
    public String getUserEmail() {
        return this.user != null ? this.user.getUserEmail() : null;
    }

    /**
     * 사용자 역할 가져오기 (편의 메서드)
     */
    public String getUserRole() {
        return this.user != null ? this.user.getUserRole() : null;
    }
}