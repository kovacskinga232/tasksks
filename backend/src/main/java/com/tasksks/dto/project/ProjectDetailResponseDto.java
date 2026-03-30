package com.tasksks.dto.project;

import com.tasksks.dto.task.TaskResponseDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectDetailResponseDto {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private List<TaskResponseDto> tasks;
}
