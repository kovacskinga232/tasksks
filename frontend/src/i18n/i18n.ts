import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { auth as enAuth } from './en/auth';
import { auth as huAuth } from './hu/auth';
import { auth as fiAuth } from './fi/auth';

import { admin as enAdmin } from './en/admin';
import { admin as huAdmin } from './hu/admin';
import { admin as fiAdmin } from './fi/admin';

import { projects as enProjects } from './en/projects';
import { projects as huProjects } from './hu/projects';
import { projects as fiProjects } from './fi/projects';

import { common as enCommon } from './en/common';
import { common as huCommon } from './hu/common';
import { common as fiCommon } from './fi/common';

import { tasks as enTasks } from './en/tasks';
import { tasks as huTasks } from './hu/tasks';
import { tasks as fiTasks } from './fi/tasks';

const resources = {
  en: {
    translation: { ...enAdmin, ...enAuth, ...enCommon, ...enProjects, ...enTasks },
  },
  hu: {
    translation: { ...huAdmin, ...huAuth, ...huCommon, ...huProjects, ...huTasks },
  },
  fi: {
    translation: { ...fiAdmin, ...fiAuth, ...fiCommon, ...fiProjects, ...fiTasks },
  },
};

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hu',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })
  .then(() => {
    console.log('i18n initialized');
  });
