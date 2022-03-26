import axios from "axios";
import { AuthService } from "@src/services/AuthService";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_URL,
});

$api.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const response = await AuthService.refresh();
        localStorage.setItem("token", response.data.accessToken);

        return $api.request(originalRequest);
      } catch (err) {
        window.location.replace("http://yandex.ru");
      }
    }
  }
);

export default $api;
