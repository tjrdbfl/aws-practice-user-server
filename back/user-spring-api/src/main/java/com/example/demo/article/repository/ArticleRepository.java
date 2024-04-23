package com.example.demo.article.repository;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {
    //JPQL Default
    @Query("select a from articles a where a.board.id = :boardId")
    public List<Article> getArticlesByBoardId(@Param("boardId") Long boardId);

    //Native(알기만 하기, 비추)
    @Query(value="select * from articles a where a.board.id = boardId",nativeQuery=true)
    public List<Map<String,Object>> getQnaArticles(@Param("boardId") Long boardId);


    //JSON return type DTO
    String articleDtoMapping="new com.example.demo.article.model.ArticleDto("+
            "a.id,a.title,a.content,a.writer.id,a.board.id,a.regDate,a.modDate)";
    @Query("SELECT "+articleDtoMapping+" FROM articles a WHERE a.board.id= : boardId")
    public List<ArticleDto> getArticleDtoByBoardId(@Param("boardId") Long boardId);
}