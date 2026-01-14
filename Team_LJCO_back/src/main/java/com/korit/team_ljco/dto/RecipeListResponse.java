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
    //목록 화면에 내려줄 형태

    private Long rcpId;
    private String rcpName;
    private String rcpImgUrl;
    private Integer rcpViewCount;
    private Integer level;
}
