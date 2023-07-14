export type UserResponse = {
  id: number;
  email: string;
}

export type AuthUser = {
  id: number;
  email: string;
}

export type LoginResponse = {
  access_token: string;
  token_type: string;
}