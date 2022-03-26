import axios from "axios";
import { AuthService } from "@src/services/AuthService";
import { ROUTER_PATHS } from "@src/Router/routerPaths";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
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
        window.location.replace(ROUTER_PATHS.REGISTRATION);
      }
    }

    if (error.response.status === 403) {
      window.location.pathname !== ROUTER_PATHS.REGISTRATION &&
        window.location.replace(ROUTER_PATHS.REGISTRATION);
    }
  }
);

export default $api;
