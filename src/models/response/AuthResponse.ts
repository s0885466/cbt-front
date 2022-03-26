import { User } from "../entities/User";

export interface AuthResponse {
  accessToken: string;
  user: User;
}
