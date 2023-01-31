import type { FC } from "react";
import { RiAddCircleLine } from "react-icons/all";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";

const MembersHeader: FC = () => (
  <DashboardNav title="Ученики">
    <Button icon={<RiAddCircleLine />}>Добавить ученика</Button>
  </DashboardNav>
);

export default MembersHeader;
