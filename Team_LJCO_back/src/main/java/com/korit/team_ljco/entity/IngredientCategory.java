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
public class IngredientCategory {
    private Integer ingCatId;
    private String ingCatName;
    private String ingCatImgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
