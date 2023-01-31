import type { FC } from "react";
import type { DrawerProps } from "antd";
import { Drawer } from "antd";
import { RiCloseLine } from "react-icons/ri";

export interface PanelProps extends DrawerProps {}

const Panel: FC<PanelProps> = (props) => (
  <Drawer closeIcon={<RiCloseLine />} destroyOnClose {...props} />
);

export default Panel;
