package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.*;
import com.korit.team_ljco.entity.*;
import com.korit.team_ljco.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeMapper recipeMapper;
    public List<RecipeResponse> getAllRecipes() {
        List<Recipe> recipes = recipeMapper.selectAllRecipes();
        return recipes.stream()
                .map(RecipeResponse::from)
                .collect(Collectors.toList());
    }

    //페이징된 레시피 조회
    public RecipePageResponseDTO findRecipes(int page, Long userId, String keyword, String sort) {
        int pageSize = 9;
        int offset = (page - 1) * pageSize;
        List<RecipeListResponse> recipesList;

        if (keyword == null || keyword.isEmpty()) {
            recipesList = recipeMapper.getRecipes(pageSize, offset, userId, sort);
        } else {
            recipesList = recipeMapper.getRecipesByKeyword(pageSize, offset, userId, keyword, sort);
        }

        for (RecipeListResponse r : recipesList) {
            List<RecipeIngredientMatch> ingredients = r.getIngredients();
            int count = 0;

            for (RecipeIngredientMatch m : ingredients) {
                if (m.getMatchedIngId() == null) {
                    m.setMatchedColor("N");

                } else if (m.getMatchedIngId() != null) {
                    m.setMatchedColor("G");
                    count++;
                    if (m.getRedMatchedIng() != null) {
                        m.setMatchedColor("R");
                    }
                }

            }

        }

        int totalCount = recipesList.size() == 0 ? 0 : recipesList.get(0).getTotalCount();
        int totalPages = (int)Math.ceil(totalCount / pageSize);
        RecipePageResponseDTO RecipeDTO = RecipePageResponseDTO.builder()
                .recipes(recipesList)
                .page(page)
                .pageSize(pageSize)
                .totalCount(totalCount)
                .totalPages(totalPages)
                .build();

        return RecipeDTO;
    }


    /**
     * 레시피 삭제
     */
    @Transactional
    public void deleteRecipe(Long rcpId) {
        Recipe recipe = recipeMapper.selectRecipeById(rcpId);
        if (recipe == null) {
            throw new RuntimeException("레시피를 찾을 수 없습니다. ID: " + rcpId);
        }

        // 연관된 재료와 단계도 함께 삭제
        recipeMapper.deleteRecipeIngredients(rcpId);
        recipeMapper.deleteRecipeSteps(rcpId);
        recipeMapper.deleteRecipe(rcpId);
    }

    // RecipeService.java에 추가
    public List<Recipe> searchRecipesByName(String keyword) {
        return recipeMapper.searchRecipesByName(keyword);
    }

    public Recipe updateRecipeBasicInfo(Long rcpId, Recipe recipe) {
        Recipe existing = recipeMapper.selectRecipeById(rcpId);
        if (existing == null) {
            throw new RuntimeException("Recipe not found");
        }
        existing.setRcpName(recipe.getRcpName());
        existing.setRcpImgUrl(recipe.getRcpImgUrl());
        recipeMapper.updateRecipe(existing);
        return recipeMapper.selectRecipeById(rcpId);
    }

    public List<RecipeStep> getRecipeSteps(Long rcpId) {
        return recipeMapper.selectRecipeSteps(rcpId);
    }
}