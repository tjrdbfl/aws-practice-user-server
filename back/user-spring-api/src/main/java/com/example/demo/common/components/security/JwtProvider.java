package com.example.demo.common.components.security;

import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Stream;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtProvider {
    @Value("${jwt.iss}")
    private String issuer;

    private final SecretKey secretKey;

    Instant expiredDate = Instant.now().plus(1, ChronoUnit.DAYS);


    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretKey));
    }

    public String createToken(User user) {

        String token = Jwts.builder()
                .issuer(issuer)
                .signWith(secretKey)
                .expiration(Date.from(expiredDate))
                .subject("james")
                .claim("username", user.getUsername())
                .claim("job", user.getJob())
                .claim("id", user.getId())
                .compact();


        log.info("로그인 성공으로 발급된 토큰 : "+token);
        return token;
    }

    public void printPayload(String accessToken) {
        // 토큰을 각 섹션(Header, Payload, Signature)으로 분할

        String[] chunks = accessToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        log.info(decoder.toString());

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        log.info("Token Header : " + header);
        log.info("Token payLoad : " + payload);
    }

    public String extractTokenFromHeader(HttpServletRequest request) {
        log.info("JwtProvider token에서 넘어온 request 값 : {}",request);
        String bearerToken=request.getHeader("Authorization");
        log.info("JwtProvider bearerToken : {}",bearerToken);
        return bearerToken!=null && bearerToken.startsWith("Bearer ")? bearerToken.substring(7):"undefined";
    }

    public Claims getPayload(String token){      //secretKey는 JwtProvider 에서만 다룰 수 있도록 한다
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception exception) {
            throw new RuntimeException("Failed to parse JWT token", exception);
        }
    }

//    public UserDto getUserDto(HttpServletRequest request){
//        User user= Stream.of(request).map(i->extractTokenFromHeader(i))
//                .filter(i -> !i.equals("undefined"))
//                .peek(token -> log.info("1. 인터셉터 토큰 로그 Bearer 포함 : {}",token))  //peek : consumer
//                .map(token -> getPayload(token).get("id", Long.class))
//                .peek(id ->log.info("2. 인터셉터 사용자 id: {}",id))
//                .anyMatch(repository::existsById)q
//        Optional<User> user=
//        ;
//    }
}
