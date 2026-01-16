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
public class RecipeStep {
    private Long stepId;
    private Long rcpId;
    private Integer stepNo;
    private String stepDesc;
    private String stepImgUrl;
    private LocalDateTime createdAt;
}