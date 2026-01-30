package com.korit.team_ljco.controller;

import com.korit.team_ljco.dto.FridgeHomeResponse;
import com.korit.team_ljco.dto.UserIngredientRequest;
import com.korit.team_ljco.entity.UserIngredient;
import com.korit.team_ljco.security.PrincipalUser;
import com.korit.team_ljco.service.UserIngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/ingredients")
@RequiredArgsConstructor
public class UserIngredientController {

    private final UserIngredientService userIngredientService;


    @GetMapping
    public ResponseEntity<FridgeHomeResponse> getUserIngredients(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam (defaultValue = "30") int limit) {
        FridgeHomeResponse fridgeHomeResponse = userIngredientService.getUserIngredients(principalUser.getUserId(), limit);
        return ResponseEntity.ok(fridgeHomeResponse);
    }

    /**
     * 사용자 재료 ID로 조회
     */
    @GetMapping("/{userIngId}")
    public ResponseEntity<UserIngredient> getUserIngredientById(@PathVariable Long userIngId) {
        UserIngredient userIngredient = userIngredientService.getUserIngredientById(userIngId);
        return ResponseEntity.ok(userIngredient);
    }

    /**
     * 사용자 재료 등록
     */
    @PostMapping
    public ResponseEntity<UserIngredient> addUserIngredient(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody UserIngredientRequest request) {
        UserIngredient userIngredient = userIngredientService.addUserIngredient(
                principalUser.getUserId(), request);
        return ResponseEntity.ok(userIngredient);
    }

    /**
     * 사용자 재료 수정
     */
    @PutMapping("/{userIngId}")
    public ResponseEntity<UserIngredient> updateUserIngredient(
            @PathVariable Long userIngId,
            @RequestBody UserIngredientRequest request) {
        UserIngredient userIngredient = userIngredientService.updateUserIngredient(userIngId, request);
        return ResponseEntity.ok(userIngredient);
    }

    /**
     * 사용자 재료 삭제
     */
    @DeleteMapping("/{userIngId}")
    public ResponseEntity<Void> deleteUserIngredient(@PathVariable Long userIngId) {
        userIngredientService.deleteUserIngredient(userIngId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 사용자의 모든 재료 삭제
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteAllUserIngredients(
            @AuthenticationPrincipal PrincipalUser principalUser) {
        userIngredientService.deleteAllUserIngredients(principalUser.getUserId());
        return ResponseEntity.noContent().build();
    }

    /**
     * 사용자 재료 개수
     */
    @GetMapping("/count")
    public ResponseEntity<Integer> getUserIngredientCount(
            @AuthenticationPrincipal PrincipalUser principalUser) {
        int count = userIngredientService.getUserIngredientCount(principalUser.getUserId());
        return ResponseEntity.ok(count);
    }
}
