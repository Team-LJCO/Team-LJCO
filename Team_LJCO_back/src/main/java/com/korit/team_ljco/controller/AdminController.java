package com.korit.team_ljco.controller;

import com.korit.team_ljco.dto.RecipeResponse;
import com.korit.team_ljco.entity.Ingredient;
import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.User;
import com.korit.team_ljco.service.IngredientService;
import com.korit.team_ljco.service.RecipeService;
import com.korit.team_ljco.service.UserService;
import com.korit.team_ljco.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Admin", description = "관리자 전용 API")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final IngredientService ingredientService;
    private final RecipeService recipeService;
    private final UserServiceImpl userServiceImpl;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(
            @RequestBody Map<String, String> request) {

        String token = userServiceImpl.adminLogin(
                request.get("username"),
                request.get("password")
        );

        return ResponseEntity.ok(Map.of("token", token));
    }

    @Operation(summary = "대시보드 통계 조회", description = "전체 사용자, 재료, 레시피 통계")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", userService.getTotalUserCount());
        stats.put("totalIngredients", ingredientService.getAllIngredients().size());
        stats.put("totalRecipes", recipeService.getAllRecipes().size());

        return ResponseEntity.ok(stats);
    }

    @Operation(summary = "전체 사용자 조회", description = "모든 사용자 목록")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "사용자 검색",
            description = "이름, 이메일, 역할, 제공자, 가입날짜로 검색")
    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String provider,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("role", role);
        params.put("provider", provider);
        params.put("startDate", startDate);
        params.put("endDate", endDate);

        List<User> users = userService.searchUsers(params);
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "사용자 역할 변경", description = "사용자를 관리자로 승격/강등")
    @PutMapping("/users/{userId}/role")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long userId,
            @RequestParam String role) {
        User user = userService.updateUserRole(userId, role);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "사용자 삭제", description = "사용자 계정 삭제")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "전체 재료 조회", description = "모든 재료 목록")
    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        return ResponseEntity.ok(ingredients);
    }

    @Operation(summary = "재료 검색", description = "재료명으로 검색")
    @GetMapping("/ingredients/search")
    public ResponseEntity<List<Ingredient>> searchIngredients(
            @RequestParam String keyword) {
        List<Ingredient> ingredients = ingredientService.searchIngredients(keyword);
        return ResponseEntity.ok(ingredients);
    }

    @Operation(summary = "재료 추가", description = "새로운 재료 등록")
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredient> createIngredient(
            @RequestBody Ingredient ingredient) {
        Ingredient created = ingredientService.createIngredient(ingredient);
        return ResponseEntity.ok(created);
    }

    @Operation(summary = "재료 수정", description = "재료 정보 수정")
    @PutMapping("/ingredients/{ingId}")
    public ResponseEntity<Ingredient> updateIngredient(
            @PathVariable Integer ingId,
            @RequestBody Ingredient ingredient) {
        Ingredient updated = ingredientService.updateIngredient(ingId, ingredient);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "재료 삭제", description = "재료 삭제")
    @DeleteMapping("/ingredients/{ingId}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Integer ingId) {
        ingredientService.deleteIngredient(ingId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "전체 레시피 조회", description = "모든 레시피 목록")
    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeResponse>> getAllRecipes() {
        List<RecipeResponse> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }


    @Operation(summary = "레시피 검색", description = "레시피명으로 검색")
    @GetMapping("/recipes/search")
    public ResponseEntity<List<Recipe>> searchRecipes(
            @RequestParam String keyword) {
        List<Recipe> recipes = recipeService.searchRecipesByName(keyword);
        return ResponseEntity.ok(recipes);
    }


    @Operation(summary = "레시피 수정", description = "레시피 기본 정보 수정")
    @PutMapping("/recipes/{rcpId}")
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable Long rcpId,
            @RequestBody Recipe recipe) {
        // 간단한 업데이트만 (이름, 이미지)
        Recipe updated = recipeService.updateRecipeBasicInfo(rcpId, recipe);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "레시피 삭제", description = "레시피 삭제")
    @DeleteMapping("/recipes/{rcpId}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long rcpId) {
        recipeService.deleteRecipe(rcpId);
        return ResponseEntity.noContent().build();
    }
}