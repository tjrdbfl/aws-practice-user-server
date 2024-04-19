package com.example.demo.common.security.service;

import com.example.demo.common.components.Messenger;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;

import java.util.Optional;

public interface AuthService {
    Messenger login(UserDto param);
    String createToken(UserDto user);
}
