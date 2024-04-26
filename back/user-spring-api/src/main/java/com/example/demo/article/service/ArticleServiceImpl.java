package com.example.demo.article.service;


import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.repository.ArticleRepository;
import com.example.demo.board.model.Board;
import com.example.demo.board.repository.BoardRepository;
import com.example.demo.common.components.Messenger;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository repository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Override
    public Messenger save(ArticleDto t) {
//        Article ent = repository.save(dtoToEntity(t, boardRepository));
//        return Messenger.builder()
//                .message(ent instanceof Article ? "SUCCESS" : "FAILURE")
//                .id(ent.getBoard().getId())
//                .build();
        User user = userRepository.findById(t.getWriterId()).orElseThrow(() -> new IllegalArgumentException("userID " + t.getWriterId() + " x"));
        Board board = boardRepository.findById(t.getBoardId()).orElseThrow(()-> new IllegalArgumentException("boardId" + t.getBoardId() + " x"));
        Article article = Article.builder()
                .title(t.getTitle())
                .content(t.getContent())
                .writer(user)
                .board(board)
                .build();
        repository.save(article);
        return Messenger.builder()
                .message("SUCCESS")
                .build();

    }

    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder()
                .message(repository.existsById(id) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public Messenger modify(ArticleDto articleDto) {
        Optional<Article> article = repository.findById(articleDto.getId());

        if (article.isEmpty()) {
            return Messenger.builder()
                    .message("FAILURE")
                    .build();
        }

        article.get().setTitle(articleDto.getTitle());
        article.get().setContent(articleDto.getContent());
        repository.save(article.get());
        return Messenger.builder()
                .message("SUCCESS")
                .build();

    }

    @Override
    public List<ArticleDto> findAll() {
        return repository.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        return repository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }

    @Override
    public Messenger count() {
        return Messenger.builder()
                .message(repository.count() + "")
                .build();
    }

    @Override
    public Boolean existById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public List<ArticleDto> myList(Long id) {
//        return repository.findAllByBoardId(id)
//                .stream().map(i -> entityToDto(i))
//                .toList();
        return repository.getArticlesByBoardId(id);
    }

}