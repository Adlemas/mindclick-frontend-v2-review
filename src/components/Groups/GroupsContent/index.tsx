import type { FC } from "react";
import GroupsSearch from "@/components/Groups/GroupsSearch";
import GroupsTable from "@/components/Groups/GroupsTable";

const GroupsContent: FC = () => (
  <>
    <GroupsSearch />
    <GroupsTable />
  </>
);

export default GroupsContent;
