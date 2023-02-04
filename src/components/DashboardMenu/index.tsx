import { FC, ReactNode, useState } from "react";
import { Menu, theme } from "antd";
import {
  RiAdminFill,
  RiAdminLine,
  RiGamepadLine,
  RiGroup2Fill,
  RiGroup2Line,
  RiHomeFill,
  RiHomeLine,
  RiPrinterLine,
  RiSettings3Fill,
  RiSettings3Line,
  RiTaskFill,
  RiTaskLine,
  RiUserFill,
  RiUserLine,
  RiVideoChatFill,
  RiVideoChatLine,
} from "react-icons/ri";

import { useRouter } from "next/router";
import type { MenuItemType } from "antd/lib/menu/hooks/useItems";
import styles from "./styles.module.scss";

interface ItemProps extends Omit<MenuItemType, "key"> {
  key: string;
  icon?: ReactNode;
  token: ReturnType<typeof theme.useToken>["token"];
  hoverIcon?: ReactNode;
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
    key,
    icon,
    hoverIcon,
    token,
    handleMouse,
    handleClick,
    hoverKey,
    hoverTitle,
    pathname,
    ...rest
  } = props;

  const { colorPrimary, colorTextLightSolid } = token;

  return {
    key,
    icon: hoverKey === key ? hoverIcon : icon,
    title: hoverTitle,
    style:
      pathname === key
        ? { color: colorTextLightSolid, backgroundColor: colorPrimary }
        : undefined,
    ...rest,
    onClick: () => handleClick(key),
    onMouseEnter: () => handleMouse(key),
    onMouseLeave: () => handleMouse(key),
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

  const { token } = theme.useToken();

  const commonProps = {
    pathname,
    token,
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
            key: "/",
            hoverTitle: "Главная",
            ...commonProps,
          }),
          renderItem({
            icon: <RiUserLine />,
            hoverIcon: <RiUserFill />,
            key: "/members",
            hoverTitle: "Участники",
            ...commonProps,
          }),
          renderItem({
            icon: <RiGroup2Line />,
            hoverIcon: <RiGroup2Fill />,
            key: "/groups",
            hoverTitle: "Группы",
            ...commonProps,
          }),
          {
            icon: <RiGamepadLine />,
            title: "Игры",
            key: "/games",
            children: [
              renderItem({
                key: "/games/mental-arithmetic",
                hoverTitle: "Сложение/вычитание",
                label: "Сложение/вычитание",
                ...commonProps,
              }),
              renderItem({
                key: "/games/multiply",
                hoverTitle: "Умножение",
                label: "Умножение",
                ...commonProps,
              }),
              renderItem({
                key: "/games/tables",
                hoverTitle: "Столбики",
                label: "Столбики",
                ...commonProps,
              }),
              renderItem({
                key: "/games/divide",
                hoverTitle: "Деление",
                label: "Деление",
                ...commonProps,
              }),
              renderItem({
                key: "/games/flash-cards",
                hoverTitle: "Флеш-карты",
                label: "Флеш-карты",
                ...commonProps,
              }),
              renderItem({
                key: "/games/shulte-table",
                hoverTitle: "Таблица Шульте",
                label: "Таблица Шульте",
                ...commonProps,
              }),
            ],
          },
          {
            icon: <RiPrinterLine />,
            title: "Печать",
            key: "/print",
            children: [
              renderItem({
                key: "/print/mental-arithmetic",
                hoverTitle: "Сложение/вычитание",
                label: "Сложение/вычитание",
                ...commonProps,
              }),
              renderItem({
                key: "/print/multiply",
                hoverTitle: "Умножение",
                label: "Умножение",
                ...commonProps,
              }),
              renderItem({
                key: "/print/divide",
                hoverTitle: "Деление",
                label: "Деление",
                ...commonProps,
              }),
            ],
          },
          renderItem({
            icon: <RiVideoChatLine />,
            hoverIcon: <RiVideoChatFill />,
            key: "/video",
            hoverTitle: "Конференции",
            ...commonProps,
          }),
          renderItem({
            icon: <RiTaskLine />,
            hoverIcon: <RiTaskFill />,
            key: "/tasks",
            hoverTitle: "Задания",
            ...commonProps,
          }),
          renderItem({
            icon: <RiAdminLine />,
            hoverIcon: <RiAdminFill />,
            key: "/admin",
            hoverTitle: "Администрирование",
            ...commonProps,
          }),
          renderItem({
            icon: <RiSettings3Line />,
            hoverIcon: <RiSettings3Fill />,
            key: "/settings",
            hoverTitle: "Настройки",
            className: styles.settings,
            ...commonProps,
          }),
        ]}
      />
    </div>
  );
};

export default DashboardMenu;
