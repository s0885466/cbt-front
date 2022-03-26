import { createContext } from "react";

type AuthContext = {
  isAuthorized: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
});
