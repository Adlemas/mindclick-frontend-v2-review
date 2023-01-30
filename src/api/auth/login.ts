import axios from "@/api/axios";
import { LoginPayload, LoginResponse } from "@/types/api/auth";

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post("auth/login", payload);

  return response.data;
};

export default login;
