import { FC } from "react";
import { Input, InputProps } from "antd";

interface IStyledInputProps extends InputProps {}

const StyledInput: FC<IStyledInputProps> = (props) => <Input {...props} />;

export default StyledInput;
