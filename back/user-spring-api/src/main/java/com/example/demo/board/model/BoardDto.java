package com.example.demo.board.model;

import com.example.demo.article.model.Article;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Log4j2
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String regDate;
    private String modDate;

    private List<Article> articles; // = new ArrayList<>()

}