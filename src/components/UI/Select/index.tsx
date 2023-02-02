import { SelectProps, Select as AntSelect } from "antd";
import type { FC } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

export interface ISelectProps extends SelectProps {}

const Select: FC<ISelectProps> = (props) => (
  <AntSelect suffixIcon={<RiArrowDownSLine />} {...props} />
);

export default Select;
