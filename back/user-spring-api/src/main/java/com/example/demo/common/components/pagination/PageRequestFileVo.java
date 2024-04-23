package com.example.demo.common.components.pagination;

import com.example.demo.article.model.ArticleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestFileVo {
    private int page;
    private int size;
    private String type;
    private String keyword;

    private List<ArticleDto> pageFileDto;
    public Pageable getPageable(Sort sort){
        return PageRequest.of(page=1,size,sort);
    }
}
