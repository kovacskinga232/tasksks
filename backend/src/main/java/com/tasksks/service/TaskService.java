package com.tasksks.service;

import com.tasksks.exceptions.EntityNotFoundException;
import com.tasksks.models.Project;
import com.tasksks.models.Task;
import com.tasksks.models.User;
import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import com.tasksks.repository.interfaces.TaskRepository;
import com.tasksks.specifications.TaskSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    private final ProjectService projectService;

    public Collection<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Page<Task> getCurrentUserTasks(Pageable pageable) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = userService.getUserByUsername(username).getId();
        return taskRepository.findByUserId(userId, pageable);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
    }

    public Task addTaskToUserAndProject(Long userId, Long projectId, Task task) throws AccessDeniedException {
        User user = userService.getUserById(userId);

        task.setUser(user);

        if (projectId != null) {
            Project project = projectService.getProjectById(projectId);

            if (!project.getUser().getId().equals(userId)) {
                throw new AccessDeniedException("Project does not belong to user");
            }

            task.setProject(project);
        }

        log.info("Adding new task {} for user {}", task.getTitle(), user.getUsername());
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Long projectId, Task task) {
        Optional<Task> existing = taskRepository.findById(id);

        if (existing.isEmpty()) {
            throw new EntityNotFoundException(id);
        }

        task.setId(id);
        task.setUser(existing.get().getUser());

        if (task.getProject() != null
                && !task.getProject().getUser().getId().equals(existing.get().getUser().getId())) {

            throw new AccessDeniedException("Project does not belong to task owner");
        }

        if (projectId != null) {
            Project project = projectService.getProjectById(projectId);
            task.setProject(project);
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        if (taskRepository.findById(id).isEmpty()) {
            throw new EntityNotFoundException(id);
        }

        taskRepository.deleteById(id);
    }

    public Collection<Task> getTasksByTitle(String title) {
        return taskRepository.findByTitle(title);
    }

    public Collection<Task> getTasksByPriority(Priority priority) {
        return taskRepository.findByPriority(priority);
    }

    public Collection<Task> getTasksByTag(Tag tag) {
        return taskRepository.findByTag(tag);
    }

    public Page<Task> getTasksByProject(Long projectId, Pageable pageable) {
        return taskRepository.findByProjectId(projectId, pageable);
    }

    public Page<Task> getTasksByProjectAndStatus(Long projectId, boolean completed, Pageable pageable) {
        return taskRepository.findByProjectIdAndCompleted(projectId, completed, pageable);
    }

    public long getTotalActiveTasks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = userService.getUserByUsername(username).getId();

        return taskRepository.countByUserIdAndCompletedFalse(userId);
    }

    public Page<Task> searchTasks(
            String username,
            String title,
            Priority priority,
            Tag tag,
            Boolean completed,
            Pageable pageable
    ) {
        User user = userService.getUserByUsername(username);
        Specification<Task> specification =
                TaskSpecification.filterTasks(user.getId(), title, priority, tag, completed);

        return taskRepository.findAll(specification, pageable);
    }
}
