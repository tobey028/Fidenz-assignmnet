import { UserRole } from '../entities/User';

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
  token: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: UserRole;
}