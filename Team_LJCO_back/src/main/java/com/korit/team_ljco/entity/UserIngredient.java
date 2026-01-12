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
public class UserIngredient {

    private Long userIngId;
    private Long userId;
    private Integer ingId;
    private String userIngAmt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Ingredient ingredient;
}
