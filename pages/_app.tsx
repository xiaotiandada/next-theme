import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider as ThemeProviderMUI,
  styled,
} from "@mui/material/styles";
import { orange } from "@mui/material/colors";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        status: {
          danger: orange[500],
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProviderMUI theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProviderMUI>
    </ThemeProvider>
  );
}

export default MyApp;
