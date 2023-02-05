import type { FC } from "react";
import { Table, TablePaginationConfig, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiEditFill } from "react-icons/ri";
import moment from "moment";
import { IUser } from "@/types/entity";

import styles from "./styles.module.scss";
import getFullName from "@/utils/getFullName";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getMembersAction,
  LOAD_MEMBERS_SIZE,
  setMember,
} from "@/redux/slices/members";
import Button from "@/components/UI/Button";
import Panel from "@/components/UI/Panel";
import AddMemberForm from "@/forms/AddMemberForm";

const MembersTable: FC = () => {
  const [updateMemberPanel, setUpdateMemberPanel] = useState<boolean>();

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

  const handleUpdateMember = useCallback(
    (member: IUser) => {
      setUpdateMemberPanel(true);
      dispatch(setMember(member));
    },
    [dispatch]
  );

  const handleUpdateMemberCancel = () => {
    setUpdateMemberPanel(false);
  };

  const columns: ColumnsType<IUser> = useMemo(
    () => [
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
        render: (name: string, { group }) => (
          <Tag color={group?.color ?? undefined} key={name}>
            {name ?? "-"}
          </Tag>
        ),
      },
      {
        title: "Создана",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: string) =>
          moment(createdAt).format("DD.MM.YYYY HH:mm"),
      },
      {
        title: "Действия",
        dataIndex: "actions",
        key: "actions",
        render: (_, member) => (
          <Button
            icon={<RiEditFill />}
            type="outline"
            onClick={() => handleUpdateMember(member)}
            secondary
          >
            Редактировать
          </Button>
        ),
      },
    ],
    [handleUpdateMember]
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
    <>
      <Table
        className={styles.table}
        columns={columns}
        loading={loading}
        dataSource={records}
        pagination={pagination}
      />
      <Panel
        title="Редактирование участника"
        open={updateMemberPanel}
        width="25rem"
        onClose={handleUpdateMemberCancel}
      >
        <AddMemberForm />
      </Panel>
    </>
  );
};

export default MembersTable;
