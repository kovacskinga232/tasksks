export const common = {
  tasksTitle: 'Tasks',
  logout: 'Logout',
  login: 'Login',
  register: 'Registration',
  deadline: 'Deadline',
  priority: {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
  },
  tag: {
    WORK: 'WORK',
    PERSONAL: 'PERSONAL',
    SHOPPING: 'SHOPPING',
    HEALTH: 'HEALTH',
    STUDY: 'STUDY',
    FAMILY: 'FAMILY',
  },
  theme: {
    LIGHT: 'Light',
    DARK: 'Dark',
    OCEAN: 'Ocean',
  },
  validation: {
    username: {
      min: 'Username must be at least 3 characters',
      max: 'Username must be at most 25 characters',
    },
    password: {
      min: 'Password must be at least 6 characters',
      max: 'Password must be at most 72 characters',
    },
    project: {
      name: {
        min: 'Project name must be at least 3 characters',
        max: 'Project name cannot exceed 100 characters',
      },
      description: {
        max: 'Description cannot exceed 500 characters',
      },
    },
    register: {
      username: {
        min: 'Username must be at least 3 characters',
        max: 'Username cannot exceed 25 characters',
      },
      password: {
        min: 'Password must be at least 6 characters',
        max: 'Password cannot exceed 72 characters',
      },
      confirmPassword: {
        match: 'Passwords do not match',
      },
    },
    task: {
      title: {
        required: 'Title is required',
        max: 'Title cannot exceed 100 characters',
      },
      description: {
        required: 'Description is required',
        max: 'Description cannot exceed 1000 characters',
      },
      dueDate: {
        invalid: 'Due date cannot be in the past',
      },
      priority: {
        required: 'Priority is required',
      },
      tag: {
        required: 'Tag is required',
      },
    },
  },
};
