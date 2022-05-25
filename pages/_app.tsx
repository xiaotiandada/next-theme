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
import App from "next/app";
// import withDarkMode from "next-dark-mode";

enum ThemeMode {
  Light = "light",
  Dark = "dark",
  System = "system",
}

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

function getActiveTheme(themeMode: ThemeMode) {
  return themeMode === ThemeMode.Light
    ? lightTheme
    : themeMode === ThemeMode.Dark
    ? darkTheme
    : lightTheme;
}

function Provider({ children }: { children: React.ReactNode }) {
  const { theme: themeNext, resolvedTheme } = useTheme();
  console.log("themeNext", themeNext, resolvedTheme);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log("prefersDarkMode", prefersDarkMode);
  const [activeTheme, setActiveTheme] = useState(
    getActiveTheme(ThemeMode.Light)
  );

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
  console.log("pageProps", pageProps);
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

// 如果需要 可以考虑用 cookie 传递服务端的主题，因为 next-themes 使用的是 localstore 存储
// 大部分情况 不需要
// 可供参考：https://github.com/xeoneux/next-dark-mode/blob/main/src/index.tsx
// 使用 cookies 不是一个好主意 https://github.com/pacocoursey/next-themes/issues/17
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   console.log("appContext", appContext);
//   console.log("appContext ctx req", appContext.ctx.req);
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   appProps.pageProps.theme = "light";
//   console.log("appProps", appProps);

//   return { ...appProps };
// };

export default MyApp;
// export default withDarkMode(MyApp);
