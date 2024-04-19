package com.example.demo.common.security.repository;

import com.example.demo.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    List<User> findByName(String name);

    List<User> findByJob(String job);
}