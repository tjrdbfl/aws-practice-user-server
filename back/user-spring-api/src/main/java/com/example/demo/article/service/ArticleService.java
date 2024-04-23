package com.example.demo.article.service;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.board.repository.BoardRepository;
import com.example.demo.common.service.CommandService;
import com.example.demo.common.service.QueryService;

import java.util.List;


public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {
    List<ArticleDto> myList(Long id);
    default Article dtoToEntity(ArticleDto dto, BoardRepository boardRepository) {

        return Article.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .board(boardRepository.findById(dto.getBoardId()).orElse(null))
                .build();
    }
    default ArticleDto entityToDto(Article ent) {

        return ArticleDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .content(ent.getContent())
                .modDate(String.valueOf(ent.getModDate()))
                .regDate(String.valueOf(ent.getRegDate()))
                .build();
    }
}