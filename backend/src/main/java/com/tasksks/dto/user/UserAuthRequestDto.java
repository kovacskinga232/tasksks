package com.tasksks.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserAuthRequestDto {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 25, message = "Username must be between 3 and 25 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 72, message = "Password must be between 6 and 72 characters")
    private String password;
}
