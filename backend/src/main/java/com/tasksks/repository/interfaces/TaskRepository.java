package com.tasksks.repository.interfaces;

import com.tasksks.models.Task;
import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Collection;
import java.util.Optional;

public interface TaskRepository {
    Collection<Task> findAll();

    Page<Task> findAll(Specification<Task> specification, Pageable pageable);

    Optional<Task> findById(Long id);

    Task save(Task task);

    void deleteById(Long id);

    Collection<Task> findByTitle(String title);

    Collection<Task> findByPriority(Priority priority);

    Collection<Task> findByTag(Tag tag);

    Page<Task> findByUserId(Long id, Pageable pageable);

    Long countByUserIdAndCompletedFalse(Long projectId);

    Long countByProjectIdAndCompletedFalse(Long userId);

    Page<Task> findByProjectId(Long projectId, Pageable pageable);

    Page<Task> findByProjectIdAndCompleted(Long projectId, boolean completed, Pageable pageable);

    Page<Task> findByUserIdAndProjectId(Long userId, Long projectId, Pageable pageable);

}
