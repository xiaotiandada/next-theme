import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as ThemeProviderMUI,
} from "@mui/material/styles";
import { useTheme } from "next-themes";
import useMediaQuery from "@mui/material/useMediaQuery";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type ThemeMode = "light" | "dark";

function getActiveTheme(themeMode: ThemeMode) {
  return themeMode === "light"
    ? lightTheme
    : themeMode === "dark"
    ? darkTheme
    : lightTheme;
}

function Provider({ children }: { children: React.ReactNode }) {
  const { theme: themeNext, resolvedTheme } = useTheme();
  console.log("themeNext", themeNext, resolvedTheme);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("prefersDarkMode", prefersDarkMode);
  const [activeTheme, setActiveTheme] = useState(lightTheme);

  useEffect(() => {
    setActiveTheme(getActiveTheme(resolvedTheme as ThemeMode));
  }, [resolvedTheme]);

  return (
    <>
      <ThemeProviderMUI theme={activeTheme}>{children}</ThemeProviderMUI>
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider attribute="class">
        <Provider>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
