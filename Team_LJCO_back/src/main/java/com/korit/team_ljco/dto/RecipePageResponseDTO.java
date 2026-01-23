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
public class RecipePageResponseDTO {
    List<RecipeListResponse> recipes;
    int page;
    int pageSize;
    int totalCount;
    int totalPages;
}
