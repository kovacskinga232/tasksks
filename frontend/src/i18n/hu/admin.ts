export const admin = {
  admin: {
    table: {
      username: 'Felhasználónév',
      role: 'Szerepkör',
      actions: 'Műveletek',
      you: '(Te)',
    },
    role: {
      ADMIN: 'ADMIN',
      USER: 'FELHASZNÁLÓ',
    },
    tooltip: {
      cannotModifySelf: 'Saját magad nem módosíthatod',
      changeRole: 'Szerepkör váltása',
      cannotDeleteSelf: 'Saját magad nem törölheted',
      deleteUser: 'Felhasználó törlése',
    },
    dialog: {
      changeRoleTitle: 'Szerepkör módosítása',
      changeRoleText: 'Biztosan meg szeretnéd változtatni {{username}} szerepkörét a következőre: {{role}}?',
      confirmTitle: 'Megerősítés',
      deleteText: 'Biztosan törölni szeretnéd ezt a felhasználót? Ez a művelet nem vonható vissza.',
      cancel: 'Mégse',
      update: 'Módosítás',
      updating: 'Módosítás...',
      delete: 'Törlés',
      deleting: 'Törlés...',
    },
    dashboard: {
      title: 'Adminisztrációs felület',
      userManagement: 'Felhasználók kezelése',
      loadingError: 'Hiba történt az adatok betöltése során!',
      stats: {
        totalUsers: 'Összes felhasználók száma',
        adminsOnPage: 'Adminok száma az oldalon',
      },
    },
    userDetail: {
      back: 'Vissza',
      notFound: 'Felhasználó nem található!',
      roleLabel: 'Szerepkör',
      role: {
        admin: 'adminisztrátor',
        user: 'felhasználó',
      },
      registered: 'Regisztrált',
      tasksTitle: 'A felhasználó feladatai ({{count}})',
      noTasks: 'Nincsenek feladatok.',
      dueDate: 'Határidő',
    },
  },
};
