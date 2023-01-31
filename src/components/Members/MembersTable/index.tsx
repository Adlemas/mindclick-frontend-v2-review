import type { FC } from "react";
import { Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useEffect, useMemo } from "react";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";
import getFullName from "@/utils/getFullName";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getMembersAction, LOAD_MEMBERS_SIZE } from "@/redux/slices/members";

const columns: ColumnsType<IUser> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
    render: (_, user) => getFullName(user),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Очки",
    dataIndex: "points",
    key: "points",
  },
  {
    title: "Кубков",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Номер телефона",
    dataIndex: "phone",
    key: "phone",
  },
];

const MembersTable: FC = () => {
  const { loading, records, page, totalCount } = useAppSelector(
    (state) => state.members,
    isEqual
  );
  const dispatch = useAppDispatch();

  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      pageSize: LOAD_MEMBERS_SIZE,
      current: page,
      total: totalCount,
    }),
    [page, totalCount]
  );

  useEffect(() => {
    dispatch(
      getMembersAction({
        page,
        size: LOAD_MEMBERS_SIZE,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table
      className={styles.table}
      columns={columns}
      loading={loading}
      dataSource={records}
      pagination={pagination}
    />
  );
};

export default MembersTable;
