import type { FC } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { RiEditFill } from "react-icons/ri";
import moment from "moment";
import type { IGroup } from "@/types/entity";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "@/components/UI/Button";
import { getGroupsAction } from "@/redux/slices/groups";

const columns: ColumnsType<IGroup> = [
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
    title: "Создана",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => moment(createdAt).format("DD.MM.YYYY HH:mm"),
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
  const { loading, records } = useAppSelector((state) => state.groups, isEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGroupsAction());
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
