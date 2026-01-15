package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    private Long rcpId;
    private String rcpName;
    private String rcpImgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int rcpViewCount;
    private int level;

    private List<RecipeStep> steps;
    private List<RecipeIngredient> ingredients;
}