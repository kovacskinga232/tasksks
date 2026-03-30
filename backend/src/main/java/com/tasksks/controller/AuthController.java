package com.tasksks.controller;

import com.tasksks.dto.user.UserAuthRequestDto;
import com.tasksks.dto.user.UserAuthResponseDto;
import com.tasksks.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public UserAuthResponseDto login(@Valid @RequestBody UserAuthRequestDto request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public UserAuthResponseDto register(@Valid @RequestBody UserAuthRequestDto request) {
        return authService.register(request);
    }
}
