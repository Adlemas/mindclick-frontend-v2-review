import type { FC } from "react";
import { Table, TablePaginationConfig, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useEffect, useMemo } from "react";
import { RiEditFill } from "react-icons/ri";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";
import getFullName from "@/utils/getFullName";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getMembersAction, LOAD_MEMBERS_SIZE } from "@/redux/slices/members";
import Button from "@/components/UI/Button";

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
  {
    title: "Группа",
    dataIndex: ["group", "name"],
    key: "group.name",
    // if group is null, then it will be "-"
    render: (name: string) => (
      <Tag color="blue" key={name}>
        {name ?? "-"}
      </Tag>
    ),
  },
  {
    title: "Действия",
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <Button icon={<RiEditFill />} type="outline" secondary>
        Редактировать
      </Button>
    ),
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
      onChange(newPage) {
        dispatch(
          getMembersAction({
            page: newPage,
            size: LOAD_MEMBERS_SIZE,
          })
        );
      },
    }),
    [dispatch, page, totalCount]
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
