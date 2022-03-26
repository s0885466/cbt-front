import { useState, useCallback } from "react";
import { AxiosResponse, AxiosError } from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const sendRequest = useCallback(
    async <T>(request: () => Promise<AxiosResponse<T>>) => {
      setIsLoading(true);
      try {
        const response = await request();

        setIsLoading(false);
        return response.data;
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage =
          JSON.parse(error.request.responseText).message ||
          (err as Error)?.message;

        setError(errorMessage);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
