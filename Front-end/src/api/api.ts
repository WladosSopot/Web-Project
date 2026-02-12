import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  login: (username: string, password: string) => {
    return apiInstance.post("/auth/login", {
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
};
