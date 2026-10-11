// src/restful_booker/api/models/auth.model.ts

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
