import axios from "@/api/axios";
import { getItemFromLocal } from "@/utils/localStorage";
import { RefreshTokenResponse } from "@/types/api/auth";

const refresh = async (): Promise<RefreshTokenResponse> => {
  if (!getItemFromLocal("refreshToken"))
    return Promise.reject(new Error("No refresh token found"));

  const response = await axios.get("auth/refresh", {
    headers: {
      Authorization: `Bearer ${getItemFromLocal("refreshToken")}`,
    },
  });

  return response.data;
};

export default refresh;
