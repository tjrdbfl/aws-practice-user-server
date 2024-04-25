package com.example.demo.article.service;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.repository.ArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ArticleServiceImplTest {
    private static Article testArticle;
    private ArticleService service;
    @Mock
    private ArticleRepository articleRepository;

    @BeforeEach
    void setUp() {
//        testArticle = Article.of("테스트 제목", "테스트 내용");
//        this.service = new ArticleServiceImpl(articleRepository);
//        articleRepository.save(testArticle);
    }

    @BeforeEach
    void init() {
        testArticle = Article.of("테스트 제목", "테스트 내용");
    }

    @Test
    public void 게시글_제목_검색() throws Exception {
        // Given
//        articleRepository.save(testArticle);

        // when
        Article article = articleRepository.findById(1L).get();

        // Then
        assertThat(article.getTitle())
                .isEqualTo("테스트 제목");
    }

    @Test
    public void 게시글_전체_검색() throws Exception {
        List<Article> articles = getList();
        BDDMockito.given(articleRepository.findAll()).willReturn(articles);
        List<ArticleDto> list = service.findAll();
        assertThat(list.size())
                .isEqualTo(3);
    }

    private List<Article> getList() {
        return Arrays.asList(
                Article.builder().id(1L).title("유관순").content("유관순은 3.1 운동 주역이었다.").build(),
                Article.builder().id(2L).title("김구").content("김구는 임시정부 주역이었다").build(),
                Article.builder().id(3L).title("윤봉길").content("윤봉길은 독립운동가이다.").build()

        );
    }
}