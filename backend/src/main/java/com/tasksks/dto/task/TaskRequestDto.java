package com.tasksks.dto.task;

import com.tasksks.models.enums.Priority;
import com.tasksks.models.enums.Tag;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequestDto {
    @NotBlank(message = "Title is required")
    @Size(max = 100)
    private String title;

    @Size(max = 1000)
    private String description;

    @FutureOrPresent(message = "Due date cannot be in the past")
    private LocalDate dueDate;

    @NotNull(message = "Priority is required")
    private Priority priority;

    private Tag tag;
    private boolean completed;

    @Nullable
    private Long projectId;
}
