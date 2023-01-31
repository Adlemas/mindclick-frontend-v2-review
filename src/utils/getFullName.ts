import { IUser } from "@/types/entity";

const getFullName = (user: IUser) =>
  `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`;

export default getFullName;
