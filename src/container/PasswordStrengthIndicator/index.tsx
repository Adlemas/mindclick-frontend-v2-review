import type { FC, ReactNode } from "react";
import React, { Children } from "react";
import { Slider, Typography } from "antd";

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import styles from "./styles.module.scss";

interface PasswordStrengthIndicatorProps {
  children: ReactNode;
}

const { Text } = Typography;

export const passwordSuggestions = [
  {
    message: "Не менее 8 символов",
    regex: /(?=.{8,})/,
  },
  {
    message: "Не менее 1 цифры",
    regex: /(?=.*\d)/,
  },
  {
    message: "Не менее 1 спецсимвола",
    regex: /(?=.*\W)/,
  },
  {
    message: "Не менее 1 заглавной буквы",
    regex: /(?=.*[A-Z])/,
  },
];

const getSliderColor = (value: string) => {
  const { length } = passwordSuggestions.filter((suggestion) =>
    suggestion.regex.test(value)
  );

  if (length === 0) {
    return "#f5222d";
  }

  if (length === 1) {
    return "#faad14";
  }

  if (length === 2) {
    return "#faad14";
  }

  if (length === 3) {
    return "#52c41a";
  }

  return "#52c41a";
};

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = (
  props
) => {
  const { children, ...formItemProps } = props;
  const value = (formItemProps as any).value ?? "";

  const childrenWithProps = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...formItemProps });
    }
    return child;
  });

  return (
    <>
      <div>
        <ul className={styles.indicator__suggestions}>
          {passwordSuggestions.map((suggestion) => (
            <li
              key={suggestion.message}
              className={styles.indicator__suggestion}
            >
              {value && suggestion.regex.test(value) ? (
                <RiCheckboxCircleLine color="green" />
              ) : (
                <RiCheckboxBlankCircleLine color="#555" />
              )}{" "}
              <Text type="secondary">{suggestion.message}</Text>
            </li>
          ))}
        </ul>
      </div>
      {childrenWithProps}
      <div>
        <Slider
          handleStyle={{
            display: "none",
          }}
          min={0}
          value={
            passwordSuggestions.filter((suggestion) =>
              suggestion.regex.test(value)
            ).length + 1
          }
          trackStyle={{
            backgroundColor: getSliderColor(value),
          }}
          max={passwordSuggestions.length + 1}
        />
      </div>
    </>
  );
};

export default PasswordStrengthIndicator;
