import { FC, useEffect } from "react";
import { Spin } from "antd";
import { isEqual } from "lodash";
import { MiddlewareProps } from "@/types/middleware";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileAction } from "@/redux/slices/profile";

const ProfileMiddleware: FC<MiddlewareProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
    isEqual
  );
  const { loading } = useAppSelector((state) => state.profile, isEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && !loading) {
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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default ProfileMiddleware;
