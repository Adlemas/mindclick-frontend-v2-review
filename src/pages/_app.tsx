import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider, theme } from "antd";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    locale={ruRU}
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
