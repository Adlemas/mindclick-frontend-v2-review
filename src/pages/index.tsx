import type { NextPage } from "next";
import DashboardNav from "@/components/DashboardNav";
import Button from "@/components/UI/Button";

const Home: NextPage = () => (
  <>
    <DashboardNav title="Главная панель">
      <Button type="outline" secondary>
        Выйти
      </Button>
    </DashboardNav>
    <div>Вот такой вот простой текст</div>
  </>
);

export default Home;
