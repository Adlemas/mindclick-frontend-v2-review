import type { FC } from "react";
import GroupsHeader from "@/components/Groups/GroupsHeader";
import GroupsContent from "@/components/Groups/GroupsContent";

const GroupsView: FC = () => (
  <>
    <GroupsHeader />
    <GroupsContent />
  </>
);

export default GroupsView;
