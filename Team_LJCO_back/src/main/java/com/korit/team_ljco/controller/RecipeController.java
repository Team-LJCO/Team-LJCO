package com.korit.team_ljco.controller;
import com.korit.team_ljco.dto.RecipeCountRow;
import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.entity.RecipeStep;
import com.korit.team_ljco.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes") // 앞에 / 추가
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    // 레시피 목록 조회 컨트롤러
    @GetMapping
    public List<RecipeListResponse> getAllRecipes(
            @RequestParam(defaultValue = "1") int page,
            // int -> Long으로 변경하여 더 큰 범위를 수용하고 DB 타입과 맞춥니다.
            @RequestParam(required = false, defaultValue = "0") Long userId) {
        return recipeService.findRecipes(page, userId);
    }

    @GetMapping("/MatchRate")
    public List<RecipeCountRow> getMatchRate(
            @RequestParam(required = false, defaultValue = "0") Long userId,
            @RequestParam List<Integer> rcpIds) {
        return recipeService.findMateRate(userId, rcpIds);
    }
    // RecipeController.java
    @GetMapping("/search")
    public List<RecipeListResponse> searchRecipes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam Long userId, // 여기도 Long으로 변경
            @RequestParam String keyword) {

        return recipeService.searchRecipesByKeyword(page, userId, keyword);
    }

    // RecipeController.java 파일에 추가
    @GetMapping("/{rcpId}/steps")
    public List<RecipeStep> getRecipeSteps(@PathVariable Long rcpId) {
        return recipeService.getRecipeSteps(rcpId); // 서비스 호출
    }

}
