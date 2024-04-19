package com.example.demo.user.service;

import com.example.demo.common.components.JwtProvider;
import com.example.demo.common.components.Messenger;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final JwtProvider jwtProvider;
    @Override
    public Messenger save(UserDto t) {
        User ent=repository.save(dtoToEntity(t));
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
        User user = repository.findById(t.getId()).get();
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
    public Messenger login(UserDto dto) {
        boolean flag = repository.findByUsername(dto.getUsername()).get().getPassword().equals(dto.getPassword());

        return Messenger.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .token(flag ? jwtProvider.createToken(dto) : "None")
                .build();
    }

}