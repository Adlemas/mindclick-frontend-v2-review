import { Button as AntButton, ButtonProps, theme } from "antd";
import { FC } from "react";

interface IButtonProps extends Omit<ButtonProps, "type"> {
  secondary?: boolean;
  type?: "primary" | "outline" | "link" | "text";
}

const Button: FC<IButtonProps> = (props) => {
  const { secondary, type, ...rest } = props;
  const { token } = theme.useToken();

  // eslint-disable-next-line no-nested-ternary
  const textColor = secondary
    ? type === "outline"
      ? token.colorTextSecondary
      : token.colorTextLightSolid
    : token.colorTextLightSolid;
  const backgroundColor = secondary
    ? token.colorTextSecondary
    : token.colorPrimary;

  return (
    <AntButton
      {...props}
      type={type === "outline" ? "default" : type}
      style={{
        ...rest.style,
        ...(type === "primary" && {
          color: textColor,
          backgroundColor,
        }),
        ...(type === "outline" && {
          color: textColor,
          borderColor: backgroundColor,
        }),
      }}
    />
  );
};

Button.defaultProps = {
  secondary: false,
  type: "primary",
};

export default Button;
