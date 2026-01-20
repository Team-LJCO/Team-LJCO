package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.*;
import com.korit.team_ljco.entity.Ingredient;
import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.RecipeIngredient;
import com.korit.team_ljco.entity.RecipeStep;
import com.korit.team_ljco.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    //전체 레시피 조회
    public List<RecipeListResponse> findRecipes(int page, int userId) {
        int pageSize = 10;
        int offset = (page - 1) * pageSize;

        //화면에 출력할것만
        return recipeMapper.getRecipes(pageSize, offset, userId);
    }

    // 검색 기능을 위한 메서드 추가
    public List<RecipeListResponse> searchRecipesByKeyword(int page, int userId, String keyword) {
        int pageSize = 10;
        int offset = (page - 1) * pageSize;

        // 우리가 Mapper에 새로 만든 메서드를 호출합니다.
        return recipeMapper.searchRecipesByKeyword(pageSize, offset, userId, keyword);
    }
    public List<RecipeCountRow> findMateRate(int userId, List<Integer> rcpIds) {
        List<RecipeCount> countAll =  recipeMapper.getMatchRate(userId,rcpIds);
        List<RecipeCountRow> recipeRowsList = new ArrayList<>();
        //내 재료 겹치는 개수, 재료 레시피 개수 구하기
        for(RecipeCount cnt : countAll) {
            int recipeCount = cnt.getRecipeCount();
            int myCount = cnt.getMyCount();

            int recipeMatchRate = (int) ((double) myCount / recipeCount * 100);

            RecipeCountRow recipeRow = RecipeCountRow.builder()
                    .rate(recipeMatchRate)
                    .build();
            recipeRowsList.add(recipeRow);
        }
        return  recipeRowsList;
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