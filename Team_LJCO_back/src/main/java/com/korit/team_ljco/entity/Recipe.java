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
public class Recipe {
    private Long recipeId;
    private String recipeName;   // DB: recipe_name
    private String description;
    private String imageUrl;     // DB: image_url
    private LocalDateTime createdAt;
}