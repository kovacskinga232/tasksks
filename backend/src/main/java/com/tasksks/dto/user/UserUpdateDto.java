package com.tasksks.dto.user;

import com.tasksks.models.enums.ThemePreference;
import lombok.Data;

@Data
public class UserUpdateDto {
    private ThemePreference themePreference;
}
