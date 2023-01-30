import { FC } from "react";
import { Spin } from "antd";
import { MiddlewareProps } from "@/types/middleware";

const ProfileMiddleware: FC<MiddlewareProps> = ({ children }) => (
  <Spin tip="Profile">{children}</Spin>
);

export default ProfileMiddleware;
