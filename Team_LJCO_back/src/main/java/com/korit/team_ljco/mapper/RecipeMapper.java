//package com.korit.team_ljco.mapper;
//
//import com.korit.team_ljco.entity.Recipes;
//import org.apache.ibatis.annotations.Mapper;
//import org.apache.ibatis.annotations.Param;
//
//import java.util.List;
//import java.util.Map;
//
//@Mapper
//public interface RecipeMapper {
//    int countAll();
//    int insert(Recipes recipe);
//    int update(Recipes recipe);
//    int delete(int recipeId);
//    List<Map<String, Object>> findRecommendedRecipes(@Param("userId") Long userId);
//    Recipes findById(Long recipeId);
//    List<Recipes> findByNameContaining(@Param("keyword") String keyword);
//    List<Recipes> findTopByViewCount(@Param("limit") int limit);
//    int incrementViewCount(Long recipeId);
//}
