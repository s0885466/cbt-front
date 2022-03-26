import { useEffect, useState } from "react";
import { useHttpClient } from "@src/hooks/useHttpClient";
import { AuthService } from "@src/services/AuthService";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(
    Boolean(window.localStorage.getItem("token"))
  );

  const { isLoading, error, sendRequest } = useHttpClient();

  const login = () => {
    setIsAuthorized(true);
  };

  const logout = () => {
    setIsAuthorized(false);
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    const request = async () => {
      await sendRequest(AuthService.refresh);
      setIsAuthorized(true);
    };

    request();
  }, [sendRequest]);

  return { isAuthorized, logout, login, isLoading, error };
};
