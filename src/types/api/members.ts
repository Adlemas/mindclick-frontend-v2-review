import { IUser } from "@/types/entity";

export interface GetMembersPayload {
  page: number;
  size: number;
  query?: string;
  groupId?: string | null;
}

export interface GetMembersResponse {
  page: number;
  records: Array<IUser>;
  totalCount: number;
  totalPages: number;
}

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

export interface UpdateMemberPayload {
  // url params
  id: string;
  // body
  firstName?: string;
  lastName: string;
  phone?: string;
  birthDate?: string;
  groupId?: string;
  rate?: number;
  points?: number;
}

export interface UpdateMemberResponse extends Omit<IUser, "password"> {}
