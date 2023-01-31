import { FC, ReactNode } from "react";
import { Avatar, Layout, theme, Typography } from "antd";

import { isEqual } from "lodash";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/redux/hooks";
import Theme from "@/types/theme";

const { Header } = Layout;
const { Text } = Typography;

interface IDashboardNavProps {
  children?: ReactNode;
  title?: string;
}

const DashboardNav: FC<IDashboardNavProps> = ({ children, title }) => {
  const { profile } = useAppSelector((state) => state.profile, isEqual);
  const { token, theme: currentTheme } = theme.useToken();
  const { colorTextLightSolid, colorText, colorBgContainer, colorPrimary } =
    token;

  return (
    <Header
      className={styles.header}
      style={{
        background: currentTheme.id === Theme.Dark ? colorBgContainer : "#fff",
      }}
    >
      <div>
        <div className={styles.organization}>
          <Avatar
            src={profile?.profileImg}
            style={{
              backgroundColor:
                currentTheme.id === Theme.Light
                  ? colorTextLightSolid
                  : colorPrimary,
              color: currentTheme.id === Theme.Light ? "#fff" : colorText,
            }}
          >
            {profile?.firstName?.charAt(0)}
          </Avatar>
          <div>
            <Text type="secondary">Не привязано к центру</Text>
            <Text>{profile?.email}</Text>
          </div>
        </div>
      </div>
      <div>{title}</div>
      <div>{children}</div>
    </Header>
  );
};

DashboardNav.defaultProps = {
  children: null,
  title: "",
};

export default DashboardNav;
