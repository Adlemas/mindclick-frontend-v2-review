import { Button as AntButton, ButtonProps } from "antd";
import { FC } from "react";

interface IButtonProps extends ButtonProps {}

const Button: FC<IButtonProps> = (props) => <AntButton {...props} />;

export default Button;
