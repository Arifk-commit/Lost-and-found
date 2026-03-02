import { createTheme } from '@mui/material/styles';

const primaryGradient = 'linear-gradient(135deg, #1e88e5 0%, #5c6bc0 100%)';
const primaryHoverGradient = 'linear-gradient(135deg, #1565c0 0%, #3949ab 100%)';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
      light: '#64b5f6',
      dark: '#0f5dbb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7043',
      light: '#ffa270',
      dark: '#c63f17',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: {
      fontWeight: 600,
      letterSpacing: 0.2,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 600,
          padding: '0.65rem 1.6rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        },
        containedPrimary: {
          backgroundImage: primaryGradient,
          boxShadow: '0px 12px 24px rgba(30, 136, 229, 0.3)',
          color: '#fff',
          '&:hover': {
            backgroundImage: primaryHoverGradient,
            boxShadow: '0px 16px 32px rgba(30, 136, 229, 0.35)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(135deg, #ff7043 0%, #ff8a65 100%)',
          color: '#fff',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #e95b2d 0%, #ff7043 100%)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          borderColor: 'rgba(30, 136, 229, 0.6)',
          color: '#1e88e5',
          backgroundColor: 'rgba(30, 136, 229, 0.04)',
          '&:hover': {
            borderColor: '#1e88e5',
            backgroundColor: 'rgba(30, 136, 229, 0.12)',
            transform: 'translateY(-1px)',
          },
        },
        textPrimary: {
          color: '#1e88e5',
          '&:hover': {
            backgroundColor: 'rgba(30, 136, 229, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
        sizeLarge: {
          padding: '0.85rem 2.2rem',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '0.45rem 1.1rem',
        },
        startIcon: {
          marginRight: '0.6rem',
        },
        endIcon: {
          marginLeft: '0.6rem',
        },
      },
    },
  },
});

export default theme;
