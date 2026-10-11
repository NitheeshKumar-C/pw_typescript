// src/restful_booker/api/clients/auth.api.ts

import { APIRequestContext } from "@playwright/test";
import {
  AuthCredentials,
  AuthResponse,
} from "../models/auth.model";

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(
    credentials: AuthCredentials
  ): Promise<AuthResponse> {
    const response = await this.request.post("/auth", {
      data: credentials,
    });

    return response.json();
  }
}
