import { AxiosError } from "axios";
import { message } from "antd";
import { BackendError } from "@/types/api/other";

const handleAxiosError = (error: AxiosError<BackendError> | any) => {
  if (error.response) {
    if (error.response.data?.message) {
      message.error(error.response.data.message);
    }
    if (error.response.data?.errors) {
      error.response.data.errors.forEach((err: string) => message.error(err));
    }
  } else {
    message.error("Что-то пошло не так");
  }
};

export default handleAxiosError;
