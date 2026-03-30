package com.tasksks.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserAuthResponseDto {
    private String token;

    private String username;

    private String role;
}
