package com.korit.team_ljco.mapper;

import com.korit.team_ljco.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findById(int userId);
    User findByProvider(
            @Param("provider") String provider,
            @Param("providerId") String providerId
    );
}

