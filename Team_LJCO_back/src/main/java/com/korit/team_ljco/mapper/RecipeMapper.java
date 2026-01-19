package com.korit.team_ljco.mapper;

import com.korit.team_ljco.dto.RecipeCount;
import com.korit.team_ljco.dto.RecipeCountRow;
import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.RecipeIngredient;
import com.korit.team_ljco.entity.RecipeStep;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RecipeMapper {
    //메인 레시피 목록 조회
    //페이지 넘김을 고려한 pagesize 생성 => 서비스에서 계산함
    List<RecipeListResponse> getRecipes(@Param("pageSize") int pageSize,
                                        @Param("offset") int offset,
                                        @Param("userId") int userId);

    //일치율
    //한 사람에 대한 레시피라서 userid는 하나 rcpids는 여러개라 리스트
    List<RecipeCount> getMatchRate(@Param("userId") int userId,
                                    @Param("rcpIds") List<Integer> rcpIds);

    //며칠남았는지
    int getDaysLeft();

    //난이도
    int getLevel();

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