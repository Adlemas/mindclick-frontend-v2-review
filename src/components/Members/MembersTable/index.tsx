import type { FC } from "react";
import { Table } from "antd";

import styles from "./styles.module.scss";

const MembersTable: FC = () => <Table className={styles.table} />;

export default MembersTable;
