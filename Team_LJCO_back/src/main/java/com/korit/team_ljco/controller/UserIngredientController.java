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
@RequestMapping("/api/user/ingredients") // 기본 경로 유지
@RequiredArgsConstructor
public class UserIngredientController {

    private final UserIngredientService userIngredientService;

    /**
     * ✅ [신규 추가] 요리 완료 시 선택한 재료들 이름 기반으로 다중 삭제
     * 기존 기능들과 경로가 겹치지 않도록 "/names"를 추가했습니다.
     */
    @DeleteMapping("/names")
    public ResponseEntity<Void> deleteIngredientsByNames(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody List<String> ingredientNames) {

        // MyBatis Mapper의 deleteIngredientsByNames를 호출하도록 서비스 연동
        userIngredientService.deleteIngredientsByNames(principalUser.getUserId(), ingredientNames);

        return ResponseEntity.noContent().build();
    }

    /**
     * 내 냉장고 전체 재료 조회
     */
    @GetMapping
    public ResponseEntity<FridgeHomeResponse> getUserIngredients(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestParam (defaultValue = "30") int limit) {
        FridgeHomeResponse fridgeHomeResponse = userIngredientService.getUserIngredients(principalUser.getUserId(), limit);
        return ResponseEntity.ok(fridgeHomeResponse);
    }


    @PostMapping("/use-recipe/{rcpId}") // API 경로 설정
    public ResponseEntity<?> useIngredients(
            @AuthenticationPrincipal PrincipalUser principalUser, // 로그인 정보에서 userId 추출
            @PathVariable Long rcpId) {

        // principalUser가 null인지 체크하는 로직이 있으면 더 안전합니다.
        userIngredientService.useRecipeIngredients(principalUser.getUserId(), rcpId);
        return ResponseEntity.ok().build();
    }

    /**
     * 사용자 재료 ID로 상세 조회
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
     * ✅ [신규] 부족한 재료 다중 등록 (이름 기반)
     */
    @PostMapping("/names")
    public ResponseEntity<Void> addIngredientsByNames(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody List<String> ingredientNames) {

        userIngredientService.addIngredientsByNames(principalUser.getUserId(), ingredientNames);

        return ResponseEntity.ok().build();
    }

    /**
     * 사용자 재료 정보 수정
     */
    @PutMapping("/{userIngId}")
    public ResponseEntity<UserIngredient> updateUserIngredient(
            @PathVariable Long userIngId,
            @RequestBody UserIngredientRequest request) {
        UserIngredient userIngredient = userIngredientService.updateUserIngredient(userIngId, request);
        return ResponseEntity.ok(userIngredient);
    }

    /**
     * 단일 재료 삭제 (기존 기능)
     */
    @DeleteMapping("/{userIngId}")
    public ResponseEntity<Void> deleteUserIngredient(@PathVariable Long userIngId) {
        userIngredientService.deleteUserIngredient(userIngId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 사용자의 모든 재료 비우기 (기존 기능)
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteAllUserIngredients(
            @AuthenticationPrincipal PrincipalUser principalUser) {
        userIngredientService.deleteAllUserIngredients(principalUser.getUserId());
        return ResponseEntity.noContent().build();
    }

    /**
     * 사용자 냉장고 재료 총 개수
     */
    @GetMapping("/count")
    public ResponseEntity<Integer> getUserIngredientCount(
            @AuthenticationPrincipal PrincipalUser principalUser) {
        int count = userIngredientService.getUserIngredientCount(principalUser.getUserId());
        return ResponseEntity.ok(count);
    }
}