import axios from "@/api/axios";
import type { GetGroupsResponse } from "@/types/api/groups";

const getGroups = async (): Promise<GetGroupsResponse> => {
  const response = await axios.get("/groups");

  return response.data;
};

export default getGroups;
