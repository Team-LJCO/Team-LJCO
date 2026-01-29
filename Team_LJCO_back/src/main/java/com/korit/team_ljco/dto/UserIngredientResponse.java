package com.korit.team_ljco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserIngredientResponse {
    private Integer rcpId;
    private String rcpName;
    private String rcpImgUrl;
    private int rcpViewCount;
    private Integer level;
    private int totalCount;

    List<IngredientByUserResponse> userIngredients;

}
