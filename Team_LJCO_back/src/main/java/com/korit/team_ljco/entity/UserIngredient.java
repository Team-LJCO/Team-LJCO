package com.korit.team_ljco.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserIngredient {
    private Long userIngredientId;
    private Long userId;         // 누가 (FK)
    private Long ingredientId;   // 어떤 재료를 (FK)
    private LocalDateTime createdAt; // 언제 넣었는지
}