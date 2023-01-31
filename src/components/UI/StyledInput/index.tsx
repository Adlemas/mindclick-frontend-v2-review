import { FC } from "react";
import { Input, InputProps } from "antd";
import type { SearchProps } from "antd/lib/input";

interface IStyledInputProps extends InputProps, SearchProps {}

const StyledInput: FC<IStyledInputProps> = (props) => {
  const { type, ...rest } = props;

  if (type === "password") {
    return <Input.Password {...rest} />;
  }

  if (type === "search") {
    return <Input.Search {...rest} />;
  }

  return <Input {...rest} />;
};

export default StyledInput;
