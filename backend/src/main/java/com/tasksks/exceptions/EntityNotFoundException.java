package com.tasksks.exceptions;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Long id) {
        super("Entity not found with id: " + id);
    }

    public EntityNotFoundException(String name) {
        super("Entity not found with title/name: " + name);
    }
}
