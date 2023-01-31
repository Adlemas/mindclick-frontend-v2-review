import type { FC } from "react";
import MembersHeader from "@/components/Members/MembersHeader";
import MembersContent from "@/components/Members/MembersContent";

const MembersView: FC = () => (
  <>
    <MembersHeader />
    <MembersContent />
  </>
);

export default MembersView;
