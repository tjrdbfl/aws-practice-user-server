package com.example.demo.user.repository;

import com.example.demo.article.model.ArticleDto;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    List<User> findByName(String name);

    List<User> findByJob(String job);
    //Boolean existsByUsername(String username);
    @Query("select count(id) as count from users where username= :username")
    public Integer existsByUsername(@Param("username") String username);
    @Modifying
    @Query("update users u set u.token=:token where u.id= :id")
    public void modifyTokenById(@Param("token") String token, @Param("id") Long id);
}