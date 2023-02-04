import { FC, ReactNode, useState } from "react";
import { Menu, theme } from "antd";
import { RiHomeFill, RiHomeLine, RiUserFill, RiUserLine } from "react-icons/ri";

import { useRouter } from "next/router";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import styles from "./styles.module.scss";

interface ItemProps {
  icon: ReactNode;
  hoverIcon: ReactNode;
  itemKey: string;
  hoverKey?: string;
  hoverTitle?: string;
  pathname: string;
  // eslint-disable-next-line no-unused-vars
  handleMouse: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleClick: (key: string) => void;
}

const renderItem = (props: ItemProps): MenuItemType => {
  const {
    itemKey,
    icon,
    hoverIcon,
    handleMouse,
    handleClick,
    hoverKey,
    hoverTitle,
    pathname,
  } = props;

  const { token } = theme.useToken();
  const { colorPrimary, colorTextLightSolid } = token;

  return {
    key: itemKey,
    icon: hoverKey === itemKey ? hoverIcon : icon,
    title: hoverTitle,
    style:
      pathname === itemKey
        ? { color: colorTextLightSolid, backgroundColor: colorPrimary }
        : undefined,
    onClick: () => handleClick(itemKey),
    onMouseEnter: () => handleMouse(itemKey),
    onMouseLeave: () => handleMouse(itemKey),
  };
};

const DashboardMenu: FC = () => {
  const { pathname } = useRouter();

  const selectedKeys = [pathname];
  const [hoverKey, setHoverKey] = useState<string>();

  const router = useRouter();

  const handleClick = (itemKey: string) => {
    router.push(itemKey);
  };

  const handleMouse = (key: string) =>
    setHoverKey((prev) => (prev === key ? undefined : key));

  const commonProps = {
    pathname,
    handleMouse,
    handleClick,
    hoverKey,
  };

  return (
    <div>
      <Menu
        theme="light"
        className={styles.menu}
        selectedKeys={selectedKeys}
        items={[
          renderItem({
            icon: <RiHomeLine />,
            hoverIcon: <RiHomeFill />,
            itemKey: "/",
            hoverTitle: "Главная",
            ...commonProps,
          }),
          renderItem({
            icon: <RiUserLine />,
            hoverIcon: <RiUserFill />,
            itemKey: "/members",
            hoverTitle: "Участники",
            ...commonProps,
          }),
        ]}
      />
    </div>
  );
};

export default DashboardMenu;
