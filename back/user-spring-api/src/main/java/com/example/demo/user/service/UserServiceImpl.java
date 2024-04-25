package com.example.demo.user.service;

import com.example.demo.common.components.security.JwtProvider;
import com.example.demo.common.components.Messenger;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor //흐름 제어
@Slf4j
//Impl은 자신의 로직만 실행
// => Ioc : 프로그램의 제어 흐름을 외부에 의해 관리 당하는 것
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final JwtProvider jwtProvider;
    @Override
    public Messenger save(UserDto t) {
        var ent=repository.save(dtoToEntity(t));
        return Messenger.builder()
                .message((ent instanceof User)?"SUCCESS":"FAILURE")
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
    public Messenger modify(UserDto t) {
        var user = repository.findById(t.getId()).get();
        user.setPassword(t.getPassword());
        user.setPhone(t.getPhone());
        user.setJob(t.getJob());
        repository.save(user);
        return Messenger.builder()
                .message("회원정보 수정 성공"+t.getName())
                .build();
    }
    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).stream().map(i->entityToDto(i)).findAny();
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
    public List<UserDto> findUsersByJob(String job) {
        return repository.findByJob(job).stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public List<UserDto> findUsersByName(String name) {
        return repository.findByName(name).stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Boolean logout(String accessToken) {
        String splitToken = accessToken.substring(7);

        Long id = jwtProvider.getPayload(splitToken).get("id", Long.class);

        User user = repository.findById(id).orElseThrow();

        user.setToken(null);

        repository.save(user);

        return true;

    }

    //SRP 에 따라 아이디 존재 여부를 프론트에서 먼저 판단하고, 넣어옴 (시큐리티 )
    @Transactional
    @Override
    public Messenger login(UserDto param) {
        var user = repository.findByUsername(param.getUsername());

        if (user.isEmpty()) {
            return Messenger.builder()
                    .status(404)
                    .message("FAILURE")
                    .accessToken("None")
                    .build();
        }
        else{
            var accessToken = jwtProvider.createToken(user.get());
            repository.modifyTokenById(accessToken, user.get().getId());

            var users = user.get();

            jwtProvider.printPayload(accessToken);

            return users.getPassword().equals(param.getPassword()) ?
                    Messenger.builder()
                            .status(200)
                            .accessToken(accessToken)
                            .message("SUCCESS")
                            .build() :
                    Messenger.builder()
                            .status(404)
                            .message("ADMIN")
                            .build();
        }

        }


    @Override
    public Messenger existsUsername(String username) {
        return repository.existsByUsername(username)>0 ?
                Messenger.builder()
                        .status(200)
                        .message("SUCCESS")
                        .build() :
                Messenger.builder()
                        .status(404)
                        .message("FAILURE")
                        .build();
    }


}