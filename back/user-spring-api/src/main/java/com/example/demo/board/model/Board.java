package com.example.demo.board.model;

import com.example.demo.article.model.Article;
import com.example.demo.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Setter
@Getter
@ToString(exclude = {"id","articles"})
@Entity(name="boards")
@Builder
public class Board extends BaseEntity {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "content")
    private String content;


    @OneToMany(mappedBy = "board" , fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Article> articles;

    @Builder(builderMethodName = "builder")
    public Board(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;

    }
}