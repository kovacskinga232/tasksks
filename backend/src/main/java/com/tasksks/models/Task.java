package com.tasksks.models;

import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = {"user", "project"})
public class Task extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Tag tag;

    @Column(nullable = false)
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
