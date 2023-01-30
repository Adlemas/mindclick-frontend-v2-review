export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  refreshing: boolean;
}

export interface ProfileState {
  profile: any;
  loading: boolean;
}
