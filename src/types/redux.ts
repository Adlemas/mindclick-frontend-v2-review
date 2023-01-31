import { IUser } from "@/types/entity";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  refreshing: boolean;
}

export interface ProfileState {
  profile: IUser;
  loading: boolean;
}

export interface MembersState {
  records: Array<IUser>;
  totalCount: number;
  totalPages: number;
  page: number;
  loading: boolean;
}
