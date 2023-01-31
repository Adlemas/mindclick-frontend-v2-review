import type { FC } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";

const columns: ColumnsType<IUser> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Фамилия",
    dataIndex: "lastName",
    key: "lastName",
  },
];

const MembersTable: FC = () => (
  <Table
    className={styles.table}
    columns={columns}
    dataSource={[]}
    scroll={{
      y: "calc(100vh - 72px - 65px - 55px)",
    }}
  />
);

export default MembersTable;
