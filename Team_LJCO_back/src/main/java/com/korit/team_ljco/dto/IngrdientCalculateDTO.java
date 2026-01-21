package com.korit.team_ljco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngrdientCalculateDTO {
    int ingId;
    boolean isMatched;
    boolean isExpired;
}
