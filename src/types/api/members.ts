import { IUser } from "@/types/entity";

export interface GetMembersPayload {
  page: number;
  size: number;
}

export interface GetMembersResponse {
  records: Array<IUser>;
  totalCount: number;
  totalPages: number;
}
