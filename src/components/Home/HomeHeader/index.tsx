import type { FC } from "react";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";

const HomeHeader: FC = () => {
  const handleLogout = () => {
    window.dispatchEvent(new Event("forceLogout"));
  };

  return (
    <DashboardNav title="Главная панель">
      <Button type="outline" onClick={handleLogout} secondary>
        Выйти
      </Button>
    </DashboardNav>
  );
};

export default HomeHeader;
