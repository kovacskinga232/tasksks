package com.tasksks.mapper;

import com.tasksks.dto.project.ProjectDetailResponseDto;
import com.tasksks.dto.project.ProjectRequestDto;
import com.tasksks.dto.project.ProjectResponseDto;
import com.tasksks.models.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProjectMapper {
    ProjectResponseDto toProjectResponseDto(Project project);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Project toEntity(ProjectRequestDto projectRequestDto);

    ProjectDetailResponseDto toProjectDetailResponseDto(Project project);
}
