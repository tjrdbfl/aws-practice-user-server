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
                .message(repository.existsById(id) ? "SUCCESS":"FAILURE")
                .build();
    }


    @Override
    public Messenger modify(UserDto t) {
        Optional<User> user = repository.findById(t.getId());

        if(user.isEmpty()){
            return Messenger.builder()
                    .message("FAILURE")
                    .build();
        }
        if(t.getPassword()!=null)
         user.get().setPassword(t.getPassword());
        if(t.getName()!=null)
            user.get().setName(t.getName());
        if(t.getPhone()!=null)
            user.get().setPhone(t.getPhone());
        if(t.getJob()!=null)
            user.get().setJob(t.getJob());
        repository.save(user.get());
        return Messenger.builder()
                .message("SUCCESS")
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
    public Optional<UserDto> findUserInfo(String accessToken) {
        String splitToken = accessToken.substring(7);
        Long id = jwtProvider.getPayload(splitToken).get("id", Long.class);

        return Optional.of(entityToDto(repository.findById(id).orElseThrow()));
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

    @Override
    public Optional<User> findUserByName(String name) {
        return Optional.empty();
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