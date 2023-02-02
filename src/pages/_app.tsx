import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { store } from "@/redux/store";
import LoginMiddleware from "@/app-middleware/LoginMiddleware";
import ProfileMiddleware from "@/app-middleware/ProfileMiddleware";

const MainLayout = ({ Component, pageProps }: AppProps) => (
  <LoginMiddleware>
    <ProfileMiddleware>
      <Component {...pageProps} />
    </ProfileMiddleware>
  </LoginMiddleware>
);

const App = dynamic(() => Promise.resolve(MainLayout), {
  ssr: false,
});

const AppWrapper = ({ Component, pageProps, router }: AppProps) => (
  <ConfigProvider
    locale={ruRU}
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        // yellow primary color
        // colorPrimary: "#FFC107",
        colorPrimary: "#593C8F",
        // colorTextLightSolid: "#141414",
        // colorTextSecondary: "#141414",
        colorTextLightSolid: "#fefefe",
        colorTextSecondary: "#DB5461",
        borderRadius: 4,
        controlHeight: 36,
        // colorFill: "red",
        // colorFillSecondary: "blue",
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
        Pagination: {
          colorPrimary: "#DB5461",
          colorPrimaryHover: "#b4404b",
        },
      },
    }}
  >
    <Provider store={store}>
      <App pageProps={pageProps} Component={Component} router={router} />
    </Provider>
  </ConfigProvider>
);

export default AppWrapper;
