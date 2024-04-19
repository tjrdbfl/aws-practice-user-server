package com.example.demo.user.service;

import com.example.demo.common.components.Messenger;
import com.example.demo.user.model.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
@Transactional  //test 도중 발생한 data crud를 롤백하여, 원래 상태로 다시 되돌려 놓는다
@SpringBootTest
public class UserServiceImplTest {

    @Autowired
    private UserService service;

    @Test
    public void count() {
        Messenger message = service.count();
        assertThat(message.getMessage()).isEqualTo("20");
    }

    @Test
    void deleteById() {
        Messenger message = service.deleteById(3L);
        System.out.println(message.getMessage());
    }

    @Test
    void modify() {
        Long userId = 1L;
        String name = "Test User";
        String password = "newPassword";
        String phone = "0101234567";
        String job = "Software Engineer";
        UserDto userDto = UserDto.builder()
                .id(userId)
                .name(name)
                .password(password)
                .phone(phone)
                .job(job)
                .build();

        Messenger message = service.modify(userDto);

        assertThat(message.getMessage()).isEqualTo("회원정보 수정 성공" + name);
    }

    @Test
    void findAll() {
        List<UserDto> users = service.findAll();

        assertThat(users).isNotEmpty();
    }

    @Test
    void findById() {
        Long id=100L;
        Optional<UserDto> user=service.findById(id);
        if (user.isPresent()) {
            assertThat(user.get().getId()).isEqualTo(id);
        } else {
            assertThat(user).isEmpty();
        }
    }

    @Test
    void existById() {
        Long id=4L;
        assertThat(service.existById(id)).isTrue();
    }
}