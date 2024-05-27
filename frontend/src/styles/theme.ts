import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});
