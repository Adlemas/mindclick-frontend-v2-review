import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider, theme } from "antd";

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
    }}
  >
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
