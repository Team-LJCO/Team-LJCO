package com.korit.team_ljco.mapper;

import com.korit.team_ljco.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    User selectUserById(Long userId);

    User selectUserByOauth2Id(String oauth2Id);

    int insertUser(User user);

    int updateUser(User user);

    int deleteUser(Long userId);

    int selectTotalUserCount();      // ← 이거 있어요?
    List<User> selectAllUsers();     // ← 이거 있어요?
    List<User> searchUsers(Map<String, Object> params);
}