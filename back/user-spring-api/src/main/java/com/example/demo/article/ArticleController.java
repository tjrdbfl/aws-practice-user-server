package com.example.demo.article;

import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.service.ArticleService;
import com.example.demo.article.service.ArticleServiceImpl;
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

@CrossOrigin(origins = "*", allowedHeaders = "*") // 기존에 origins = http://localhost:3000 이던걸 보안 걸었음. 퍼사드 패턴
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/articles")
@Slf4j
public class ArticleController {
    private final ArticleServiceImpl service;

    @SuppressWarnings("static-access")
    @PostMapping( "/save")
    public ResponseEntity<Messenger> save(@RequestBody ArticleDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.save(dto));

    }
    @PutMapping("/modify")
    public ResponseEntity<Messenger> modify(@RequestBody ArticleDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.modify(dto));
    }
    @GetMapping("/list")
    public ResponseEntity<List<ArticleDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<ArticleDto> findById(@RequestParam Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.findById(id).orElseGet(ArticleDto::new));
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

    //id를 특정지을 수 없을 때는 @RequestParam("id") 로 명시
    @GetMapping("/myList")
    public ResponseEntity<List<ArticleDto>> myList(@RequestParam("id") Long id){
        return ResponseEntity.ok(service.myList(id));
    }
}