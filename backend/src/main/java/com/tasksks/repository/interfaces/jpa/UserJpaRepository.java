package com.tasksks.repository.interfaces.jpa;

import com.tasksks.models.User;
import com.tasksks.repository.interfaces.UserRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Profile("jpa")
public interface UserJpaRepository extends JpaRepository<User, Long>, UserRepository {
    @Override
    Optional<User> findByUsername(String username);


    @Override
    boolean existsByUsername(String username);
}
