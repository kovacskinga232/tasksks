export const common = {
  tasksTitle: 'Feladatok',
  logout: 'Kijelentkezés',
  login: 'Bejelentkezés',
  register: 'Regisztráció',
  deadline: 'Határidő',
  priority: {
    LOW: 'ALACSONY',
    MEDIUM: 'KÖZEPES',
    HIGH: 'MAGAS',
    CRITICAL: 'KRITIKUS',
  },
  tag: {
    WORK: 'MUNKA',
    PERSONAL: 'SZEMÉLYES',
    SHOPPING: 'VÁSÁRLÁS',
    HEALTH: 'EGÉSZSÉG',
    STUDY: 'TANULÁS',
    FAMILY: 'CSALÁD',
  },
  theme: {
    LIGHT: 'Világos',
    DARK: 'Sötét',
    OCEAN: 'Óceán',
  },
  validation: {
    username: {
      min: 'A felhasználónév legalább 3 karakter hosszú kell legyen',
      max: 'A felhasználónév legfeljebb 25 karakter hosszú lehet',
    },
    password: {
      min: 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
      max: 'A jelszó legfeljebb 72 karakter hosszú lehet',
    },
    project: {
      name: {
        min: 'A projekt neve legalább 3 karakter hosszú legyen',
        max: 'A projekt neve legfeljebb 100 karakter lehet',
      },
      description: {
        max: 'A leírás legfeljebb 500 karakter lehet',
      },
    },
    register: {
      username: {
        min: 'A felhasználónév legalább 3 karakter hosszú legyen',
        max: 'A felhasználónév legfeljebb 25 karakter hosszú lehet',
      },
      password: {
        min: 'A jelszó legalább 6 karakter hosszú legyen',
        max: 'A jelszó legfeljebb 72 karakter hosszú lehet',
      },
      confirmPassword: {
        match: 'A két jelszó nem egyezik meg',
      },
    },
    task: {
      title: {
        required: 'A cím megadása kötelező',
        max: 'A cím legfeljebb 100 karakter lehet',
      },
      description: {
        required: 'A leírás megadása kötelező',
        max: 'A leírás legfeljebb 1000 karakter lehet',
      },
      dueDate: {
        invalid: 'A határidő nem lehet múltbeli dátum',
      },
      priority: {
        required: 'A prioritás megadása kötelező',
      },
      tag: {
        required: 'A címke megadása kötelező',
      },
    },
  },
};
