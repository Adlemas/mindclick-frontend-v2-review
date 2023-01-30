import { FC } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { RiLineChartLine } from "react-icons/ri";

const { Item } = Menu;

const DashboardMenu: FC = () => (
  <div>
    <Menu theme="dark">
      <Item>
        <Link href="/">
          <RiLineChartLine size={16} />
        </Link>
      </Item>
    </Menu>
  </div>
);

export default DashboardMenu;
