package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientMatch {
    private Integer ingId;
    private String ingName;
    private Integer matchedIngId;
    private Integer redMatchedIng;
    private String matchedColor;
}
