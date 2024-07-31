import axios from "axios";
import AuthService from "../services/auth.service";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AuthService.refreshToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
