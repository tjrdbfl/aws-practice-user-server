package com.example.demo.article.model;

import lombok.*;
import lombok.extern.log4j.Log4j;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Component;

import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component // = Object와 느낌으로 다 줄 수 있는 것.
@NoArgsConstructor
@Data
@Builder
public class ArticleDto {
    private Long id;
    private String title;
    private String content;
    private Long writerId;
    private Long boardId;
    private LocalDateTime regDate;
    private LocalDateTime modDate;

    public ArticleDto(Long id, String title, String content, Long writerId, Long boardId, LocalDateTime regDate, LocalDateTime modDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.writerId = writerId;
        this.boardId = boardId;
        this.regDate = regDate;
        this.modDate = modDate;
    }
}