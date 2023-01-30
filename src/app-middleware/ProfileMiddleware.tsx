import { FC, useEffect } from "react";
import { Spin } from "antd";
import { isEqual } from "lodash";
import { MiddlewareProps } from "@/types/middleware";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileAction } from "@/redux/slices/profile";
import DashboardLayout from "@/container/DashboardLayout";

const ProfileMiddleware: FC<MiddlewareProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
    isEqual
  );

  const { loading, profile } = useAppSelector(
    (state) => state.profile,
    isEqual
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && !loading && !profile) {
      dispatch(getProfileAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Загружаем данные профиля..." />
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProfileMiddleware;