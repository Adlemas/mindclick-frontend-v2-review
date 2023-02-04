import axios from "@/api/axios";
import type {
  CreateGroupPayload,
  CreateGroupResponse,
} from "@/types/api/groups";

const createGroup = async (
  params: CreateGroupPayload
): Promise<CreateGroupResponse> => {
  const response = await axios.post<CreateGroupResponse>("groups", params);

  return response.data;
};

export default createGroup;
