[1mdiff --git a/Team_LJCO_back/src/main/java/com/korit/team_ljco/controller/RecipeController.java b/Team_LJCO_back/src/main/java/com/korit/team_ljco/controller/RecipeController.java[m
[1mindex 800b923..4446e5c 100644[m
[1m--- a/Team_LJCO_back/src/main/java/com/korit/team_ljco/controller/RecipeController.java[m
[1m+++ b/Team_LJCO_back/src/main/java/com/korit/team_ljco/controller/RecipeController.java[m
[36m@@ -19,27 +19,11 @@[m [mpublic class RecipeController {[m
     @GetMapping[m
     public List<RecipeListResponse> getAllRecipes([m
             @RequestParam(defaultValue = "1") int page,[m
[31m-            // int -> Long으로 변경하여 더 큰 범위를 수용하고 DB 타입과 맞춥니다.[m
[31m-            @RequestParam(required = false, defaultValue = "0") Long userId) {[m
[31m-[m
[31m-        return recipeService.findRecipes(page, userId);[m
[31m-    }[m
[31m-[m
[31m-    @GetMapping("/MatchRate")[m
[31m-    public List<RecipeCountRow> getMatchRate([m
             @RequestParam(required = false, defaultValue = "0") Long userId,[m
[31m-            @RequestParam List<Integer> rcpIds) {[m
[31m-        return recipeService.findMateRate(userId, rcpIds);[m
[32m+[m[32m            @RequestParam(required = false) String keyword) {[m
[32m+[m[32m        return recipeService.findRecipes(page, userId,keyword);[m
     }[m
[31m-    // RecipeController.java[m
[31m-    @GetMapping("/search")[m
[31m-    public List<RecipeListResponse> searchRecipes([m
[31m-            @RequestParam(defaultValue = "1") int page,[m
[31m-            @RequestParam Long userId, // 여기도 Long으로 변경[m
[31m-            @RequestParam String keyword) {[m
 [m
[31m-        return recipeService.searchRecipesByKeyword(page, userId, keyword);[m
[31m-    }[m
 [m
     // RecipeController.java 파일에 추가[m
     @GetMapping("/{rcpId}/steps")[m
[1mdiff --git a/Team_LJCO_back/src/main/java/com/korit/team_ljco/dto/RecipeListResponse.java b/Team_LJCO_back/src/main/java/com/korit/team_ljco/dto/RecipeListResponse.java[m
[1mindex 53ac906..eb60fd6 100644[m
[1m--- a/Team_LJCO_back/src/main/java/com/korit/team_ljco/dto/RecipeListResponse.java[m
[1m+++ b/Team_LJCO_back/src/main/java/com/korit/team_ljco/dto/RecipeListResponse.java[m
[36m@@ -1,6 +1,5 @@[m
 package com.korit.team_ljco.dto;[m
 [m
[31m-import com.korit.team_ljco.entity.RecipeIngredient;[m
 import com.korit.team_ljco.entity.RecipeIngredientMatch;[m
 import lombok.AllArgsConstructor;[m
 import lombok.Builder;[m
[1mdiff --git a/Team_LJCO_back/src/main/java/com/korit/team_ljco/mapper/RecipeMapper.java b/Team_LJCO_back/src/main/java/com/korit/team_ljco/mapper/RecipeMapper.java[m
[1mindex 4838822..1397739 100644[m
[1m--- a/Team_LJCO_back/src/main/java/com/korit/team_ljco/mapper/RecipeMapper.java[m
[1m+++ b/Team_LJCO_back/src/main/java/com/korit/team_ljco/mapper/RecipeMapper.java[m
[36m@@ -20,10 +20,12 @@[m [mpublic interface RecipeMapper {[m
                                         @Param("offset") int offset,[m
                                         @Param("userId") Long userId);[m
 [m
[31m-    //일치율[m
[31m-    //한 사람에 대한 레시피라서 userid는 하나 rcpids는 여러개라 리스트[m
[31m-    List<RecipeCount> getMatchRate(@Param("userId") Long userId,[m
[31m-                                    @Param("rcpIds") List<Integer> rcpIds);[m
[32m+[m
[32m+[m[32m    List<RecipeListResponse> getRecipesByKeyword(@Param("pageSize") int pageSize,[m
[32m+[m[32m                                        @Param("offset") int offset,[m
[32m+[m[32m                                        @Param("userId") Long userId,[m
[32m+[m[32m                                        @Param("keyword") String keyword);[m
[32m+[m
 [m
     //며칠남았는지[m
     int getDaysLeft();[m
[1mdiff --git a/Team_LJCO_back/src/main/java/com/korit/team_ljco/service/RecipeService.java b/Team_LJCO_back/src/main/java/com/korit/team_ljco/service/RecipeService.java[m
[1mindex 9996f1d..064faa4 100644[m
[1m--- a/Team_LJCO_back/src/main/java/com/korit/team_ljco/service/RecipeService.java[m
[1m+++ b/Team_LJCO_back/src/main/java/com/korit/team_ljco/service/RecipeService.java[m
[36m@@ -8,7 +8,6 @@[m [mimport lombok.extern.slf4j.Slf4j;[m
 import org.springframework.stereotype.Service;[m
 import org.springframework.transaction.annotation.Transactional;[m
 [m
[31m-import java.util.ArrayList;[m
 import java.util.List;[m
 import java.util.Map;[m
 import java.util.stream.Collectors;[m
[36m@@ -33,12 +32,16 @@[m [mpublic class RecipeService {[m
     }[m
 [m
     //전체 레시피 조회[m
[31m-    public List<RecipeListResponse> findRecipes(int page, Long userId) {[m
[32m+[m[32m    public List<RecipeListResponse> findRecipes(int page, Long userId,String keyword) {[m
         int pageSize = 10;[m
         int offset = (page - 1) * pageSize;[m
[32m+[m[32m        List<RecipeListResponse> recipesList;[m
 [m
[31m-        //화면에 출력할것만[m
[31m-        List<RecipeListResponse> recipesList = recipeMapper.getRecipes(pageSize, offset, userId);[m
[32m+[m[32m        if (keyword == null || keyword.isEmpty()) {[m
[32m+[m[32m            recipesList = recipeMapper.getRecipes(pageSize, offset, userId);[m
[32m+[m[32m        } else {[m
[32m+[m[32m            recipesList = recipeMapper.getRecipesByKeyword(pageSize, offset, userId, keyword);[m
[32m+[m[32m        }[m
 [m
         for (RecipeListResponse r : recipesList) {[m
             List<RecipeIngredientMatch> ingredients = r.getIngredients();[m
[36m@@ -57,41 +60,13 @@[m [mpublic class RecipeService {[m
                 }[m
 [m
             }[m
[31m-            int total=recipesList.size();[m
[32m+[m[32m            int total=ingredients.size();[m
             int rate = (int)(total == 0 ? 0 : (count * 100.0) / total) ;[m
             r.setMatchRate(rate);[m
         }[m
[31m-[m
[31m-[m
         return recipesList;[m
[31m-[m
[31m-[m
     }[m
 [m
[31m-    // 검색 기능을 위한 메서드 추가[m
[31m-    public List<RecipeListResponse> searchRecipesByKeyword(int page, Long userId, String keyword) {[m
[31m-        int pageSize = 10;[m
[31m-        int offset = (page - 1) * pageSize;[m
[31m-[m
[31m-        return recipeMapper.searchRecipesByKeyword(pageSize, offset, userId, keyword);[m
[31m-    }[m
[31m-    public List<RecipeCountRow> findMateRate(Long userId, List<Integer> rcpIds) {[m
[31m-        List<RecipeCount> countAll =  recipeMapper.getMatchRate(userId,rcpIds);[m
[31m-        List<RecipeCountRow> recipeRowsList = new ArrayList<>();[m
[31m-        //내 재료 겹치는 개수, 재료 레시피 개수 구하기[m
[31m-        for(RecipeCount cnt : countAll) {[m
[31m-            int recipeCount = cnt.getRecipeCount();[m
[31m-            int myCount = cnt.getMyCount();[m
[31m-[m
[31m-            int recipeMatchRate = (int) ((double) myCount / recipeCount * 100);[m
[31m-[m
[31m-            RecipeCountRow recipeRow = RecipeCountRow.builder()[m
[31m-                    .rate(recipeMatchRate)[m
[31m-                    .build();[m
[31m-            recipeRowsList.add(recipeRow);[m
[31m-        }[m
[31m-        return  recipeRowsList;[m
[31m-    }[m
 [m
     /**[m
      * 레시피 검색[m
[1mdiff --git a/Team_LJCO_back/src/main/resources/mapper/RecipeMapper.xml b/Team_LJCO_back/src/main/resources/mapper/RecipeMapper.xml[m
[1mindex f2ec583..6bfa1b3 100644[m
[1m--- a/Team_LJCO_back/src/main/resources/mapper/RecipeMapper.xml[m
[1m+++ b/Team_LJCO_back/src/main/resources/mapper/RecipeMapper.xml[m
[36m@@ -102,6 +102,35 @@[m
         and DATEDIFF(CURRENT_DATE, ui2.created_at) >= 15;[m
     </select>[m
 [m
[32m+[m[32m    <select id="getRecipesByKeyword" resultMap="RecipeListMap">[m
[32m+[m[32m        SELECT[m
[32m+[m[32m            r.rcp_id,[m
[32m+[m[32m            r.rcp_name,[m
[32m+[m[32m            r.rcp_img_url,[m
[32m+[m[32m            r.rcp_view_count,[m
[32m+[m[32m            r.level,[m
[32m+[m[32m            i.ing_id,[m
[32m+[m[32m            ui.ing_id as matched_ing_id,[m
[32m+[m[32m            ui2.ing_id as redmatched_ing[m
[32m+[m[32m        from ([m
[32m+[m[32m        select rcp_id, rcp_name, rcp_img_url, rcp_view_count,level[m
[32m+[m[32m        from rcp[m
[32m+[m[32m        where rcp_name like concat('%', #{keyword}, '%')[m
[32m+[m[32m        limit #{pageSize} offset #{offset}[m
[32m+[m[32m        ) r[m
[32m+[m[32m        join rcp_ing ri[m
[32m+[m[32m            on ri.rcp_id = r.rcp_id[m
[32m+[m[32m        join ingredients i[m
[32m+[m[32m            on i.ing_id = ri.ing_id[m
[32m+[m[32m        left join user_ingredients ui[m
[32m+[m[32m            on ui.user_id = #{userId}[m
[32m+[m[32m            and ui.ing_id = ri.ing_id[m
[32m+[m[32m        left join user_ingredients ui2[m
[32m+[m[32m            on ui2.user_id = #{userId}[m
[32m+[m[32m            and ui2.ing_id = ri.ing_id[m
[32m+[m[32m            and DATEDIFF(CURRENT_DATE, ui2.created_at) >= 15;[m
[32m+[m[32m    </select>[m
[32m+[m
     <!-- selectRecipeById 쿼리 추가 (누락되어 있었음!) -->[m
     <select id="selectRecipeById" parameterType="long" resultMap="RecipeResultMap">[m
         SELECT[m
[36m@@ -282,24 +311,6 @@[m
         GROUP BY ri.rcp_id[m
         ) user_counts ON recipe_counts.rcp_id = user_counts.rcp_id[m
     </select>[m
[31m-    <select id="searchRecipesByKeyword" resultMap="RecipeListWithIngredientsMap">[m
[31m-        SELECT[m
[31m-        r.rcp_id, r.rcp_name, r.rcp_img_url, r.rcp_view_count, r.level,[m
[31m-        i.ing_id, i.ing_name,[m
[31m-        /* 💡 추가된 부분: 사용자의 냉장고와 대조하여 D-Day 계산 */[m
[31m-        DATEDIFF(CURRENT_TIMESTAMP, ui.created_at) AS d_day,[m
[31m-        CASE WHEN ui.user_ing_id IS NOT NULL THEN 1 ELSE 0 END AS has_ing[m
[31m-        FROM ([m
[31m-        SELECT rcp_id, rcp_name, rcp_img_url, rcp_view_count, level[m
[31m-        FROM rcp[m
[31m-        WHERE rcp_name LIKE CONCAT('%', #{keyword}, '%')[m
[31m-        ORDER BY rcp_id DESC[m
[31m-        LIMIT #{pageSize} OFFSET #{offset}[m
[31m-        ) r[m
[31m-        LEFT JOIN rcp_ing ri ON r.rcp_id = ri.rcp_id[m
[31m-        LEFT JOIN ingredients i ON ri.ing_id = i.ing_id[m
[31m-        /* 💡 사용자의 냉장고 재료와 조인 */[m
[31m-        LEFT JOIN user_ingredients ui ON i.ing_id = ui.ing_id AND ui.user_id = #{userId}[m
[31m-        ORDER BY r.rcp_id DESC[m
[31m-    </select>[m
[32m+[m
[32m+[m
 </mapper>[m
\ No newline at end of file[m
