package com.example.demo.common.components.interceptor;


import com.example.demo.common.components.security.JwtProvider;
import com.example.demo.common.config.WebMvcConfig;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;
import java.util.stream.Stream;

//DB에 token 여부 확인
@Component
@RequiredArgsConstructor
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {
    private final JwtProvider jwtProvider;
    private final UserRepository repository;

    //request
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        return Stream.of(request).map(jwtProvider::extractTokenFromHeader)
                .filter(i -> !i.equals("undefined"))
                .peek(token -> log.info("1. 인터셉터 토큰 로그 Bearer 포함 : {}",token))  //peek : consumer
                .map(token -> jwtProvider.getPayload(token).get("id", Long.class))
                .peek(id ->log.info("2. 인터셉터 사용자 id: {}",id))
                .anyMatch(repository::existsById);

//                .map(id-> repository.findById(id))
//                .peek(id ->log.info("2. 인터셉터 사용자 id: {}",id))
//                .findFirst().isPresent();

    }
    //response
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }
    //exception
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }

}
