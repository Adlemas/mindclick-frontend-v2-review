import type { FC } from "react";
import { theme, Typography } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import { isEqual } from "lodash";
import StyledInput from "@/components/UI/StyledInput";

import styles from "./styles.module.scss";
import Theme from "@/types/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getMembersAction,
  LOAD_MEMBERS_SIZE,
  setQuery,
} from "@/redux/slices/members";

const { Text } = Typography;

const MembersSearch: FC = () => {
  const { token, theme: currentTheme } = theme.useToken();
  const { colorBgContainer } = token;

  const query = useAppSelector((state) => state.members.query, isEqual);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleSearch = () => {
    dispatch(
      getMembersAction({
        size: LOAD_MEMBERS_SIZE,
        page: 1,
      })
    );
  };

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
          type="search"
          enterButton={
            <div className={styles.search__Input__Addon}>
              <RiSearch2Line />
              Поиск
            </div>
          }
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onSearch={handleSearch}
          className={styles.search__Input}
          placeholder="Искать по имени/почте/телефону"
          allowClear
        />
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
