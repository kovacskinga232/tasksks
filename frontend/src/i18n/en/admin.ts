export const admin = {
  admin: {
    table: {
      username: 'Username',
      role: 'Role',
      actions: 'Actions',
      you: '(You)',
    },
    role: {
      ADMIN: 'ADMIN',
      USER: 'USER',
    },
    tooltip: {
      cannotModifySelf: 'You cannot modify yourself',
      changeRole: 'Change role',
      cannotDeleteSelf: 'You cannot delete yourself',
      deleteUser: 'Delete user',
    },
    dialog: {
      changeRoleTitle: 'Change Role',
      changeRoleText: "Are you sure you want to change {{username}}'s role to {{role}}?",
      confirmTitle: 'Confirmation',
      deleteText: 'Are you sure you want to delete this user? This action cannot be undone.',
      cancel: 'Cancel',
      update: 'Update',
      updating: 'Updating...',
      delete: 'Delete',
      deleting: 'Deleting...',
    },
    dashboard: {
      title: 'Administration Panel',
      userManagement: 'User Management',
      loadingError: 'An error occurred while loading data.',
      stats: {
        totalUsers: 'Total number of users',
        adminsOnPage: 'Number of admins on this page',
      },
    },
    userDetail: {
      back: 'Back',
      notFound: 'User not found!',
      roleLabel: 'Role',
      role: {
        admin: 'Administrator',
        user: 'User',
      },
      registered: 'Registered',
      tasksTitle: 'User tasks ({{count}})',
      noTasks: 'No tasks available.',
      dueDate: 'Due date',
    },
  },
};
