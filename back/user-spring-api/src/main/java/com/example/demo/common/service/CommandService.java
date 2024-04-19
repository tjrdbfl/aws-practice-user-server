package com.example.demo.common.service;

import com.example.demo.common.components.Messenger;

public interface CommandService<T> {
    Messenger save(T t);
    Messenger deleteById(Long id);
    Messenger modify(T t);
}
