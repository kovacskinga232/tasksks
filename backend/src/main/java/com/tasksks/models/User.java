package com.tasksks.models;

import com.tasksks.models.enums.Role;
import com.tasksks.models.enums.ThemePreference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = {"tasks", "projects"})
public class User extends BaseEntity {
    @Column(nullable = false, unique = true, length = 25)
    private String username;

    @Column(nullable = false, length = 72)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.ROLE_USER;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme_preference", length = 20)
    private ThemePreference themePreference = ThemePreference.LIGHT;

    private String locale;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Project> projects = new ArrayList<>();

    public void addTask(Task task) {
        tasks.add(task);
        task.setUser(this);
    }

    public void removeTask(Task task) {
        tasks.remove(task);
        task.setUser(null);
    }

    public void addProject(Project project) {
        projects.add(project);
        project.setUser(this);
    }

    public void removeProject(Project project) {
        projects.remove(project);
        project.setUser(null);
    }
}
