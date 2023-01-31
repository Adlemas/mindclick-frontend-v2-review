import type { FC } from "react";
import { theme, Typography } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import { isEqual } from "lodash";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";

import styles from "./styles.module.scss";
import Theme from "@/types/theme";
import { useAppSelector } from "@/redux/hooks";

const { Text } = Typography;

const MembersSearch: FC = () => {
  const { token, theme: currentTheme } = theme.useToken();
  const { colorBgContainer } = token;

  const totalMembers = useAppSelector(
    (state) => state.members.totalCount,
    isEqual
  );

  return (
    <div
      className={styles.search__Wrapper}
      style={{
        backgroundColor:
          currentTheme.id === Theme.Light ? "#fafafa" : colorBgContainer,
      }}
    >
      <div>
        <StyledInput
          className={styles.search__Input}
          placeholder="Искать по имени/почте/группе"
          allowClear
        />
        <Button icon={<RiSearch2Line />} className={styles.search__Button}>
          Поиск
        </Button>
      </div>
      <div>
        <Text className={styles.search__Result}>
          Найдено <Text strong>{totalMembers ?? 0}</Text> пользователей
        </Text>
      </div>
    </div>
  );
};

export default MembersSearch;
