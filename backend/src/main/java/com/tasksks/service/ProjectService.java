package com.tasksks.service;

import com.tasksks.exceptions.EntityNotFoundException;
import com.tasksks.models.Project;
import com.tasksks.models.User;
import com.tasksks.repository.interfaces.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
    }

    public Page<Project> getUserProjects(Long userId, Pageable pageable) {
        return projectRepository.findByUserId(userId, pageable);
    }

    public Page<Project> getAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

    @Transactional
    public Project createProject(Long userId, Project project) {
        User user = userService.getUserById(userId);
        project.setUser(user);

        log.info("Creating  project '{}' for user {}", project.getName(), user.getUsername());

        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        Optional<Project> existing = projectRepository.findById(id);

        if (existing.isEmpty()) {
            throw new EntityNotFoundException(id);
        }

        if (!project.getUser().getId().equals(existing.get().getUser().getId())) {
            throw new AccessDeniedException("Project does not belong to task owner");
        }

        existing.get().setUpdatedAt(LocalDateTime.now());
        existing.get().setDescription(project.getDescription());
        existing.get().setName(project.getName());

        return projectRepository.save(existing.get());
    }

    @Transactional
    public void deleteProject(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new EntityNotFoundException(projectId);
        }

        projectRepository.deleteById(projectId);
    }
}
