import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeProviderZustand({ children }) {
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode - clean, bright theme
                primary: {
                  main: '#1976d2',
                  light: '#42a5f5',
                  dark: '#1565c0',
                  contrastText: '#ffffff',
                },
                secondary: {
                  main: '#9c27b0',
                  light: '#ba68c8',
                  dark: '#7b1fa2',
                  contrastText: '#ffffff',
                },
                background: {
                  default: '#fafafa',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#212121',
                  secondary: '#757575',
                },
                divider: '#e0e0e0',
              }
            : {
                // Dark mode - inverted colors
                primary: {
                  main: '#90caf9',
                  light: '#e3f2fd',
                  dark: '#42a5f5',
                  contrastText: '#000000',
                },
                secondary: {
                  main: '#ce93d8',
                  light: '#f3e5f5',
                  dark: '#ab47bc',
                  contrastText: '#000000',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0',
                },
                divider: '#424242',
              }),
        },
      }),
    [mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
