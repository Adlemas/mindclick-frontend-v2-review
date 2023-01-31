import type { FC } from "react";
import MembersSearch from "@/components/Members/MembersSearch";
import MembersTable from "@/components/Members/MembersTable";

const MembersContent: FC = () => (
  <>
    <MembersSearch />
    <MembersTable />
  </>
);

export default MembersContent;
