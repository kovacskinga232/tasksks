export const common = {
  tasksTitle: 'Tehtävät',
  logout: 'Uloskirjautuminen',
  login: 'Kirjaudu sisään',
  register: 'Rekisteröinti',
  deadline: 'Määräaika',
  priority: {
    LOW: 'MATALA',
    MEDIUM: 'KESKITASO',
    HIGH: 'KORKEA',
    CRITICAL: 'KRIITTINEN',
  },
  tag: {
    WORK: 'TYÖ',
    PERSONAL: 'HENKILÖKOHTAINEN',
    SHOPPING: 'OSTOKSET',
    HEALTH: 'TERVEYS',
    STUDY: 'OPISKELU',
    FAMILY: 'PERHE',
  },
  theme: {
    LIGHT: 'Vaalea',
    DARK: 'Tumma',
    OCEAN: 'Valtameri',
  },
  validation: {
    username: {
      min: 'Käyttäjänimen on oltava vähintään 3 merkkiä pitkä',
      max: 'Käyttäjänimi saa olla enintään 25 merkkiä pitkä',
    },
    password: {
      min: 'Salasanan on oltava vähintään 6 merkkiä pitkä',
      max: 'Salasana saa olla enintään 72 merkkiä pitkä',
    },
    project: {
      name: {
        min: 'Projektin nimen on oltava vähintään 3 merkkiä pitkä',
        max: 'Projektin nimi saa olla enintään 100 merkkiä pitkä',
      },
      description: {
        max: 'Kuvaus saa olla enintään 500 merkkiä pitkä',
      },
    },
    register: {
      username: {
        min: 'Käyttäjänimen on oltava vähintään 3 merkkiä pitkä',
        max: 'Käyttäjänimi saa olla enintään 25 merkkiä pitkä',
      },
      password: {
        min: 'Salasanan on oltava vähintään 6 merkkiä pitkä',
        max: 'Salasana saa olla enintään 72 merkkiä pitkä',
      },
      confirmPassword: {
        match: 'Salasanat eivät täsmää',
      },
    },
    task: {
      title: {
        required: 'Otsikko on pakollinen',
        max: 'Otsikko saa olla enintään 100 merkkiä pitkä',
      },
      description: {
        required: 'Kuvaus on pakollinen',
        max: 'Kuvaus saa olla enintään 1000 merkkiä pitkä',
      },
      dueDate: {
        invalid: 'Eräpäivä ei voi olla menneisyydessä',
      },
      priority: {
        required: 'Prioriteetti on pakollinen',
      },
      tag: {
        required: 'Tunniste on pakollinen',
      },
    },
  },
};
