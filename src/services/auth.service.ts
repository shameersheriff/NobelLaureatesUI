import axios from "axios";
import { User } from "../models/user.model";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_URL = `${API_BASE_URL}/api/Auth/`;

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_URL}login`, {
      username,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  }

  async register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    const response = await axios.post<LoginResponse>(`${API_URL}register`, {
      username,
      password,
      firstName,
      lastName,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data.user;
  }

  logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  async refreshToken(): Promise<string> {
    const response = await axios.post<LoginResponse>(`${API_URL}refresh`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data.accessToken;
  }

  getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  }
}

export default new AuthService();
