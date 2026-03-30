package com.tasksks.controller;

import com.tasksks.dto.project.ProjectDetailResponseDto;
import com.tasksks.dto.project.ProjectRequestDto;
import com.tasksks.dto.project.ProjectResponseDto;
import com.tasksks.mapper.ProjectMapper;
import com.tasksks.models.Project;
import com.tasksks.models.User;
import com.tasksks.service.ProjectService;
import com.tasksks.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;
    private final UserService userService;

    @GetMapping
    public Page<ProjectResponseDto> getUserProjects(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Long userId = userService.getUserByUsername(authentication.getName()).getId();
        return projectService.getUserProjects(userId, pageable)
                .map(projectMapper::toProjectResponseDto);
    }

    @GetMapping("/{id}")
    public ProjectDetailResponseDto getProjectById(
            Authentication authentication,
            @PathVariable Long id
    ) {
        User user = userService.getUserByUsername(authentication.getName());

        Project project = projectService.getProjectById(id);

        if (!project.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Project does not belong to authenticated user");
        }

        return projectMapper.toProjectDetailResponseDto(project);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponseDto createProject(
            Authentication authentication,
            @Valid @RequestBody ProjectRequestDto dto
    ) {
        Long userId = userService.getUserByUsername(authentication.getName()).getId();
        Project project = projectMapper.toEntity(dto);
        Project created = projectService.createProject(userId, project);
        return projectMapper.toProjectResponseDto(created);
    }

    @PutMapping("/{id}")
    public ProjectResponseDto updateProject(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequestDto dto
    ) {
        User user = userService.getUserByUsername(authentication.getName());
        Project project = projectMapper.toEntity(dto);
        project.setUser(user);

        Project updated = projectService.updateProject(id, project);
        return projectMapper.toProjectResponseDto(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
