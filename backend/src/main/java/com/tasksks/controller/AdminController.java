package com.tasksks.controller;

import com.tasksks.models.enums.Role;
import com.tasksks.service.TaskService;
import com.tasksks.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminController {
    private final TaskService taskService;
    private final UserService userService;

    @GetMapping("/stats/active-tasks")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getActiveTaskCount() {
        return ResponseEntity.ok(taskService.getTotalActiveTasks());
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> changeUserRole(@PathVariable Long id, @RequestBody String newRole) {
        userService.updateUserRole(id, Role.valueOf(newRole));
        return ResponseEntity.ok().build();
    }
}
