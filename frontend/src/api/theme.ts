import apiClient from './client';
import { ThemePreference } from '../models/enums/ThemePreference';

const THEME_BASE = '/api/users/me/theme';

export const loadThemeFromBackend = async (): Promise<ThemePreference | null> => {
  const response = await apiClient.get<string>(THEME_BASE);
  const theme = response.data;

  if (theme) {
    return theme as ThemePreference;
  }

  return null;
};

export const saveThemeToBackend = async (theme: ThemePreference): Promise<void> => {
  await apiClient.put(THEME_BASE, { themePreference: theme });
};
