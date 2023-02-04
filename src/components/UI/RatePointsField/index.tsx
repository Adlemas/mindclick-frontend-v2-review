import type { FC } from "react";
import { Col, Form, InputNumber, Row } from "antd";
import { RiCoinsLine, RiTrophyLine } from "react-icons/all";

const { Item } = Form;

const RatePointsField: FC = () => (
  <Row gutter={12} align="middle">
    <Col span={12}>
      <Item
        name="rate"
        label="Кубков"
        rules={[
          {
            required: true,
            message: "Кубки обязательны!",
          },
          {
            type: "number",
            min: 0,
            message: "Кубки не могут быть отрицательными!",
          },
        ]}
        required
      >
        <InputNumber addonBefore={<RiTrophyLine />} placeholder="0" />
      </Item>
    </Col>
    <Col span={12}>
      <Item
        name="points"
        label="Монет"
        rules={[
          {
            required: true,
            message: "Монеты обязательны!",
          },
          {
            type: "number",
            min: 0,
            message: "Монеты не могут быть отрицательными!",
          },
        ]}
        required
      >
        <InputNumber addonBefore={<RiCoinsLine />} placeholder="0" />
      </Item>
    </Col>
  </Row>
);

export default RatePointsField;
