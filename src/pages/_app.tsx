import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider, Spin, theme } from "antd";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getItemFromLocal } from "@/utils/localStorage";
import { refreshAction } from "@/redux/slices/auth";

interface MiddlewareProps {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}

const AppLoginMiddleware = ({ Component, pageProps }: MiddlewareProps) => {
  const router = useRouter();
  const { pathname } = router;

  const dispatch = useAppDispatch();

  const isAuthPage = pathname === "/login";
  const { isAuthenticated, refreshing } = useAppSelector((state) => state.auth);
  const localIsAuthenticated = getItemFromLocal("isAuthenticated");

  useEffect(() => {
    if (isAuthPage && isAuthenticated) {
      router.push("/");
      return;
    }

    if (!isAuthPage && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAuthenticated && localIsAuthenticated) {
      dispatch(refreshAction());
    }
  }, [localIsAuthenticated, isAuthenticated, isAuthPage, router, dispatch]);

  if (refreshing || (isAuthPage && localIsAuthenticated)) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Загрузка..." />
      </div>
    );
  }

  return <Component {...pageProps} />;
};

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    locale={ruRU}
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        // yellow primary color
        colorPrimary: "#FFC107",
        colorTextLightSolid: "#141414",
        borderRadius: 4,
        controlHeight: 36,
      },
      components: {
        Checkbox: {
          colorPrimary: "#141414",
          colorPrimaryHover: "#141414",
        },
        Radio: {
          colorPrimary: "#141414",
          colorPrimaryHover: "#141414",
        },
      },
    }}
  >
    <Provider store={store}>
      <AppLoginMiddleware pageProps={pageProps} Component={Component} />
    </Provider>
  </ConfigProvider>
);

export default App;
