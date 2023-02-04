import axios from "@/api/axios";
import { IUser } from "@/types/entity";

export interface CreateMemberPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  rate: number;
  points: number;
  groupId: string;
  password: string;
}

export interface CreateMemberResponse extends Omit<IUser, "password"> {}

const createMember = async (
  params: CreateMemberPayload
): Promise<CreateMemberResponse> => {
  const response = await axios.post("/members", params);

  return response.data;
};

export default createMember;
