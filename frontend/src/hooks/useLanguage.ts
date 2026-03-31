import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useAuth } from '../store/AuthContext';
import { updateUserLocale, fetchUserLocale } from '../api/users';

export function useLanguage() {
  const { isAuthenticated } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserLocale() {
      if (isAuthenticated) {
        try {
          const locale = await fetchUserLocale();
          await i18next.changeLanguage(locale);
          setCurrentLanguage(locale);
          localStorage.setItem('i18nextLng', locale);
        } catch (err) {
          console.error('Failed to fetch user locale', err);
        }
      }
      setLoading(false);
    }

    loadUserLocale().catch((err) => {
      console.error('Unexpected error in loadUserLocale', err);
    });
  }, [isAuthenticated]);

  const changeLanguage = async (languageCode: string) => {
    setLoading(true);
    try {
      await i18next.changeLanguage(languageCode);
      localStorage.setItem('i18nextLng', languageCode);
      setCurrentLanguage(languageCode);

      if (isAuthenticated) {
        await updateUserLocale(languageCode);
      }
    } catch (err) {
      console.error('Failed to change language', err);
    } finally {
      setLoading(false);
    }
  };

  return { currentLanguage, changeLanguage, loading };
}
