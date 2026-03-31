import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Assignment, Logout as LogoutIcon, Palette as PaletteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../store/AuthContext';
import { ThemePreference } from '../models/enums/ThemePreference';
import { useAppTheme } from '../store/ThemeContext';
import { getThemeIcon } from '../utilities/getThemeIcon';
import { useLanguage } from '../hooks/useLanguage';

const themeOptions: ThemePreference[] = [ThemePreference.LIGHT, ThemePreference.DARK, ThemePreference.OCEAN];

const languages = [
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'hu', label: 'Hungarian', flag: 'HU' },
  { code: 'fi', label: 'Suomi', flag: 'FI' },
];

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const { currentTheme, setTheme } = useAppTheme();
  const { changeLanguage, currentLanguage } = useLanguage();

  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLogoClick = () => {
    navigate(isAdmin ? '/admin' : '/tasks');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // handlers for Theme Preference
  const handleThemeMenuOpen = (event: ReactMouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = async (theme: ThemePreference) => {
    await setTheme(theme);
    handleThemeMenuClose();
  };

  // handlers for Language Preference
  const handleLangMenuOpen = (event: ReactMouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const handleLanguageSelect = async (code: string) => {
    await changeLanguage(code);
    handleLangMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Assignment sx={{ mr: 2, cursor: 'pointer' }} onClick={() => handleLogoClick()} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleLogoClick}>
          Tasksks
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated && !isAdmin && (
            <>
              <Button color="inherit" onClick={() => navigate('/tasks')}>
                {t('tasksTitle')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/projects')}>
                {t('projects.title')}
              </Button>
            </>
          )}

          <IconButton color="inherit" onClick={handleThemeMenuOpen} aria-label="téma váltás" sx={{ mr: 1 }}>
            <PaletteIcon />
          </IconButton>

          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={handleThemeMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {themeOptions.map((theme) => (
              <MenuItem key={theme} onClick={() => handleThemeChange(theme)}>
                <ListItemIcon>{getThemeIcon(theme)}</ListItemIcon>
                <ListItemText>
                  {t(`theme.${theme}`)}
                  {currentTheme === theme && ' ✓'}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>

          <IconButton color="inherit" onClick={handleLangMenuOpen} aria-label="nyelv váltás">
            {languages.find((l) => l.code === currentLanguage)?.flag}
          </IconButton>

          <Menu
            anchorEl={langMenuAnchor}
            open={Boolean(langMenuAnchor)}
            onClose={handleLangMenuClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                selected={lang.code === currentLanguage}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span style={{ marginRight: 8 }}>{lang.flag}</span>
                {lang.label}
              </MenuItem>
            ))}
          </Menu>

          {isAuthenticated ? (
            <>
              <Chip label={currentUser?.username} color="secondary" size="small" />
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                {t('logout')}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                {t('login')}
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/register')}>
                {t('register')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
