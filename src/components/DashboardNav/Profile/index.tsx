import type { FC } from "react";
import { Avatar, theme, Typography } from "antd";
import { isEqual } from "lodash";
import styles from "@/components/DashboardNav/styles.module.scss";
import getFullName from "@/utils/getFullName";
import { useAppSelector } from "@/redux/hooks";

const { Text } = Typography;

const Profile: FC = () => {
  const profile = useAppSelector((state) => state.profile.profile, isEqual);

  const { token } = theme.useToken();
  const { colorTextSecondary, colorTextLightSolid } = token;

  return (
    <div className={styles.organization}>
      <Avatar
        src={profile?.profileImg}
        style={{
          backgroundColor: colorTextSecondary,
          color: colorTextLightSolid,
        }}
      >
        {profile?.firstName?.charAt(0)}
      </Avatar>
      <div>
        <Text type="secondary">
          {profile ? getFullName(profile) : "Преподаватель"}
        </Text>
        <Text>{profile?.email}</Text>
      </div>
    </div>
  );
};

export default Profile;
