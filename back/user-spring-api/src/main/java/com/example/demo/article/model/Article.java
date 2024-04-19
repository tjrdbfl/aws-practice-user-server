package com.example.demo.article.model;
import com.example.demo.board.model.Board;
import com.example.demo.common.model.BaseEntity;
import com.example.demo.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
@ToString(exclude = {"id"})
@Entity(name = "articles")
@AllArgsConstructor
public class Article extends BaseEntity {
    @Id
    @Column(name = "article_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;



    @ManyToOne
    @JoinColumn(name = "writer_id")
    private User writer;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    public static Article of(String title, String content){
        Article article=new Article();
        article.title=title;
        article.content=content;

        return article;
    }

    @Builder(builderMethodName = "builder")
    public Article(Long id, String title, User writer, String content) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.content = content;

    }
}