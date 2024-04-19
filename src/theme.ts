'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // main: "rgb(22,177,255)"
      main: "#67CCF6"
    },
    secondary: {
      main: "rgb(140,87,255)"
    },
    success: {
      main: "rgb(86,202,0)"
    },
    error: {
      main: "rgb(255,76,81)"
    },
    info: {
      main: "rgb(22,177,255)"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;