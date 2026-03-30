package com.tasksks.dto.project;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectResponseDto {
    private Long id;

    private String name;

    private String description;

    private LocalDateTime createdAt;
}
