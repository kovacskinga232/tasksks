package com.tasksks.service;

import com.tasksks.exceptions.EntityNotFoundException;
import com.tasksks.models.Project;
import com.tasksks.models.Task;
import com.tasksks.models.User;
import com.tasksks.models.enums.Role;
import com.tasksks.models.enums.ThemePreference;
import com.tasksks.repository.interfaces.TaskRepository;
import com.tasksks.repository.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    public Collection<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(username));
    }

    public User createUser(User user) {
        log.info("Creating new user: {}", user.getUsername());

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);

        if (user.getThemePreference() != null) {
            existingUser.setThemePreference(user.getThemePreference());
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException(id);
        }

        userRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<Task> getUserTasks(Long id, Pageable pageable) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException(id);
        }

        return taskRepository.findByUserId(id, pageable);
    }

    @Transactional
    public Task addTaskToUser(Long id, Task task, Project project) {
        User user = getUserById(id);

        task.setUser(user);
        user.addTask(task);

        if (project != null) {
            if (!project.getUser().getId().equals(id)) {
                throw new AccessDeniedException("Project does not belond to user");
            }

            task.setProject(project);
        }

        return taskRepository.save(task);
    }

    @Transactional
    public void removeTaskFromUser(Long userId, Long taskId) {
        User user = getUserById(userId);

        Task taskToRemove = user.getTasks().stream()
                .filter(task -> task.getId().equals(taskId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException(taskId));

        user.removeTask(taskToRemove);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name().replace("ROLE_", ""))
                .build();
    }

    @Transactional
    public void updateTheme(String username, ThemePreference themePreference) {
        User user = getUserByUsername(username);
        user.setThemePreference(themePreference);
        userRepository.save(user);
    }

    @Transactional
    public void updateUserRole(Long id, Role newRole) {
        User targetUser = getUserById(id);
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (targetUser.getUsername().equals(currentUsername)) {
            log.warn("Admin {} tried to change their own role!", currentUsername);
            throw new AccessDeniedException("Saját szerepkör módosítása nem engedélyezett!");
        }

        targetUser.setRole(newRole);
        log.info("Role updated for user {}: {}", targetUser.getUsername(), newRole);

        userRepository.save(targetUser);
    }

    @Transactional
    public void updateLocale(User user) {
        userRepository.save(user);
    }
}
