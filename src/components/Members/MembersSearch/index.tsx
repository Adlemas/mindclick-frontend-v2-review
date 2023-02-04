import type { FC } from "react";
import { theme, Typography } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import { isEqual } from "lodash";
import { useEffect, useMemo } from "react";
import StyledInput from "@/components/UI/StyledInput";

import styles from "./styles.module.scss";
import Theme from "@/types/theme";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getMembersAction,
  LOAD_MEMBERS_SIZE,
  setGroupId,
  setQuery,
} from "@/redux/slices/members";
import Select from "@/components/UI/Select";
import { getGroupsAction } from "@/redux/slices/groups";

const { Text } = Typography;

const MembersSearch: FC = () => {
  const { token, theme: currentTheme } = theme.useToken();
  const { colorBgContainer } = token;

  const {
    query,
    groupId,
    totalCount: totalMembers,
  } = useAppSelector((state) => state.members, isEqual);
  const { records, loading: groupsLoading } = useAppSelector(
    (state) => state.groups,
    isEqual
  );
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleGroupIdChange = (value: string | null) => {
    dispatch(setGroupId(value));
  };

  const handleSearch = () => {
    dispatch(
      getMembersAction({
        size: LOAD_MEMBERS_SIZE,
        page: 1,
      })
    );
  };

  const groupsOptions = useMemo(
    () => [
      {
        value: null,
        label: "Все группы",
      },
      ...records.map((group) => ({
        label: group.name,
        // eslint-disable-next-line no-underscore-dangle
        value: group._id,
      })),
    ],
    [records]
  );

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  useEffect(() => {
    dispatch(getGroupsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Select
          className={styles.search__Select}
          options={groupsOptions}
          loading={groupsLoading}
          value={groupId}
          onChange={handleGroupIdChange}
        />
      </div>
    </div>
  );
};

export default MembersSearch;
