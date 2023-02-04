import type { FC } from "react";
import { Col, Form, Row, DatePicker } from "antd";
import { useEffect, useMemo } from "react";
import { isEqual, uniqBy } from "lodash";
import moment, { Moment } from "moment";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";
import Select from "@/components/UI/Select";
import countryPhoneData from "@/data/countryPhoneData";

import styles from "./styles.module.scss";
import PasswordStrengthIndicator, {
  passwordSuggestions,
} from "@/container/PasswordStrengthIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getGroupsAction } from "@/redux/slices/groups";
import { createMemberAction } from "@/redux/slices/members";
import RatePointsField from "@/components/UI/RatePointsField";

const { Item, useForm } = Form;

export interface AddMemberFormProps {
  onCancel?: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    mobile: string;
    code: string;
  };
  birthDate: Moment;
  rate: number;
  points: number;
  password: string;
  groupId: string;
  password_repeat: string;
}

const AddMemberForm: FC<AddMemberFormProps> = ({ onCancel }) => {
  const { loading: groupsLoading, records } = useAppSelector(
    (state) => state.groups,
    isEqual
  );
  const creating = useAppSelector((state) => state.members.creating, isEqual);

  const [form] = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const groupsOptions = useMemo(
    () =>
      records.map((d) => ({
        // eslint-disable-next-line no-underscore-dangle
        value: d._id,
        label: d.name,
      })),
    [records]
  );

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

  const onSubmit = (values: FormValues) => {
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const email = values.email.trim();
    const phone = values.phone.code + values.phone.mobile.trim();
    const birthDate = values.birthDate.toJSON();
    const password = values.password.trim();
    const { groupId } = values;
    const { rate } = values;
    const { points } = values;

    dispatch(
      createMemberAction({
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        password,
        rate,
        points,
        groupId,
      })
    ).then(() => {
      form.resetFields();
      if (onCancel) onCancel();
    });
  };

  useEffect(() => {
    if (!groupsLoading) {
      dispatch(getGroupsAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      className={styles.form}
      layout="vertical"
      form={form}
      initialValues={
        {
          firstName: "",
          lastName: "",
          email: "",
          birthDate: moment().subtract(1, "years"),
          phone: {
            mobile: "",
            code: "+7",
          },
          password: "",
          password_repeat: "",
        } as FormValues
      }
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
        label="Группа"
        name="groupId"
        rules={[
          {
            required: true,
            message: "Пожалуйста, выберите группу!",
          },
        ]}
        required
      >
        <Select
          loading={groupsLoading}
          options={groupsOptions}
          placeholder="Выберите группу"
        />
      </Item>
      <RatePointsField />
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
            <Button htmlType="submit" loading={creating}>
              Создать
            </Button>
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
