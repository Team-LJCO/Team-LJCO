package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.RecipeCount;
import com.korit.team_ljco.dto.RecipeCountRow;
import com.korit.team_ljco.dto.RecipeIngredientResponse;
import com.korit.team_ljco.dto.RecipeListResponse;
import com.korit.team_ljco.entity.Ingredient;
import com.korit.team_ljco.entity.Recipe;
import com.korit.team_ljco.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeMapper recipeMapper;
    //일치율
    private Integer matchRate;

    //등록 후 경과일
    private Integer daysPassed;


    //전체 레시피 조회
    public List<RecipeListResponse> findRecipes(int page) {
        int pageSize = 10;
        int offset = (page - 1) * pageSize;

        //화면에 출력할것만
        return recipeMapper.getRecipes(pageSize, offset);

    }

    public List<RecipeCountRow> findMateRate(int userId, List<Integer> rcpIds) {
        List<RecipeCount> countAll =  recipeMapper.getMatchRate(userId,rcpIds);
        List<RecipeCountRow> recipeRowsList = new ArrayList<>();
        //내 재료 겹치는 개수, 재료 레시피 개수 구하기
        for(RecipeCount cnt : countAll) {
            int recipeCount = cnt.getRecipeCount();
            int myCount = cnt.getMyCount();

            int recipeMatchRate = (int) ((double) myCount / recipeCount * 100);

            RecipeCountRow recipeRow = RecipeCountRow.builder()
                    .Rate(recipeMatchRate)
                    .build();
            recipeRowsList.add(recipeRow);
        }
        return  recipeRowsList;

    }
}




