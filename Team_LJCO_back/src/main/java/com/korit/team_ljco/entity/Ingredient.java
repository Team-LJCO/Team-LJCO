package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {
    private Integer ingId;
    private String ingName;
    private Integer ingCatId;
    private String ingImgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private IngredientCategory category;
}

