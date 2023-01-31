import type { FC } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";
import Panel from "@/components/UI/Panel";

const MembersHeader: FC = () => {
  const [addMemberPanel, setAddMemberPanel] = useState<boolean>();

  const handleAddMember = () => {
    setAddMemberPanel(true);
  };

  return (
    <>
      <DashboardNav title="Ученики">
        <Button icon={<RiAddCircleLine />} onClick={handleAddMember}>
          Добавить ученика
        </Button>
      </DashboardNav>
      <Panel
        title="Новый ученик"
        open={addMemberPanel}
        width="25rem"
        onClose={() => setAddMemberPanel(false)}
      >
        hello
      </Panel>
    </>
  );
};

export default MembersHeader;
