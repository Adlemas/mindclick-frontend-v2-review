import { FC } from "react";
import { Checkbox, Form, Typography } from "antd";
import { RiLoginCircleLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/auth";
import handleFormError from "@/utils/handleFormError";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";
import styles from "@/views/LoginView/styles.module.scss";

const { Item } = Form;
const { Text } = Typography;

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: FC = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: FormValues) => {
    dispatch(loginAction(values));
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={handleFormError}
      layout="vertical"
    >
      <Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Email недействителен",
          },
          {
            required: true,
            message: "Пожалуйста, введите email",
          },
        ]}
        required
      >
        <StyledInput placeholder="Введите email" />
      </Item>
      <Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль",
          },
        ]}
        required
      >
        <StyledInput type="password" placeholder="Введите пароль" />
      </Item>
      <Item name="rememberMe" valuePropName="checked">
        <Checkbox>Запомнить меня</Checkbox>
      </Item>
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<RiLoginCircleLine />}
          loading={loading}
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
  );
};

export default LoginForm;
