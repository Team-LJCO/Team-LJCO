package com.korit.team_ljco.mapper;

import com.korit.team_ljco.entity.User;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface UserMapper {
    // 동명이인이 있을 수 있으니 List로 받아옵니다.
    List<User> findUsersByName(String userName);
}