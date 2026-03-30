package com.tasksks.service;

import com.tasksks.dto.user.UserAuthRequestDto;
import com.tasksks.dto.user.UserAuthResponseDto;
import com.tasksks.models.User;
import com.tasksks.models.enums.Role;
import com.tasksks.repository.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserAuthResponseDto login(UserAuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

        String token = jwtService.generateToken(user);

        return new UserAuthResponseDto(token, user.getUsername(), user.getRole().name());
    }

    public UserAuthResponseDto register(UserAuthRequestDto request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalStateException("Username already taken");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new UserAuthResponseDto(token, user.getUsername(), user.getRole().name());
    }
}
