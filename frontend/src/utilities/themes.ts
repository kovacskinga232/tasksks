import { createTheme } from '@mui/material';

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Ocean Theme
const oceanTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006064',
      light: '#00838f',
      dark: '#004d40',
    },
    secondary: {
      main: '#00acc1',
      light: '#26c6da',
      dark: '#00838f',
    },
    background: {
      default: '#e0f7fa',
      paper: '#b2ebf2',
    },
    text: {
      primary: '#004d40',
      secondary: '#00695c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const themes = {
  LIGHT: lightTheme,
  DARK: darkTheme,
  OCEAN: oceanTheme,
};
