package com.example.demo.board;

import com.example.demo.board.model.BoardDto;
import com.example.demo.board.service.BoardService;
import com.example.demo.board.service.BoardServiceImpl;
import com.example.demo.common.components.Messenger;
import com.example.demo.common.components.PageRequestVo;
import com.example.demo.user.model.UserDto;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/boards")
@Slf4j
public class BoardController {

    private final BoardServiceImpl service;


    @SuppressWarnings("static-access")
    @PostMapping( "/save")
    public ResponseEntity<Messenger> save(@RequestBody BoardDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.save(dto));

    }

    @GetMapping("/list") //all-users
    public ResponseEntity<List<BoardDto>> findAll() {
        log.info("입력받은 정보 : {}" );
        return ResponseEntity.ok(service.findAll());
    }
    @PutMapping("/modify")
    public ResponseEntity<Messenger> modify(@RequestBody BoardDto param) {
        log.info("입력받은 정보 : {}", param );
        return ResponseEntity.ok(service.modify(param));
    }

    @GetMapping("/detail")
    public ResponseEntity<BoardDto> findById(@RequestParam Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.findById(id).orElseGet(BoardDto::new));
    }


    @DeleteMapping("/delete")
    public ResponseEntity<Messenger> deleteById(@RequestParam Long id) {
        log.info("입력받은 정보 : {}", id );
        service.deleteById(id);
        return ResponseEntity.ok(service.deleteById(id));
    }


    @GetMapping("/count")
        public ResponseEntity<Messenger> count()  {
        return ResponseEntity.ok(service.count());
    }
    @GetMapping("/exists/{id}")
    public ResponseEntity<Messenger> existsById(PageRequestVo vo){
        service.existById(0L);
        return ResponseEntity.ok(new Messenger());
    }
}