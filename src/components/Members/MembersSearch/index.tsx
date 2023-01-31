import type { FC } from "react";
import { Typography } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import StyledInput from "@/components/UI/StyledInput";
import Button from "@/components/UI/Button";

import styles from "./styles.module.scss";

const { Text } = Typography;

const MembersSearch: FC = () => (
  <div className={styles.search__Wrapper}>
    <div>
      <StyledInput
        className={styles.search__Input}
        placeholder="Искать по имени/почте/группе"
        allowClear
      />
      <Button icon={<RiSearch2Line />} className={styles.search__Button}>
        Поиск
      </Button>
    </div>
    <div>
      <Text className={styles.search__Result}>
        Найдено <Text strong>1200</Text> пользователей
      </Text>
    </div>
  </div>
);

export default MembersSearch;
