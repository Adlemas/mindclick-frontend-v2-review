import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import LoginMiddleware from "@/app-middleware/LoginMiddleware";
import ProfileMiddleware from "@/app-middleware/ProfileMiddleware";

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
      <LoginMiddleware>
        <ProfileMiddleware>
          <Component {...pageProps} />
        </ProfileMiddleware>
      </LoginMiddleware>
    </Provider>
  </ConfigProvider>
);

export default App;
