import { FC } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { RiLineChartLine, RiUserLine } from "react-icons/ri";

import styles from "./styles.module.scss";

const { Item } = Menu;

const DashboardMenu: FC = () => (
  <div>
    <Menu theme="light" className={styles.menu}>
      <Item>
        <Link href="/">
          <RiLineChartLine size={16} />
        </Link>
      </Item>
      <Item>
        <Link href="/members">
          <RiUserLine size={16} />
        </Link>
      </Item>
    </Menu>
  </div>
);

export default DashboardMenu;
