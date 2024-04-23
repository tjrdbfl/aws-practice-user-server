package com.example.demo.article.service;


import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.repository.ArticleRepository;
import com.example.demo.board.repository.BoardRepository;
import com.example.demo.common.components.Messenger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository repository;
    private final BoardRepository boardRepository;

    @Override
    public Messenger save(ArticleDto t) {
        Article ent=repository.save(dtoToEntity(t, boardRepository));
        return Messenger.builder()
                .message(ent instanceof Article? "SUCCESS":"FAILURE")
                .build();
    }
    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder()
                .message(repository.findById(id).isEmpty() ? "SUCCESS":"FAILURE")
                .build();
    }
    @Override
    public Messenger modify(ArticleDto articleDto) {
        Article article=repository.findById(articleDto.getId()).get();
        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        repository.save(article);
        return new Messenger();
    }
    @Override
    public List<ArticleDto> findAll(){
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        return repository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }
    @Override
    public Messenger count() {
        return Messenger.builder()
                .message(repository.count()+"")
                .build();
    }
    @Override
    public Boolean existById(Long id) {
        return repository.existsById(id);
    }
    @Override
    public List<ArticleDto> myList(Long id) {
        //repository.findAllByBoardId(id) in ArticleRepository
        //: select * from articles where article.boardId=boardId
//        return repository.findAllByBoardId(id)
//                .stream().map(i -> entityToDto(i))
//                .toList();
        return repository.getArticlesByBoardId(id)
                .stream().map(i->entityToDto(i))
                .toList();
    }

}