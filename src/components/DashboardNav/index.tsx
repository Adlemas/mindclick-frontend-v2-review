import { FC, ReactNode } from "react";
import { Layout } from "antd";

import styles from "./styles.module.scss";

const { Header } = Layout;

interface IDashboardNavProps {
  children?: ReactNode;
  title?: string;
}

const DashboardNav: FC<IDashboardNavProps> = ({ children, title }) => (
  <Header className={styles.header}>
    <div>left</div>
    <div>{title}</div>
    <div>{children}</div>
  </Header>
);

DashboardNav.defaultProps = {
  children: null,
  title: "",
};

export default DashboardNav;
