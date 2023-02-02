import { FC, useEffect } from "react";
import { isEqual } from "lodash";
import { useRouter } from "next/router";
import { MiddlewareProps } from "@/types/middleware";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileAction } from "@/redux/slices/profile";
import DashboardLayout from "@/container/DashboardLayout";
import LoadingScreen from "@/components/LoadingScreen";

const ProfileMiddleware: FC<MiddlewareProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
    isEqual
  );

  const router = useRouter();
  const isNotAuthPage = router.pathname !== "/login";

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
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (isNotAuthPage) {
      return <LoadingScreen />;
    }
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>{children}</>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProfileMiddleware;
