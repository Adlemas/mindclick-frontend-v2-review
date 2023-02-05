import { FC, ReactNode } from "react";
import { Layout, theme } from "antd";

import Head from "next/head";
import styles from "./styles.module.scss";
import Theme from "@/types/theme";
import Profile from "@/components/DashboardNav/Profile";

const { Header } = Layout;

interface IDashboardNavProps {
  children?: ReactNode;
  title?: string;
}

const DashboardNav: FC<IDashboardNavProps> = ({ children, title }) => {
  const { token, theme: currentTheme } = theme.useToken();
  const { colorBgContainer } = token;

  return (
    <>
      <Head>
        <title>MindClick - {title}</title>
      </Head>
      <Header
        className={styles.header}
        style={{
          background:
            currentTheme.id === Theme.Dark ? colorBgContainer : "#fff",
          borderColor: currentTheme.id === Theme.Light ? "#e8e8e8" : "#252525",
        }}
      >
        <div>
          <Profile />
        </div>
        <div>{title}</div>
        <div>{children}</div>
      </Header>{" "}
    </>
  );
};

DashboardNav.defaultProps = {
  children: null,
  title: "",
};

export default DashboardNav;
