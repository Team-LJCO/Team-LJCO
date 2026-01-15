package com.korit.team_ljco.dto;

import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.entity.RecipeIngredient;
import com.korit.team_ljco.entity.RecipeStep;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponse {
    
    private Long rcpId;
    private String rcpName;
    private String rcpDesc;
    private String rcpImgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int rcpViewCount;
    private int level;
    private List<RecipeIngredientDto> ingredients;
    private List<RecipeStepDto> steps;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecipeIngredientDto {
        private Long rcpIngId;
        private Integer ingId;
        private String ingName;
        private String ingImgUrl;
        private String rcpIngAmt;
        private Integer rcpIngOrd;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecipeStepDto {
        private Long stepId;
        private Integer stepNo;
        private String stepDesc;
        private String stepImgUrl;
    }

    public static RecipeResponse from(Recipe recipe) {
        return RecipeResponse.builder()
                .rcpId(recipe.getRcpId())
                .rcpName(recipe.getRcpName())
                .rcpImgUrl(recipe.getRcpImgUrl())
                .createdAt(recipe.getCreatedAt())
                .updatedAt(recipe.getUpdatedAt())
                .rcpViewCount(recipe.getRcpViewCount())
                .level(recipe.getLevel())
                .ingredients(recipe.getIngredients() != null ? 
                        recipe.getIngredients().stream()
                                .map(ri -> RecipeIngredientDto.builder()
                                        .rcpIngId(ri.getRcpIngId())
                                        .ingId(ri.getIngId())
                                        .ingName(ri.getIngredient() != null ? ri.getIngredient().getIngName() : null)
                                        .ingImgUrl(ri.getIngredient() != null ? ri.getIngredient().getIngImgUrl() : null)
                                        .rcpIngAmt(ri.getRcpIngAmt())
                                        .rcpIngOrd(ri.getRcpIngOrd())
                                        .build())
                                .collect(Collectors.toList()) : null)
                .steps(recipe.getSteps() != null ?
                        recipe.getSteps().stream()
                                .map(s -> RecipeStepDto.builder()
                                        .stepId(s.getStepId())
                                        .stepNo(s.getStepNo())
                                        .stepDesc(s.getStepDesc())
                                        .stepImgUrl(s.getStepImgUrl())
                                        .build())
                                .collect(Collectors.toList()) : null)
                .build();
    }
}
