import type { FC } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiEditFill } from "react-icons/ri";
import moment from "moment";
import type { IGroup } from "@/types/entity";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "@/components/UI/Button";
import { getGroupsAction, setGroup } from "@/redux/slices/groups";
import Panel from "@/components/UI/Panel";
import EditGroupForm from "@/forms/EditGroupForm";

const GroupsTable: FC = () => {
  const { loading, records } = useAppSelector((state) => state.groups, isEqual);
  const dispatch = useAppDispatch();

  const [updateGroupPanel, setUpdateGroupPanel] = useState<boolean>(false);

  const handleUpdateGroup = useCallback(
    (group: IGroup) => {
      dispatch(setGroup(group));
      setUpdateGroupPanel(true);
    },
    [dispatch]
  );

  const handleUpdateGroupCancel = () => {
    dispatch(setGroup(null));
    setUpdateGroupPanel(false);
  };

  const columns: ColumnsType<IGroup> = useMemo(
    () => [
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
        render: (createdAt: string) =>
          moment(createdAt).format("DD.MM.YYYY HH:mm"),
      },
      {
        title: "Действия",
        dataIndex: "actions",
        key: "actions",
        render: (_, group) => (
          <Button
            icon={<RiEditFill />}
            type="outline"
            onClick={() => handleUpdateGroup(group)}
            secondary
          >
            Редактировать
          </Button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getGroupsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table
        className={styles.table}
        columns={columns}
        loading={loading}
        dataSource={records}
        pagination={false}
      />
      <Panel
        title="Редактирование группы"
        open={updateGroupPanel}
        width="25rem"
        onClose={handleUpdateGroupCancel}
      >
        <EditGroupForm onCancel={handleUpdateGroupCancel} />
      </Panel>
    </>
  );
};

export default GroupsTable;
