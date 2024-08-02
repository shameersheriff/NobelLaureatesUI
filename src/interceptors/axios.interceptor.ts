import axios from "axios";
import AuthService from "../services/auth.service";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await AuthService.refreshToken();
        const accessToken = localStorage.getItem("accessToken");

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        AuthService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
