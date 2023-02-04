import type { FC } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";

const GroupsHeader: FC = () => (
  <DashboardNav title="Группы">
    <Button icon={<RiAddCircleLine />}>Добавить группу</Button>
  </DashboardNav>
);

export default GroupsHeader;
