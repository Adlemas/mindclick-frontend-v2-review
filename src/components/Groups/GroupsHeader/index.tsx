import type { FC } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";
import Panel from "@/components/UI/Panel";
import AddGroupForm from "@/forms/AddGroupForm";

const GroupsHeader: FC = () => {
  const [addGroupPanel, setAddGroupPanel] = useState<boolean>();

  const handleAddGroup = () => {
    setAddGroupPanel(true);
  };

  const handleAddGroupCancel = () => {
    setAddGroupPanel(false);
  };

  return (
    <>
      <DashboardNav title="Группы">
        <Button icon={<RiAddCircleLine />} onClick={handleAddGroup}>
          Добавить группу
        </Button>
      </DashboardNav>
      <Panel
        title="Новая группа"
        open={addGroupPanel}
        width="25rem"
        onClose={handleAddGroupCancel}
      >
        <AddGroupForm onCancel={handleAddGroupCancel} />
      </Panel>
    </>
  );
};

export default GroupsHeader;
