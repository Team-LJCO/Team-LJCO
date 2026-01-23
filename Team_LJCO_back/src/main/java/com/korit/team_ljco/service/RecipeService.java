package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.*;
import com.korit.team_ljco.entity.*;
import com.korit.team_ljco.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeMapper recipeMapper;
    //일치율
    private Integer matchRate;

    //등록 후 경과일
    private Integer daysPassed;

    public List<RecipeResponse> getAllRecipes() {
        List<Recipe> recipes = recipeMapper.selectAllRecipes();
        return recipes.stream()
                .map(RecipeResponse::from)
                .collect(Collectors.toList());
    }

    //페이징된 레시피 조회
    public RecipePageResponseDTO findRecipes(int page, Long userId, String keyword) {
        int pageSize = 9;
        int offset = (page - 1) * pageSize;
        List<RecipeListResponse> recipesList;

        if (keyword == null || keyword.isEmpty()) {
            recipesList = recipeMapper.getRecipes(pageSize, offset, userId);
        } else {
            recipesList = recipeMapper.getRecipesByKeyword(pageSize, offset, userId, keyword);
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
            int total = ingredients.size();
            int rate = (int) (total == 0 ? 0 : (count * 100.0) / total);
            r.setMatchRate(rate);

        }

        int totalCount = recipesList.size() == 0 ? 0 : recipesList.get(0).getTotalCount();
        int totalPages = totalCount / pageSize;
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
     * 레시피 검색
     */
    public List<RecipeResponse> searchRecipes(String keyword) {
        List<Recipe> recipes = recipeMapper.searchRecipesByName(keyword);
        return recipes.stream()
                .map(RecipeResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 레시피 상세 조회 (ID로 조회)
     */
    public RecipeResponse getRecipeById(Long rcpId) {
        Recipe recipe = recipeMapper.selectRecipeById(rcpId);
        if (recipe == null) {
            throw new RuntimeException("레시피를 찾을 수 없습니다. ID: " + rcpId);
        }
        return RecipeResponse.from(recipe);
    }

    /**
     * 레시피 등록
     */
    @Transactional
    public RecipeResponse createRecipe(RecipeRequest request) {
        // 1. 레시피 기본 정보 저장
        Recipe recipe = Recipe.builder()
                .rcpName(request.getRcpName())
                .rcpImgUrl(request.getRcpImgUrl())
                .build();

        recipeMapper.insertRecipe(recipe);
        Long rcpId = recipe.getRcpId();

        // 2. 레시피 재료 저장
        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            for (RecipeRequest.RecipeIngredientDto ingDto : request.getIngredients()) {
                RecipeIngredient recipeIngredient = RecipeIngredient.builder()
                        .rcpId(rcpId)
                        .ingId(ingDto.getIngId())
                        .rcpIngAmt(ingDto.getRcpIngAmt())
                        .rcpIngOrd(ingDto.getRcpIngOrd())
                        .hasIng(ingDto.isHasIng())
                        .build();
                recipeMapper.insertRecipeIngredient(recipeIngredient);
            }
        }

        // 3. 레시피 조리 단계 저장
        if (request.getSteps() != null && !request.getSteps().isEmpty()) {
            for (RecipeRequest.RecipeStepDto stepDto : request.getSteps()) {
                RecipeStep recipeStep = RecipeStep.builder()
                        .rcpId(rcpId)
                        .stepNo(stepDto.getStepNo())
                        .stepDesc(stepDto.getStepDesc())
                        .stepImgUrl(stepDto.getStepImgUrl())
                        .build();
                recipeMapper.insertRecipeStep(recipeStep);
            }
        }

        // 4. 저장된 레시피 조회 후 반환
        return getRecipeById(rcpId);
    }

    /**
     * 레시피 수정
     */
    @Transactional
    public RecipeResponse updateRecipe(Long rcpId, RecipeRequest request) {
        // 기존 레시피 확인
        Recipe existingRecipe = recipeMapper.selectRecipeById(rcpId);
        if (existingRecipe == null) {
            throw new RuntimeException("레시피를 찾을 수 없습니다. ID: " + rcpId);
        }

        // 1. 레시피 기본 정보 수정
        Recipe recipe = Recipe.builder()
                .rcpId(rcpId)
                .rcpName(request.getRcpName())
                .rcpImgUrl(request.getRcpImgUrl())
                .build();
        recipeMapper.updateRecipe(recipe);

        // 2. 기존 재료 및 단계 삭제
        recipeMapper.deleteRecipeIngredients(rcpId);
        recipeMapper.deleteRecipeSteps(rcpId);

        // 3. 새로운 재료 저장
        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            for (RecipeRequest.RecipeIngredientDto ingDto : request.getIngredients()) {
                RecipeIngredient recipeIngredient = RecipeIngredient.builder()
                        .rcpId(rcpId)
                        .ingId(ingDto.getIngId())
                        .rcpIngAmt(ingDto.getRcpIngAmt())
                        .rcpIngOrd(ingDto.getRcpIngOrd())
                        .hasIng(ingDto.isHasIng())
                        .build();
                recipeMapper.insertRecipeIngredient(recipeIngredient);
            }
        }

        // 4. 새로운 조리 단계 저장
        if (request.getSteps() != null && !request.getSteps().isEmpty()) {
            for (RecipeRequest.RecipeStepDto stepDto : request.getSteps()) {
                RecipeStep recipeStep = RecipeStep.builder()
                        .rcpId(rcpId)
                        .stepNo(stepDto.getStepNo())
                        .stepDesc(stepDto.getStepDesc())
                        .stepImgUrl(stepDto.getStepImgUrl())
                        .build();
                recipeMapper.insertRecipeStep(recipeStep);
            }
        }

        return getRecipeById(rcpId);
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

    /**
     * 추천 레시피 조회 (사용자 재료 기반)
     */
    public List<Map<String, Object>> getRecommendedRecipes(Long userId) {
        return recipeMapper.selectRecommendedRecipes(userId);
    }

    /**
     * 인기 레시피 조회
     */
    public List<RecipeResponse> getPopularRecipes(int limit) {
        List<Recipe> recipes = recipeMapper.selectTopRecipesByViews(limit);
        return recipes.stream()
                .map(RecipeResponse::from)
                .collect(Collectors.toList());
    }

    /**
     * 레시피 총 개수
     */
    public int getTotalRecipeCount() {
        return recipeMapper.countAllRecipes();
    }

    public List<RecipeStep> getRecipeSteps(Long rcpId) {
        return recipeMapper.selectRecipeSteps(rcpId);
    }
}