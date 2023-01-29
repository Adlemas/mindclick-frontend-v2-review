import { FC } from "react";
import { Input, InputProps } from "antd";

interface IStyledInputProps extends InputProps {}

const StyledInput: FC<IStyledInputProps> = (props) => {
  const { type, ...rest } = props;

  if (type === "password") {
    return <Input.Password {...rest} />;
  }

  return <Input {...rest} />;
};

export default StyledInput;
