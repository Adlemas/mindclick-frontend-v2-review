import { FC } from "react";
import { Card, Form, Image, Typography } from "antd";
import { RiLoginCircleLine } from "react-icons/ri";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";

import LogoImg from "@/assets/mindclickon-icon.png";

import styles from "./styles.module.scss";

const { Title, Text } = Typography;
const { Item } = Form;

const LoginView: FC = () => (
  <div className={styles.loginView__Wrapper}>
    <Card className={styles.loginView__Card}>
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
          <Button
            type="primary"
            htmlType="submit"
            icon={<RiLoginCircleLine />}
            block
          >
            Войти
          </Button>
        </Item>
        <Item>
          <Button
            type="outline"
            href="https://sites.google.com/view/mindclickoncom/%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F"
            target="_blank"
            block
            secondary
          >
            О портале
          </Button>
        </Item>
        <Item>
          <Text className={styles.loginView__Register}>
            Еще не зарегистрированы?
            <Button
              type="link"
              target="_blank"
              href="https://forms.gle/ASBuS7k6VxmEG3p48"
            >
              Подать заявку
            </Button>
          </Text>
        </Item>
      </Form>
      <Text className={styles.loginView__Brand}>
        <Image src={LogoImg.src} alt="Logo" width={30} />
        <span>MindClick</span>
      </Text>
    </Card>
  </div>
);

export default LoginView;
