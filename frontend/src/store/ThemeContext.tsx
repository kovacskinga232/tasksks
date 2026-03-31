import { ReactNode, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from '../utilities/themes';
import { useTheme as useThemeLogic } from '../hooks/useTheme';
import { useAuth } from './AuthContext';

const ThemeContext = createContext<ReturnType<typeof useThemeLogic> | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const themeValue = useThemeLogic(isAuthenticated);

  return (
    <ThemeContext.Provider value={themeValue}>
      <MuiThemeProvider theme={themes[themeValue.currentTheme]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }

  return context;
};
