package com.korit.team_ljco.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // [중요] 여기가 핵심입니다! (1:N 연결)
    // DB의 category_id 컬럼과 연결됩니다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // 생성 전 시간 자동 저장
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}