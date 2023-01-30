import { FC } from "react";
import { Spin, theme } from "antd";

const LoadingScreen: FC = () => {
  const { token } = theme.useToken();
  const { colorBgContainer } = token;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorBgContainer,
      }}
    >
      <Spin tip="Загружаем данные профиля..." />
    </div>
  );
};

export default LoadingScreen;
