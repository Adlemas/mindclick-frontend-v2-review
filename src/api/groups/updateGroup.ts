import axios from "@/api/axios";
import { UpdateGroupPayload, UpdateGroupResponse } from "@/types/api/groups";

const updateGroup = async (
  payload: UpdateGroupPayload
): Promise<UpdateGroupResponse> => {
  const response = await axios.put("groups", payload);

  return response.data;
};

export default updateGroup;
