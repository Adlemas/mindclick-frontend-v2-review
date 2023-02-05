import type { FC } from "react";
import { BlockPicker } from "react-color";
import { Popover, theme } from "antd";
import classNames from "classnames";
import StyledInput from "@/components/UI/StyledInput";

import styles from "./styles.module.scss";
import Theme from "@/types/theme";

interface ColorPickerProps {
  color?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const { theme: currentTheme } = theme.useToken();
  const isDark = currentTheme.id === Theme.Dark;

  return (
    <StyledInput
      value={color}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
      placeholder="Например #345f42"
      addonBefore={
        <Popover
          showArrow={false}
          overlayClassName={styles.popover}
          content={
            <BlockPicker
              color={color}
              onChangeComplete={(newColor) => {
                if (onChange) onChange(newColor.hex);
              }}
              className={classNames(styles.color_picker, {
                [styles.color_picker_dark]: isDark,
              })}
            />
          }
        >
          <div className={styles.color} style={{ backgroundColor: color }} />
        </Popover>
      }
    />
  );
};

ColorPicker.defaultProps = {
  color: undefined,
  onChange: undefined,
};

export default ColorPicker;
