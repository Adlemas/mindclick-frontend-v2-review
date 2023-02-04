import { GetMembersPayload, GetMembersResponse } from "@/types/api/members";
import axios from "@/api/axios";

const getMembers = async (
  params: GetMembersPayload
): Promise<GetMembersResponse> => {
  const response = await axios.get("groups/members", {
    params: {
      ...params,
      groupId: params.groupId ?? undefined,
    },
  });

  return response.data;
};

export default getMembers;
