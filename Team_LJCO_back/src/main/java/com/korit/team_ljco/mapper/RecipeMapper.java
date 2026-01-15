package com.korit.team_ljco.mapper;

import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.RecipeIngredient;
import com.korit.team_ljco.entity.RecipeStep;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RecipeMapper {

    // 레시피 조회
    Recipe selectRecipeById(Long rcpId);
    
    List<Recipe> selectAllRecipes();
    
    List<Recipe> searchRecipesByName(@Param("keyword") String keyword);


    
    // 레시피 등록/수정/삭제
    int insertRecipe(Recipe recipe);
    
    int updateRecipe(Recipe recipe);
    
    int deleteRecipe(Long rcpId);
    
    // 레시피 재료 조회
    List<RecipeIngredient> selectRecipeIngredients(Long rcpId);
    
    int insertRecipeIngredient(RecipeIngredient recipeIngredient);
    
    int deleteRecipeIngredients(Long rcpId);
    
    // 레시피 조리 단계 조회
    List<RecipeStep> selectRecipeSteps(Long rcpId);
    
    int insertRecipeStep(RecipeStep recipeStep);
    
    int deleteRecipeSteps(Long rcpId);
    
    // 추천 레시피 (사용자 재료 기반)
    List<Map<String, Object>> selectRecommendedRecipes(@Param("userId") Long userId);
    
    // 인기 레시피 (조회수 기준)
    List<Recipe> selectTopRecipesByViews(@Param("limit") int limit);
    
    // 조회수 증가
    int incrementViewCount(Long rcpId);
    
    // 전체 레시피 수
    int countAllRecipes();
}
