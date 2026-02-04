package com.korit.team_ljco.service;

import com.korit.team_ljco.dto.FridgeHomeResponse;
import com.korit.team_ljco.dto.UserIngredientRequest;
import com.korit.team_ljco.dto.UserIngredientResponse;
import com.korit.team_ljco.entity.UserIngredient;
import com.korit.team_ljco.mapper.UserIngredientMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserIngredientService {

    private final UserIngredientMapper userIngredientMapper;

    /**
     * 사용자 보유 재료 전체 조회
     */
    public FridgeHomeResponse getUserIngredients(Long userId, int limit) {
        // ✅ 페이징 없이 전체 조회
        List<UserIngredient> userIngredients = userIngredientMapper.selectUserIngredients(userId);

        int expired15Count = userIngredientMapper.countExpiredIngredients(userId);
        List<UserIngredientResponse> userIngredientResponseList = userIngredientMapper.getMatchedRecipes(userId, limit);

        int totalCount = userIngredientResponseList.isEmpty() ? 0 : userIngredientResponseList.get(0).getTotalCount();

        return FridgeHomeResponse.builder()
                .userIngredientList(userIngredients)
                .expiredIngredientCount(expired15Count)
                .matchedRecipeCount(totalCount)
                .matchedRecipeList(userIngredientResponseList)
                .build();
    }

    /**
     * 사용자 재료 ID로 조회
     */
    public UserIngredient getUserIngredientById(Long userIngId) {
        UserIngredient userIngredient = userIngredientMapper.selectUserIngredientById(userIngId);
        if (userIngredient == null) {
            throw new RuntimeException("사용자 재료를 찾을 수 없습니다. ID: " + userIngId);
        }
        return userIngredient;
    }

    @Transactional
    public void useRecipeIngredients(Long userId, Long rcpId) {
        log.info("요리 완료로 인한 재료 차감 - 유저: {}, 레시피: {}", userId, rcpId);
        userIngredientMapper.deleteMatchingIngredients(userId, rcpId);
    }


    /**
     * 사용자 재료 등록
     */
    @Transactional
    public UserIngredient addUserIngredient(Long userId, UserIngredientRequest request) {
        UserIngredient existing = userIngredientMapper.selectUserIngredientByUserAndIng(userId, request.getIngId());
        if (existing != null) {
            throw new RuntimeException("이미 등록된 재료입니다.");
        }

        UserIngredient userIngredient = UserIngredient.builder()
                .userId(userId)
                .ingId(request.getIngId())
                .userIngAmt(request.getUserIngAmt())
                .build();

        userIngredientMapper.insertUserIngredient(userIngredient);
        return userIngredientMapper.selectUserIngredientById(userIngredient.getUserIngId());
    }

    /**
     * 사용자 선택 재료 추가
     */

    @Transactional
    public void addIngredientsByNames(Long userId, List<String> ingredientNames) {
        userIngredientMapper.insertIngredientsByNames(userId, ingredientNames);
    }

    /**
     * 사용자 재료 수정
     */
    @Transactional
    public UserIngredient updateUserIngredient(Long userIngId, UserIngredientRequest request) {
        UserIngredient existing = userIngredientMapper.selectUserIngredientById(userIngId);
        if (existing == null) {
            throw new RuntimeException("사용자 재료를 찾을 수 없습니다. ID: " + userIngId);
        }

        existing.setUserIngAmt(request.getUserIngAmt());
        userIngredientMapper.updateUserIngredient(existing);
        return userIngredientMapper.selectUserIngredientById(userIngId);
    }

    /**
     * 사용자 재료 삭제
     */
    @Transactional
    public void deleteUserIngredient(Long userIngId) {
        UserIngredient userIngredient = userIngredientMapper.selectUserIngredientById(userIngId);
        if (userIngredient == null) {
            throw new RuntimeException("사용자 재료를 찾을 수 없습니다. ID: " + userIngId);
        }
        userIngredientMapper.deleteUserIngredient(userIngId);
    }

     /** 사용자 선택 재료 삭제
     */
    @Transactional
    public void deleteIngredientsByNames(Long userId, List<String> ingredientNames) {
        userIngredientMapper.deleteIngredientsByNames(userId, ingredientNames);
    }

    /**
     * 사용자의 모든 재료 삭제
     */
    @Transactional
    public void deleteAllUserIngredients(Long userId) {
        userIngredientMapper.deleteUserIngredientsByUser(userId);
    }

    /**
     * 사용자 재료 개수
     */
    public int getUserIngredientCount(Long userId) {
        return userIngredientMapper.countUserIngredients(userId);
    }
}
