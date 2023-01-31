import { FC, ReactNode } from "react";
import { Image, Layout } from "antd";

import LogoImg from "@/assets/mindclickon-icon.png";
import DashboardMenu from "@/components/DashboardMenu";

import styles from "./styles.module.scss";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const { Sider, Content } = Layout;

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  const handleLogout = () => {
    window.dispatchEvent(new Event("forceLogout"));
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Layout>
      <Sider theme="light" className={styles.sider}>
        <Image src={LogoImg.src} alt="Logo" width={50} preview={false} />
        <DashboardMenu />
      </Sider>
      <Content>
        <DashboardNav>
          <Button type="outline" onClick={handleLogout} secondary>
            Logout
          </Button>
        </DashboardNav>
        {children}
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
