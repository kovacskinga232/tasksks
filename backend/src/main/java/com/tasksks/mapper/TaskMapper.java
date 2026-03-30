package com.tasksks.mapper;

import com.tasksks.dto.task.TaskRequestDto;
import com.tasksks.dto.task.TaskResponseDto;
import com.tasksks.models.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TaskMapper {
    TaskRequestDto toTaskRequestDto(Task task);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "project", ignore = true)
    Task toEntity(TaskRequestDto taskRequestDto);

    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.name", target = "projectName")
    TaskResponseDto toTaskResponseDto(Task task);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "project", ignore = true)
    Task toEntity(TaskResponseDto taskDto);
}
