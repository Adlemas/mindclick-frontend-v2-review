/* eslint-disable no-param-reassign,no-underscore-dangle */
import Axios from "axios";
import { getItemFromLocal, setItemInLocal } from "@/utils/localStorage";
import { RefreshTokenResponse } from "@/types/api/auth";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Accept-Language": "ru",
  },
});

const refreshTokens = async () => {
  const refreshToken = getItemFromLocal("refreshToken");
  const refreshingToken = getItemFromLocal("refreshing.axios");

  if (refreshToken) {
    if (refreshingToken) {
      return new Promise<RefreshTokenResponse>((resolve, reject) => {
        let timeSpent = 0;
        const timeout = 10000;

        const interval = setInterval(() => {
          timeSpent += 100;
          const stillRefreshing = getItemFromLocal("refreshing.axios");
          if (!stillRefreshing) {
            clearInterval(interval);
            const accessToken = getItemFromLocal<string>("accessToken");
            const refresh = getItemFromLocal<string>("refreshToken");
            if (accessToken === null || refresh === null) {
              return reject(
                new Error("При обновлении токенов произошла ошибка")
              );
            }
            return resolve({
              accessToken,
              refreshToken: refresh,
            });
          }
          if (timeSpent >= timeout) {
            clearInterval(interval);
            return reject(
              new Error("Время ожидания обновления токенов истекло")
            );
          }
          return null;
        }, 100);
      });
    }
    setItemInLocal("refreshing.axios", true);
    const tokens = await axios.get("auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    setItemInLocal("refreshing.axios", false);
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

    if (
      error.response.status === 401 &&
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

          axios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;

          return axios(originalConfig);
        }
      } catch (e: any) {
        // Call window "logout" event
        window.dispatchEvent(new Event("forceLogout"));

        if (e.response && e.response.data) {
          return Promise.reject(e.response.data);
        }

        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
