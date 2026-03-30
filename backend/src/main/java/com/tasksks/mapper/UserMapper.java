package com.tasksks.mapper;

import com.tasksks.dto.user.UserAuthRequestDto;
import com.tasksks.dto.user.UserResponseDto;
import com.tasksks.dto.user.UserUpdateDto;
import com.tasksks.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserResponseDto toUserResponseDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", constant = "ROLE_USER")
    @Mapping(target = "themePreference", constant = "LIGHT")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "lastLogin", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    User toEntity(UserAuthRequestDto userAuthRequestDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "lastLogin", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    User toEntity(UserUpdateDto userUpdateDto);
}
