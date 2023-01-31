import { FC, ReactNode } from "react";
import { Layout } from "antd";

import styles from "./styles.module.scss";

const { Header } = Layout;

interface IDashboardNavProps {
  children?: ReactNode;
}

const DashboardNav: FC<IDashboardNavProps> = ({ children }) => (
  <Header className={styles.header}>
    <div>left</div>
    <div>middle</div>
    <div>{children}</div>
  </Header>
);

DashboardNav.defaultProps = {
  children: null,
};

export default DashboardNav;
