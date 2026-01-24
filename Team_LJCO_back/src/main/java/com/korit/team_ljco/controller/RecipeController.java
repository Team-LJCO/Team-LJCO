package com.korit.team_ljco.controller;
import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.dto.RecipePageResponseDTO;
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
    public RecipePageResponseDTO getAllRecipes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "0") Long userId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "VIEW_DESC") String sort) {
        return recipeService.findRecipes(page, userId,keyword,sort);
    }


    // RecipeController.java 파일에 추가
    @GetMapping("/{rcpId}/steps")
    public List<RecipeStep> getRecipeSteps(@PathVariable Long rcpId) {
        return recipeService.getRecipeSteps(rcpId); // 서비스 호출
    }

}
