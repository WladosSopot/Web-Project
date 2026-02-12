import axios from "axios";
import type { ILogin } from "./interfaces/ILogin";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  const userId = localStorage.getItem('userId');
  if(token && userId) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['userId'] = userId;
  }
  return config;
})

export const api = {
  login: (username: string, password: string) => {
    return apiInstance.post<ILogin>("/auth/login", {
      username: username,
      password: password,
    });
  },

  register: (username: string, password: string) => {
    return apiInstance.post("/auth/register", {
      username: username,
      password: password,
    });
  },

  aiRequest: (userPrompt: string, conspectName: string) => {
    return apiInstance.post<string>("/ai/request", {
      userPrompt,
      conspectName,
    });
  },
};
