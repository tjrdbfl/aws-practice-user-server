package com.example.demo.board.service;

import com.example.demo.board.model.Board;
import com.example.demo.board.model.BoardDto;
import com.example.demo.common.service.CommandService;
import com.example.demo.common.service.QueryService;
public interface BoardService extends CommandService<BoardDto>, QueryService<BoardDto> {

    default Board dtoToEntity(BoardDto dto){

        return Board.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }
    // 엔티티를 dto로 바꾸는것
    default BoardDto entityToDto(Board ent){

        return BoardDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .description(ent.getDescription())
                .modDate(ent.getModDate())
                .regDate(ent.getRegDate())
                .build();
    }

}