import type { IGroup, IUser } from "@/types/entity";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  refreshing: boolean;
}

export interface ProfileState {
  profile: IUser | null;
  loading: boolean;
}

export interface MembersState {
  records: Array<IUser>;
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  member: IUser | null;
  query: string;
  groupId: string | null;
}

export interface GroupsState {
  records: Array<IGroup>;
  loading: boolean;
  creating: boolean;
}
