import type { IGroup } from "@/types/entity";
import axios from "@/api/axios";

export type GetGroupsResponse = Array<IGroup>;

const getGroups = async (): Promise<GetGroupsResponse> => {
  const response = await axios.get("/groups");

  return response.data;
};

export default getGroups;
