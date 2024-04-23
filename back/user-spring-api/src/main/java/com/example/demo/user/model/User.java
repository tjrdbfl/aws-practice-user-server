package com.example.demo.user.model;

import com.example.demo.article.model.Article;
import com.example.demo.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
@ToString(exclude = "article")
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String job;
    private String token;

    //부모가 바뀌면 자식도 바뀌게 한다.
    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Article> article;

    @Builder(builderMethodName = "builder")
    public User(Long id, String username, String password,
                String name, String phone, String job) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.job = job;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}