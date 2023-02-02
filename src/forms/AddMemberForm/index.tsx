import type { FC } from "react";
import { Col, Form, Row, DatePicker } from "antd";
import { useMemo } from "react";
import { uniqBy } from "lodash";
import moment from "moment";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";
import Select from "@/components/UI/Select";
import countryPhoneData from "@/data/countryPhoneData";

import styles from "./styles.module.scss";
import PasswordStrengthIndicator, {
  passwordSuggestions,
} from "@/container/PasswordStrengthIndicator";

const { Item, useForm } = Form;

export interface AddMemberFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
}

const AddMemberForm: FC<AddMemberFormProps> = ({ onSubmit, onCancel }) => {
  const [form] = useForm();

  const countryCodeOptions = useMemo(
    () =>
      uniqBy(countryPhoneData, (item) => {
        if (item.value) {
          return item.value;
        }
        return item.code;
      }).map((d) => ({
        value: d.value ?? d.code,
        label: d.value ?? d.code,
      })),
    []
  );

  return (
    <Form
      className={styles.form}
      layout="vertical"
      form={form}
      onFinish={onSubmit}
    >
      <Item
        label="Имя"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите имя!",
          },
        ]}
        required
      >
        <StyledInput placeholder="Введите имя..." />
      </Item>
      <Item
        label="Фамилия"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите фамилию!",
          },
        ]}
        required
      >
        <StyledInput placeholder="Введите фамилия..." />
      </Item>
      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите email!",
          },
          {
            type: "email",
            message: "Пожалуйста, введите корректный email!",
          },
        ]}
        required
      >
        <StyledInput placeholder="Введите email..." />
      </Item>
      <Item
        label="Номер телефона"
        name={["phone", "mobile"]}
        rules={[
          {
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              if (value.length < 10) {
                return Promise.reject(
                  new Error("Длина номера должна быть не менее 10 символов!")
                );
              }
              return Promise.resolve();
            },
          },
          {
            required: true,
            message: "Пожалуйста, введите номер телефона!",
          },
        ]}
        required
      >
        <StyledInput
          addonBefore={
            <Item name={["phone", "code"]} noStyle>
              <Select
                style={{
                  minWidth: 70,
                }}
                placeholder="Код"
                optionFilterProp="label"
                showSearch
                options={countryCodeOptions}
              />
            </Item>
          }
          placeholder="xxx-xxx-xxxx"
        />
      </Item>
      <Item
        name="birthDate"
        label="Дата рождения"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите дату рождения!",
          },
          {
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              if (moment().diff(value, "years") < 3) {
                return Promise.reject(
                  new Error("Возраст должен быть не менее 3 лет!")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        required
      >
        <DatePicker
          placeholder="Выберите дату рождения..."
          format="DD-MM-YYYY"
          disabledDate={(current) =>
            current && current > moment().startOf("day")
          }
        />
      </Item>
      <Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
          ...passwordSuggestions.map((suggestion) => ({
            pattern: suggestion.regex,
            message: suggestion.message,
          })),
        ]}
        validateTrigger="onSubmit"
        required
      >
        <PasswordStrengthIndicator>
          <StyledInput type="password" placeholder="Придумайте пароль..." />
        </PasswordStrengthIndicator>
      </Item>
      <Item
        label="Повтор пароля"
        name="password_repeat"
        rules={[
          {
            validator(_, value) {
              if (!value || form.getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          },
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
        ]}
      >
        <StyledInput type="password" placeholder="Повторите пароль..." />
      </Item>
      <Item>
        <Row gutter={12}>
          <Col>
            <Button htmlType="submit">Создать</Button>
          </Col>
          <Col>
            <Button onClick={onCancel} type="outline" secondary>
              Отмена
            </Button>
          </Col>
        </Row>
      </Item>
    </Form>
  );
};

export default AddMemberForm;
