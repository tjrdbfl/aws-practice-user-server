package com.example.demo.common.service;

import com.example.demo.common.components.Messenger;

import java.util.List;
import java.util.Optional;

public interface QueryService <T>{
    List<T> findAll();
    Optional<T> findById(Long id);
    Messenger count();
    Boolean existById(Long id);
}