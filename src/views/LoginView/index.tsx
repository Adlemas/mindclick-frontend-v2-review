import { FC } from "react";
import { Card, Image, Typography } from "antd";

import LogoImg from "@/assets/mindclickon-icon.png";

import styles from "./styles.module.scss";
import LoginForm from "@/components/Auth/LoginForm";

const { Title, Text } = Typography;

const LoginView: FC = () => (
  <div className={styles.loginView__Wrapper}>
    <Card className={styles.loginView__Card}>
      <Title level={2} className={styles.loginView__Title}>
        Добро пожаловать!
      </Title>
      <Title type="secondary" level={5} className={styles.loginView__Subtitle}>
        Пожалуйста, войдите в свой аккаунт
      </Title>
      <LoginForm />
      <Text className={styles.loginView__Brand}>
        <Image src={LogoImg.src} alt="Logo" width={30} />
        <span>MindClick</span>
      </Text>
    </Card>
  </div>
);

export default LoginView;
