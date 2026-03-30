package com.tasksks.controller;

import com.tasksks.dto.task.TaskRequestDto;
import com.tasksks.dto.task.TaskResponseDto;
import com.tasksks.mapper.TaskMapper;
import com.tasksks.models.Task;
import com.tasksks.models.User;
import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import com.tasksks.service.TaskService;
import com.tasksks.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Locale;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final UserService userService;

    @GetMapping
    public Page<TaskResponseDto> getAllTasks(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());

        return taskService.searchTasks(authentication.getName(), null, null, null, null, pageable)
                .map(taskMapper::toTaskResponseDto);
    }

    @GetMapping("/{id}")
    public TaskResponseDto getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return taskMapper.toTaskResponseDto(task);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponseDto createTask(
            Authentication authentication,
            @Valid @RequestBody TaskRequestDto taskRequestDto
    ) {
        Task task = taskMapper.toEntity(taskRequestDto);
        User user = userService.getUserByUsername(authentication.getName());
        Task created = taskService.addTaskToUserAndProject(user.getId(), taskRequestDto.getProjectId(), task);
        return taskMapper.toTaskResponseDto(created);
    }

    @PutMapping("/{id}")
    public TaskResponseDto updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequestDto taskRequestDto) {
        Task task = taskMapper.toEntity(taskRequestDto);
        Task updated = taskService.updateTask(id, taskRequestDto.getProjectId(), task);
        return taskMapper.toTaskResponseDto(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping(params = "title")
    public Collection<TaskResponseDto> getTasksByTitle(@RequestParam String title) {
        return taskService.getTasksByTitle(title).stream()
                .map(taskMapper::toTaskResponseDto)
                .collect(Collectors.toList());
    }

    @GetMapping(params = "priority")
    public Collection<TaskResponseDto> getTasksByPriority(@RequestParam String priority) {
        Priority p = Priority.valueOf(priority.toUpperCase(Locale.ROOT));

        return taskService.getTasksByPriority(p).stream()
                .map(taskMapper::toTaskResponseDto)
                .collect(Collectors.toList());
    }

    @GetMapping(params = "tag")
    public Collection<TaskResponseDto> getTasksByTag(@RequestParam String tag) {
        Tag t = Tag.valueOf(tag.toUpperCase(Locale.ROOT));

        return taskService.getTasksByTag(t).stream()
                .map(taskMapper::toTaskResponseDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/filter")
    public Page<TaskResponseDto> getFilteredTasks(
            Authentication authentication,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) Tag tag,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());

        return taskService.searchTasks(authentication.getName(), title, priority, tag, completed, pageable)
                .map(taskMapper::toTaskResponseDto);
    }

    @GetMapping("/project/{projectId}")
    public Page<TaskResponseDto> getTasksByProject(
            @PathVariable Long projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());
        return taskService.getTasksByProject(projectId, pageable)
                .map(taskMapper::toTaskResponseDto);
    }

    @GetMapping("/project/{projectId}/completed")
    public Page<TaskResponseDto> getCompletedTasksByProject(
            @PathVariable Long projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());
        return taskService.getTasksByProjectAndStatus(projectId, true, pageable)
                .map(taskMapper::toTaskResponseDto);
    }
}
