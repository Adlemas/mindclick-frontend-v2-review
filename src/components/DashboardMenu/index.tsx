import { FC, ReactNode, useState } from "react";
import { Menu, theme } from "antd";
import Link from "next/link";
import { RiHomeFill, RiHomeLine, RiUserFill, RiUserLine } from "react-icons/ri";

import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface ItemProps {
  icon: ReactNode;
  hoverIcon: ReactNode;
  itemKey: string;
  hoverKey?: string;
  pathname: string;
  // eslint-disable-next-line no-unused-vars
  handleMouse: (key: string) => void;
}

const Item: FC<ItemProps> = (props) => {
  const {
    itemKey,
    icon,
    hoverIcon,
    handleMouse,
    hoverKey,
    pathname,
    ...nativeProps
  } = props;

  const { token } = theme.useToken();
  const { colorPrimary, colorTextLightSolid } = token;

  return (
    <Menu.Item
      {...nativeProps}
      key={itemKey}
      style={
        pathname === itemKey
          ? {
              backgroundColor: colorPrimary,
              color: colorTextLightSolid,
            }
          : {}
      }
      onMouseOver={() => handleMouse(itemKey)}
      onMouseOut={() => handleMouse(itemKey)}
    >
      <Link href={itemKey}>
        {pathname === itemKey || hoverKey === itemKey ? hoverIcon : icon}
      </Link>
    </Menu.Item>
  );
};

Item.defaultProps = {
  hoverKey: undefined,
};

const DashboardMenu: FC = () => {
  const { pathname } = useRouter();

  const selectedKeys = [pathname];
  const [hoverKey, setHoverKey] = useState<string>();

  const handleMouse = (key: string) =>
    setHoverKey((prev) => (prev === key ? undefined : key));

  return (
    <div>
      <Menu theme="light" className={styles.menu} selectedKeys={selectedKeys}>
        <Item
          icon={<RiHomeLine />}
          hoverIcon={<RiHomeFill />}
          itemKey="/"
          hoverKey={hoverKey}
          handleMouse={handleMouse}
          pathname={pathname}
        />
        <Item
          icon={<RiUserLine />}
          hoverIcon={<RiUserFill />}
          itemKey="/members"
          hoverKey={hoverKey}
          handleMouse={handleMouse}
          pathname={pathname}
        />
      </Menu>
    </div>
  );
};

export default DashboardMenu;
