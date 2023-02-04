import axios from "@/api/axios";
import type {
  CreateMemberPayload,
  CreateMemberResponse,
} from "@/types/api/members";

const createMember = async (
  params: CreateMemberPayload
): Promise<CreateMemberResponse> => {
  const response = await axios.post("users", params);

  return response.data;
};

export default createMember;
