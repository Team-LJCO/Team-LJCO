package com.korit.team_ljco.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "categories") // DB 테이블 이름
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "emoji")
    private String emoji;

    @Column(name = "description")
    private String description;

    // 생성자 (필요시 사용)
    public Category(String name, String emoji, String description) {
        this.name = name;
        this.emoji = emoji;
        this.description = description;
    }
}