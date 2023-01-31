import type { FC } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";
import getFullName from "@/utils/getFullName";
import { useAppSelector } from "@/redux/hooks";

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
  const { profile } = useAppSelector((state) => state.profile, isEqual);

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={[profile]}
      scroll={{
        y: "calc(100vh - 72px - 65px - 55px)",
      }}
    />
  );
};

export default MembersTable;
