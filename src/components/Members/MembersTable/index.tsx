import type { FC } from "react";
import { Table } from "antd";

const MembersTable: FC = () => (
  <Table scroll={{ y: "calc(100vh - 72px - 65px)" }} />
);

export default MembersTable;
