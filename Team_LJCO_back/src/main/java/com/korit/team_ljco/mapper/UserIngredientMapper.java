package com.korit.team_ljco.mapper;

import com.korit.team_ljco.dto.IngredientByUserResponse;
import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.dto.UserIngredientResponse;
import com.korit.team_ljco.entity.UserIngredient;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserIngredientMapper {


    List<UserIngredientResponse> getMatchedRecipes(@Param("userId") Long userId,
                                                   @Param("limit") int limit);
    int countExpiredIngredients (@Param("userId") Long userId);

    List<UserIngredient> selectUserIngredients(Long userId);
    
    UserIngredient selectUserIngredientById(Long userIngId);
    
    UserIngredient selectUserIngredientByUserAndIng(@Param("userId") Long userId, @Param("ingId") Integer ingId);
    
    // 사용자 재료 등록/수정/삭제
    int insertUserIngredient(UserIngredient userIngredient);
    
    int updateUserIngredient(UserIngredient userIngredient);
    
    int deleteUserIngredient(Long userIngId);
    
    int deleteUserIngredientsByUser(Long userId);
    
    // 사용자 재료 통계
    int countUserIngredients(Long userId);

    // 선택 재료 추가
    int insertIngredientsByNames(
            @Param("userId") Long userId,
            @Param("ingredientNames") List<String> ingredientNames
    );

    // 선택 재료 삭제
    int deleteIngredientsByNames(@Param("userId") Long userId, @Param("ingredientNames") List<String> ingredientNames);

}
