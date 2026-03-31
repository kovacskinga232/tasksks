import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ThemePreference } from '../models/enums/ThemePreference';
import { loadThemeFromBackend, saveThemeToBackend } from '../api/theme';

export const useTheme = (isAuthenticated: boolean) => {
  const queryClient = useQueryClient();

  const themeQuery = useQuery<ThemePreference>({
    queryKey: ['theme'],
    queryFn: async () => {
      if (isAuthenticated) {
        const theme = await loadThemeFromBackend();

        if (theme) {
          localStorage.setItem('theme', theme);
        }

        return (theme as ThemePreference) || ThemePreference.LIGHT;
      }
      return ThemePreference.LIGHT;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const saved = localStorage.getItem('theme');
      return (saved as ThemePreference) || ThemePreference.LIGHT;
    },
  });

  const mutation = useMutation<void, unknown, ThemePreference>({
    mutationFn: (theme: ThemePreference) => {
      if (isAuthenticated) {
        return saveThemeToBackend(theme);
      }
      return Promise.resolve();
    },
    onSuccess: (_, theme) => {
      queryClient.setQueryData(['theme'], theme);
      localStorage.setItem('theme', theme);
    },
  });

  return {
    currentTheme: themeQuery.data ?? ThemePreference.LIGHT,
    setTheme: mutation.mutateAsync,
  };
};
