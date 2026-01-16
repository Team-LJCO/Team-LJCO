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
public class RecipeIngredient {
    private Long rcpIngId;
    private Long rcpId;
    private Integer ingId;
    private String rcpIngAmt;
    private Integer rcpIngOrd;
    private LocalDateTime createdAt;

    // 재료 정보 (JOIN용)
    private Ingredient ingredient;

    // 간단한 재료 정보 (화면 출력용)
    private String ingName;
    private String ingImgUrl;
}