import { FC } from "react";
import { Layout } from "antd";

import styles from "./styles.module.scss";

const { Header } = Layout;

const DashboardNav: FC = () => (
  <Header className={styles.header}>
    <div>left</div>
    <div>middle</div>
    <div>right</div>
  </Header>
);

export default DashboardNav;
