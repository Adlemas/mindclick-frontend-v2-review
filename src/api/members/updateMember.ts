import axios from "@/api/axios";
import { UpdateMemberPayload } from "@/types/api/members";

const updateMember = async (payload: UpdateMemberPayload) => {
  const response = await axios.put(`users/${payload.id}`, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    birthDate: payload.birthDate,
    groupId: payload.groupId,
    rate: payload.rate,
    points: payload.points,
  });

  return response.data;
};

export default updateMember;
