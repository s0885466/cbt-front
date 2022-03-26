import $api from "@src/http/http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "@src/models/response/AuthResponse";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/login", { email, password });
  }

  static async signup(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/signup", { email, password });
  }

  static async refresh(): Promise<
    AxiosResponse<Pick<AuthResponse, "accessToken">>
  > {
    return $api.get("/refresh");
  }
}
