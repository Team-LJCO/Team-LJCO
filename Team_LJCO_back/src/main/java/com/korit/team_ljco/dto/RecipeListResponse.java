package com.korit.team_ljco.dto;

import com.korit.team_ljco.entity.RecipeIngredientMatch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeListResponse {
    //레시피 화면 목록 내려줄 형태
    private Long rcpId;
    private String rcpName;
    private String rcpImgUrl;
    private Integer rcpViewCount;

    //난이도 출력
    private Integer level;
    private int matchRate;
    private Integer totalCount;


    private List<RecipeIngredientMatch> ingredients;


}
