import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as ThemeProviderMUI,
} from "@mui/material/styles";
import { useTheme } from "next-themes";

function Provider({ children }: { children: React.ReactNode }) {
  const { theme: themeNext, resolvedTheme, setTheme } = useTheme();
  console.log("themeNext", themeNext, resolvedTheme);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: (resolvedTheme || "light") as "light" | "dark",
        },
      }),
    [resolvedTheme]
  );

  return (
    <>
      <ThemeProviderMUI theme={theme}>{children}</ThemeProviderMUI>
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <Provider>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
