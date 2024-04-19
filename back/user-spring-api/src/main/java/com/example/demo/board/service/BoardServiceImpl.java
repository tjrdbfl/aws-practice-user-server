package com.example.demo.board.service;

import com.example.demo.board.model.Board;
import com.example.demo.board.model.BoardDto;
import com.example.demo.board.repository.BoardRepository;
import com.example.demo.common.components.Messenger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository repository;

    @Override
    public Messenger save(BoardDto t) {
        entityToDto((repository.save(dtoToEntity(t))));
        return new Messenger();
    }
    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder()
                .message(repository.findById(id).isEmpty() ? "SUCCESS":"FAILURE")
                .build();
    }
    @Override
    public Messenger modify(BoardDto boardDto) {
        Board board=repository.findById(boardDto.getId()).get();
        board.setTitle(boardDto.getTitle());
        board.setDescription(board.getDescription());
        repository.save(board);
        return new Messenger();
    }
    @Override
    public List<BoardDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<BoardDto> findById(Long id) {
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
}