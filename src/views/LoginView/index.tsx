import { FC } from "react";
import { Card, Form, Image, Typography } from "antd";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";

import LogoImg from "@/assets/mindclickon-icon.png";

import styles from "./styles.module.scss";

const { Title } = Typography;
const { Item } = Form;

const LoginView: FC = () => (
  <div className={styles.loginView__Wrapper}>
    <Card className={styles.loginView__Card}>
      <Image src={LogoImg.src} alt="Logo" />
      <Title level={2} className={styles.loginView__Title}>
        Добро пожаловать!
      </Title>
      <Title type="secondary" level={5} className={styles.loginView__Subtitle}>
        Пожалуйста, войдите в свой аккаунт
      </Title>
      <Form layout="vertical">
        <Item label="Email" name="email">
          <StyledInput placeholder="Введите email" />
        </Item>
        <Item label="Пароль" name="password">
          <StyledInput placeholder="Введите пароль" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Item>
      </Form>
    </Card>
  </div>
);

export default LoginView;
