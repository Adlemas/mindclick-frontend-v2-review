import { FC, useEffect } from "react";
import { Col, Form, message, Row } from "antd";
import { isEqual } from "lodash";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateGroupAction } from "@/redux/slices/groups";
import ColorPicker from "@/components/UI/ColorPicker";

const { Item, useForm } = Form;

interface EditGroupFormProps {
  onCancel?: () => void;
}

interface FormValues {
  name: string;
  color: string;
}

const initialValues: FormValues = {
  name: "",
  color: "#1e90ff",
};

const EditGroupForm: FC<EditGroupFormProps> = ({ onCancel }) => {
  const { updating: loading, group } = useAppSelector(
    (state) => state.groups,
    isEqual
  );
  const dispatch = useAppDispatch();

  const [form] = useForm();

  const handleSubmit = (values: FormValues) => {
    if (!group) {
      message.error("Не удалось получить группу");
      return;
    }

    dispatch(
      updateGroupAction({
        // eslint-disable-next-line no-underscore-dangle
        groupId: group._id,
        name: values.name,
        color: values.color,
      })
    ).then((value) => {
      if (!(value as any).error) {
        form.resetFields();
        if (onCancel) onCancel();
      }
    });
  };

  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        name: group.name,
        color: group.color,
      });
    }
  }, [group, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Item
        name="name"
        label="Название группы"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите название группы",
          },
          {
            min: 3,
            message: "Название группы должно быть не менее 3 символов",
          },
          {
            max: 50,
            message: "Название группы должно быть не более 50 символов",
          },
        ]}
        required
      >
        <StyledInput placeholder="Название группы" maxLength={50} />
      </Item>
      <Item
        name="color"
        valuePropName="color"
        label="Цвет"
        tooltip="Чтобы указать цвет группы используйте HEX-код или нажмите на кружок снизу для выбора готового цвета"
        rules={[
          {
            required: true,
            message: "Пожалуйста, выберите цвет группы",
          },
          {
            pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            message: "Пожалуйста, введите корректный цвет группы",
          },
        ]}
        required
      >
        <ColorPicker />
      </Item>
      <Item>
        <Row gutter={12}>
          <Col>
            <Button loading={loading} htmlType="submit">
              Сохранить
            </Button>
          </Col>
          <Col>
            <Button type="outline" onClick={onCancel} secondary>
              Отмена
            </Button>
          </Col>
        </Row>
      </Item>
    </Form>
  );
};

EditGroupForm.defaultProps = {
  onCancel: () => {},
};

export default EditGroupForm;
