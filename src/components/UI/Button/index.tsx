import { Button as AntButton, ButtonProps, theme } from "antd";
import { FC } from "react";
import Theme from "@/types/theme";

interface IButtonProps extends Omit<ButtonProps, "type"> {
  secondary?: boolean;
  type?: "primary" | "outline" | "link" | "text";
}

const Button: FC<IButtonProps> = (props) => {
  const { secondary, type, ...rest } = props;
  const { token, theme: currentTheme } = theme.useToken();

  const textColor = secondary ? token.colorWhite : token.colorTextLightSolid;
  const backgroundColor = secondary
    ? token.colorTextLightSolid
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
          color:
            currentTheme.id === Theme.Dark
              ? token.colorPrimary
              : backgroundColor,
          borderColor:
            currentTheme.id === Theme.Dark
              ? token.colorPrimary
              : backgroundColor,
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
