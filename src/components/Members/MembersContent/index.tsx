import type { FC } from "react";
import MembersSearch from "@/components/Members/MembersSearch";
import MembersTable from "@/components/Members/MembersTable";

const MembersContent: FC = () => (
  <div>
    <MembersSearch />
    <MembersTable />
  </div>
);

export default MembersContent;
