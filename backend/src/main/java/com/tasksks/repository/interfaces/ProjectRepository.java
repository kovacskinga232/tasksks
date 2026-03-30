package com.tasksks.repository.interfaces;

import com.tasksks.models.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

public interface ProjectRepository {
    Collection<Project> findAll();

    Page<Project> findAll(Pageable pageable);

    Optional<Project> findById(Long id);

    boolean existsById(Long id);

    Project save(Project project);

    void deleteById(Long id);

    Page<Project> findByUserId(Long userId, Pageable pageable);
}
