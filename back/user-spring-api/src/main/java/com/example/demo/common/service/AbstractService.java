package com.example.demo.common.service;

import com.example.demo.common.components.Messenger;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public abstract class  AbstractService<T> {
    public abstract Messenger save(T t);
    public abstract List<T> findAll() throws SQLException;
    public abstract Optional<T> findById(Long id);
    public abstract String count();
    public abstract Messenger delete(T t);
    public abstract Boolean existsById(Long id);
}