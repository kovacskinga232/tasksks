export const admin = {
  admin: {
    table: {
      username: 'Käyttäjänimi',
      role: 'Rooli',
      actions: 'Toiminnot',
      you: '(Sinä)',
    },
    role: {
      ADMIN: 'YLLÄPITÄJÄ',
      USER: 'KÄYTTÄJÄ',
    },
    tooltip: {
      cannotModifySelf: 'Et voi muokata omaa käyttäjääsi',
      changeRole: 'Vaihda rooli',
      cannotDeleteSelf: 'Et voi poistaa omaa käyttäjääsi',
      deleteUser: 'Poista käyttäjä',
    },
    dialog: {
      changeRoleTitle: 'Vaihda rooli',
      changeRoleText: 'Haluatko varmasti muuttaa käyttäjän {{username}} roolin seuraavaksi: {{role}}?',
      confirmTitle: 'Vahvistus',
      deleteText: 'Haluatko varmasti poistaa tämän käyttäjän? Tätä toimintoa ei voi perua.',
      cancel: 'Peruuta',
      update: 'Päivitä',
      updating: 'Päivitetään...',
      delete: 'Poista',
      deleting: 'Poistetaan...',
    },
    dashboard: {
      title: 'Ylläpitopaneeli',
      userManagement: 'Käyttäjien hallinta',
      loadingError: 'Tietojen lataamisen aikana tapahtui virhe.',
      stats: {
        totalUsers: 'Käyttäjien kokonaismäärä',
        adminsOnPage: 'Ylläpitäjien määrä tällä sivulla',
      },
    },
    userDetail: {
      back: 'Takaisin',
      notFound: 'Käyttäjää ei löydy!',
      roleLabel: 'Rooli',
      role: {
        admin: 'Ylläpitäjä',
        user: 'Käyttäjä',
      },
      registered: 'Rekisteröitynyt',
      tasksTitle: 'Käyttäjän tehtävät ({{count}})',
      noTasks: 'Ei tehtäviä.',
      dueDate: 'Eräpäivä',
    },
  },
};
