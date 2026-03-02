import { createTheme } from '@mui/material/styles';

const primaryGradient = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
const primaryHoverGradient = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    success: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#18181b',
      secondary: '#71717a',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: 0.3,
      textTransform: 'none',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          padding: '0.75rem 1.75rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          backgroundImage: primaryGradient,
          boxShadow: '0px 8px 20px rgba(59, 130, 246, 0.35)',
          color: '#fff',
          '&:hover': {
            backgroundImage: primaryHoverGradient,
            boxShadow: '0px 12px 28px rgba(59, 130, 246, 0.45)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'scale(0.98) translateY(0)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          boxShadow: '0px 8px 20px rgba(239, 68, 68, 0.35)',
          color: '#fff',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            boxShadow: '0px 12px 28px rgba(239, 68, 68, 0.45)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          borderColor: 'rgba(59, 130, 246, 0.5)',
          color: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.04)',
          '&:hover': {
            borderWidth: 2,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
        textPrimary: {
          color: '#3b82f6',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
          },
        },
        sizeLarge: {
          padding: '1rem 2.5rem',
          fontSize: '1.05rem',
        },
        sizeSmall: {
          padding: '0.5rem 1.25rem',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#60a5fa',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: '#3b82f6',
              },
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 20,
        },
        elevation1: {
          boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
});

export default theme;
