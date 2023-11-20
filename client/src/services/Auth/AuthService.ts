import $api from "@/http";
import { AuthResponse, RegisterResponse } from "@/models/response/AuthResponse";
import { organizationData } from "@/ts/types";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login/", {
      username: username,
      password: password,
    });
  }

  static async register(
    organizatioData: organizationData
  ): Promise<AxiosResponse<RegisterResponse>> {
    return $api.post("/registration/organization", organizatioData);
  }

  static async logout(): Promise<void> {
    // TODO: if refresh token is sent to cookies
    return;
  }
}
