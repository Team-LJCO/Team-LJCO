package com.korit.team_ljco.mapper;

import com.korit.team_ljco.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User selectUserById(Long userId);

    User selectUserByOauth2Id(String oauth2Id);

    User selectUserByEmail(String email);

    int insertUser(User user);

    int updateUser(User user);

    int deleteUser(Long userId);
}