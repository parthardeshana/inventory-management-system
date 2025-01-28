"use client";
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
//relative path imports
import Header from "@/components/Header";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#DEFF55",
    },
    secondary: {
      main: "#C597D4",
    },
    error: {
      main: "#EB3322",
    },
    success: {
      main: "#377D21",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    htmlFontSize: 16,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          backgroundColor:'#212124'
        }
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          backgroundColor:'#292B27',
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          "&:disabled": {
            backgroundColor: "#212124",
            color:"#cccccc"
          },
        }
      }
    }
  },
});

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {children}
    </ThemeProvider>
  );
};

export default AppLayout;
