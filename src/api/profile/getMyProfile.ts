import axios from "@/api/axios";
import { GetProfileResponse } from "@/types/api/profile";

const getMyProfile = async (): Promise<GetProfileResponse> => {
  const response = await axios.get<GetProfileResponse>("myprofile");

  return response.data;
};

export default getMyProfile;
