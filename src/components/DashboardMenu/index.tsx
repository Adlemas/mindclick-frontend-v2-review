import { FC } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { RiLineChartLine } from "react-icons/ri";

const DashboardMenu: FC = () => (
  <div>
    <Menu theme="dark">
      <Menu.Item>
        <Link href="/">
          <RiLineChartLine />
        </Link>
      </Menu.Item>
    </Menu>
  </div>
);

export default DashboardMenu;
