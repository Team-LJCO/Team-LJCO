package com.korit.team_ljco.dto;

import com.korit.team_ljco.entity.RecipeIngredient;
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

    //필요한 재료 출력
    private List<RecipeIngredient> ingredients;

    //일치율
    private Integer matchRate;

    //등록 후 경과일
    private Integer daysPassed;


}
