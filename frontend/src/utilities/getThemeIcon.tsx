import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Palette as PaletteIcon,
  Waves as OceanIcon,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { ThemePreference } from '../models/enums/ThemePreference';

export const getThemeIcon = (theme: ThemePreference): ReactNode => {
  switch (theme) {
    case ThemePreference.LIGHT:
      return <LightIcon fontSize="small" />;
    case ThemePreference.DARK:
      return <DarkIcon fontSize="small" />;
    case ThemePreference.OCEAN:
      return <OceanIcon fontSize="small" />;
    default:
      return <PaletteIcon fontSize="small" />;
  }
};
