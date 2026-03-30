package com.tasksks.repository.interfaces.jpa;

import com.tasksks.models.Project;
import com.tasksks.repository.interfaces.ProjectRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Profile("jpa")
public interface ProjectJpaRepository extends JpaRepository<Project, Long>, ProjectRepository {
    @Override
    Page<Project> findByUserId(Long userId, Pageable pageable);
}
