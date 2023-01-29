import { FC } from "react";
import { Card, Form, Typography } from "antd";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";

const { Title } = Typography;
const { Item } = Form;

const LoginView: FC = () => (
  <div>
    <Card>
      <Title level={2}>Добро пожаловать!</Title>
      <Title level={4}>Пожалуйста, войдите в свой аккаунт</Title>
      <Form layout="vertical">
        <Item label="Email" name="email">
          <StyledInput placeholder="Введите email" />
        </Item>
        <Item label="Пароль" name="password">
          <StyledInput placeholder="Введите пароль" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Item>
      </Form>
    </Card>
  </div>
);

export default LoginView;
