package com.tasksks.repository.interfaces.jpa;

import com.tasksks.models.Task;
import com.tasksks.repository.interfaces.TaskRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
@Profile("jpa")
public interface TaskJpaRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task>, TaskRepository {
    @Override
    Page<Task> findByUserId(Long id, Pageable pageable);

    @Override
    Page<Task> findByProjectId(Long projectId, Pageable pageable);

    @Override
    Page<Task> findByProjectIdAndCompleted(Long projectId, boolean completed, Pageable pageable);

    @Override
    Page<Task> findByUserIdAndProjectId(Long userId, Long projectId, Pageable pageable);

    @Override
    Long countByUserIdAndCompletedFalse(Long userId);

    @Override
    Long countByProjectIdAndCompletedFalse(Long projectId);

}
