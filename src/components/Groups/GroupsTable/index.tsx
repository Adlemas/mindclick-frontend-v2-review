import type { FC } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { RiEditFill } from "react-icons/ri";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getMembersAction, LOAD_MEMBERS_SIZE } from "@/redux/slices/members";
import Button from "@/components/UI/Button";

const columns: ColumnsType<IUser> = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Максимальное количество участников",
    dataIndex: "maxMembers",
    key: "maxMembers",
  },
  {
    title: "Цвет",
    dataIndex: "color",
    key: "color",
    render: (color) => <Tag color={color}>{color ?? "Нет цвета"}</Tag>,
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

const GroupsTable: FC = () => {
  const { loading, records, page } = useAppSelector(
    (state) => state.members,
    isEqual
  );
  const dispatch = useAppDispatch();

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
      pagination={false}
    />
  );
};

export default GroupsTable;
