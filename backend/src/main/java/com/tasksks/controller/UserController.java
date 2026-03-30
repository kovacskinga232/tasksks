package com.tasksks.controller;

import com.tasksks.dto.task.TaskRequestDto;
import com.tasksks.dto.task.TaskResponseDto;
import com.tasksks.dto.user.UserAuthRequestDto;
import com.tasksks.dto.user.UserResponseDto;
import com.tasksks.dto.user.UserUpdateDto;
import com.tasksks.mapper.TaskMapper;
import com.tasksks.mapper.UserMapper;
import com.tasksks.models.Project;
import com.tasksks.models.Task;
import com.tasksks.models.User;
import com.tasksks.models.enums.ThemePreference;
import com.tasksks.service.ProjectService;
import com.tasksks.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ProjectService projectService;
    private final UserMapper userMapper;
    private final TaskMapper taskMapper;

    @GetMapping
    public Page<UserResponseDto> getAllUsers(
            @RequestParam(defaultValue = "0") int page
    ) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("username").ascending());
        return userService.getAllUsers(pageable)
                .map(userMapper::toUserResponseDto);
    }

    @GetMapping("/{id}")
    public UserResponseDto getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return userMapper.toUserResponseDto(user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDto createUser(@Valid @RequestBody UserAuthRequestDto userAuthRequestDto) {
        User user = userMapper.toEntity(userAuthRequestDto);
        User created = userService.createUser(user);

        return userMapper.toUserResponseDto(created);
    }

    @PatchMapping("/{id}")
    public UserResponseDto updatedUserPreferences(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateDto userUpdateDto
    ) {
        User user = userMapper.toEntity(userUpdateDto);
        User updated = userService.updateUser(id, user);

        return userMapper.toUserResponseDto(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{userId}/tasks")
    public Page<TaskResponseDto> getUserTasks(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page
    ) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("dueDate").ascending());
        return userService.getUserTasks(userId, pageable)
                .map(taskMapper::toTaskResponseDto);
    }

    @PostMapping("/{userId}/tasks")
    public TaskResponseDto addTaskToUser(@PathVariable Long userId, @Valid @RequestBody TaskRequestDto taskRequestDto) {
        Task task = taskMapper.toEntity(taskRequestDto);

        Project project = null;

        if (taskRequestDto.getProjectId() != null) {
            project = projectService.getProjectById(taskRequestDto.getProjectId());
        }

        Task created = userService.addTaskToUser(userId, task, project);

        return taskMapper.toTaskResponseDto(created);
    }

    @DeleteMapping("/{userId}/tasks/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTaskFromUser(@PathVariable Long userId, @PathVariable Long taskId) {
        userService.removeTaskFromUser(userId, taskId);
    }

    @GetMapping("/me/theme")
    public ThemePreference getTheme(Authentication authentication) {
        return userService
                .getUserByUsername(authentication.getName())
                .getThemePreference();
    }

    @PutMapping("/me/theme")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateTheme(
            Authentication authentication,
            @RequestBody UserUpdateDto dto
    ) {
        userService.updateTheme(authentication.getName(), dto.getThemePreference());
    }

    @PutMapping("/me/locale")
    public void updateUserLocale(Authentication authentication, @RequestBody Map<String, String> body) {
        String locale = body.get("locale");
        User user = userService.getUserByUsername(authentication.getName());
        user.setLocale(locale);
        userService.updateLocale(user);
    }

    @GetMapping("/me/locale")
    public Map<String, String> getCurrentUserLocale(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        return Map.of("locale", user.getLocale());
    }
}
