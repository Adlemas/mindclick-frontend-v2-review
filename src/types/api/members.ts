import { IUser } from "@/types/entity";

export interface GetMembersPayload {
  page: number;
  size: number;
  query?: string;
}

export interface GetMembersResponse {
  page: number;
  records: Array<IUser>;
  totalCount: number;
  totalPages: number;
}
