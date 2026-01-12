package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredient {
    private Long recipeIngredientId;
    private Long recipeId;      // 레시피 번호 (FK)
    private Long ingredientId;  // 재료 번호 (FK)
}