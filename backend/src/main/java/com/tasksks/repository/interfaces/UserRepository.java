package com.tasksks.repository.interfaces;

import com.tasksks.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

public interface UserRepository {
    Collection<User> findAll();

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Long id);

    User save(User user);

    void deleteById(Long id);

    Optional<User> findByUsername(String username);

    boolean existsById(Long id);

    boolean existsByUsername(String username);

}
