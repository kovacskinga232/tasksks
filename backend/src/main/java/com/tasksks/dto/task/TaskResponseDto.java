package com.tasksks.dto.task;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskResponseDto {
    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private String priority;

    private String tag;

    private boolean completed;

    private Long projectId;

    private String projectName;
}
