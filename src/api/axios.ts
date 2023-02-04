/* eslint-disable no-param-reassign,no-underscore-dangle */
import Axios from "axios";
import { message } from "antd";
import { getItemFromLocal, setItemInLocal } from "@/utils/localStorage";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Accept-Language": "ru",
  },
});

const deleteSession = () => {
  // Call window "logout" event
  window.dispatchEvent(new Event("forceLogout"));

  message.error({
    content: "Ваша сессия истекла, пожалуйста, войдите заново",
    key: "message-logout",
  });
};

const refreshTokens = async () => {
  const refreshToken = getItemFromLocal("refreshToken");

  if (refreshToken) {
    const tokens = await axios.get("auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return tokens.data;
  }

  return null;
};

axios.interceptors.request.use((config) => {
  const accessToken = getItemFromLocal("accessToken");
  const refreshToken = getItemFromLocal("refreshToken");
  const pathname = config.url;

  if (accessToken && pathname !== "auth/refresh" && pathname !== "auth/login") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken && pathname === "auth/refresh") {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const pathname = error.config.url;

    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      !originalConfig._retry &&
      pathname !== "auth/refresh" &&
      pathname !== "auth/login"
    ) {
      originalConfig._retry = true;

      try {
        const tokens = await refreshTokens();
        if (tokens) {
          setItemInLocal("accessToken", tokens.accessToken);
          setItemInLocal("refreshToken", tokens.refreshToken);

          originalConfig._retry = false;
          return axios(originalConfig);
        }
      } catch (e: any) {
        deleteSession();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
