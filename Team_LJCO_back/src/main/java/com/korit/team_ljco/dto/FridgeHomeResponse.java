package com.korit.team_ljco.dto;

import com.korit.team_ljco.entity.UserIngredient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FridgeHomeResponse {
    private List<UserIngredient> userIngredientList;
    private int expiredIngredientCount;
    private int matchedRecipeCount;
    private List<UserIngredientResponse> matchedRecipeList;
}
