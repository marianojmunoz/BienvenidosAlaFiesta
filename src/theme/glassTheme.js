import { createTheme } from '@mui/material';

export const glassTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8A2BE2', // BlueViolet
      light: '#9D46E8',
      dark: '#6A1B9A',
    },
    secondary: {
      main: '#FF1493', // DeepPink
      light: '#FF69B4',
      dark: '#C71585',
    },
    background: {
      default: '#f0f2f5',
      paper: 'rgba(255, 255, 255, 0.7)', // Translucent white
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Poppins", "Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        body {
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          min-height: 100vh;
        }
      `,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        },
        elevation1: {
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        },
        elevation3: {
           boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.20)',
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #8A2BE2 30%, #FF1493 90%)',
          border: 0,
          color: 'white',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'visible', // For hover effects that might expand
        },
      },
    },
  },
});
