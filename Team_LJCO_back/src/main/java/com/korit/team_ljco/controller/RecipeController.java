package com.korit.team_ljco.controller;

import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    //레시피 목록 조회 컨트롤러
    @GetMapping("/all")
    public List<RecipeListResponse> getAllRecipes(
            @RequestParam(defaultValue = "1" )int page, @RequestParam int userId) {
        return recipeService.findRecipes(page);
    }

}
