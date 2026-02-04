package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientMatch {
    private Integer ingId;
    private String ingName;
    private Integer ingCatId; //
    private Integer matchedIngId;
    private LocalDate createdAt; //
    private Integer redMatchedIng;
    private String matchedColor;
}
