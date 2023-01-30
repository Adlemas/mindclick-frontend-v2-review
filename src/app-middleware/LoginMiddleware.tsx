import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Spin } from "antd";
import { MiddlewareProps } from "@/types/middleware";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getItemFromLocal } from "@/utils/localStorage";
import { logout, refreshAction } from "@/redux/slices/auth";

const LoginMiddleware: FC<MiddlewareProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const dispatch = useAppDispatch();

  const isAuthPage = pathname === "/login";
  const { isAuthenticated, refreshing } = useAppSelector((state) => state.auth);
  const localIsAuthenticated = getItemFromLocal("isAuthenticated");

  useEffect(() => {
    if (isAuthPage && isAuthenticated) {
      router.push("/");
      return;
    }

    if (!isAuthPage && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAuthenticated && localIsAuthenticated) {
      dispatch(refreshAction());
    }
  }, [localIsAuthenticated, isAuthenticated, isAuthPage, router, dispatch]);

  useEffect(() => {
    const logoutEvent = () => {
      dispatch(logout());
    };

    // Set Global Event
    window.addEventListener("forceLogout", logoutEvent);

    return () => {
      // Remove Global Event
      window.removeEventListener("forceLogout", logoutEvent);
    };
  }, [dispatch]);

  if (refreshing || (isAuthPage && localIsAuthenticated)) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Загрузка..." />
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default LoginMiddleware;
