package com.korit.team_ljco.mapper;

import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.RecipeStep;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RecipeMapper {
    //메인 레시피 목록 조회
    //페이지 넘김을 고려한 pagesize 생성 => 서비스에서 계산함
    List<RecipeListResponse> getRecipes(@Param("pageSize") int pageSize,
                                        @Param("offset") int offset,
                                        @Param("userId") Long userId,
                                        @Param("sort") String sort);


    List<RecipeListResponse> getRecipesByKeyword(@Param("pageSize") int pageSize,
                                        @Param("offset") int offset,
                                        @Param("userId") Long userId,
                                        @Param("keyword") String keyword,
                                        @Param("sort") String sort);

    // 레시피 조회
    Recipe selectRecipeById(Long rcpId);

    List<Recipe> selectAllRecipes();

    List<Recipe> searchRecipesByName(@Param("keyword") String keyword);

    // 레시피 수정/삭제
    int updateRecipe(Recipe recipe);

    int deleteRecipe(Long rcpId);

    // 레시피 재료/단계 삭제
    int deleteRecipeIngredients(Long rcpId);

    int deleteRecipeSteps(Long rcpId);

    // 레시피 조리 단계 조회
    List<RecipeStep> selectRecipeSteps(Long rcpId);
}

