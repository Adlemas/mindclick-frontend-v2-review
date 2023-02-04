import { FC, ReactNode } from "react";
import { Image, Layout, theme } from "antd";

import LogoImg from "@/assets/mindclickon-icon.png";
import DashboardMenu from "@/components/DashboardMenu";

import styles from "./styles.module.scss";
import Theme from "@/types/theme";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const { Sider, Content } = Layout;

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  const { theme: currentTheme } = theme.useToken();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Layout>
      <Sider
        theme="light"
        className={styles.sider}
        collapsed
        style={{
          borderColor: currentTheme.id === Theme.Light ? "#e8e8e8" : "#252525",
        }}
      >
        <Image src={LogoImg.src} alt="Logo" width={50} preview={false} />
        <DashboardMenu />
      </Sider>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};

export default DashboardLayout;
