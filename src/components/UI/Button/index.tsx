import { Button as AntButton, ButtonProps, theme } from "antd";
import { FC } from "react";

interface IButtonProps extends ButtonProps {
  secondary?: boolean;
}

const Button: FC<IButtonProps> = (props) => {
  const { secondary, ...rest } = props;
  const { token } = theme.useToken();

  return (
    <AntButton
      {...props}
      style={{
        ...rest.style,
        backgroundColor: secondary
          ? token.colorTextLightSolid
          : token.colorPrimary,
        color: secondary ? token.colorWhite : token.colorTextLightSolid,
      }}
    />
  );
};

Button.defaultProps = {
  secondary: false,
};

export default Button;
