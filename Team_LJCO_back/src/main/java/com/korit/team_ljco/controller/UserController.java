package com.korit.team_ljco.controller;

import com.korit.team_ljco.dto.UserResponseDto;
import com.korit.team_ljco.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController// JSON 데이터를 주고받는 API 전용 컨트롤러임을 선언
public class UserController {

    @Autowired // 스프링이 관리하는 다른 객체(Mapper 등)를 자동으로 가져와 연결
    private UserService userService;

    // URL: http://localhost:8080/admin/users?name=홍길동
    @GetMapping("/admin/users") // 브라우저의 GET 요청 주소를 메서드와 연결
    public List<UserResponseDto> findUser(@RequestParam String name) { // URL 주소창에 붙은 파라미터(?name=...) 값을 변수에 저장

        return userService.searchUsers(name);
    }
}

