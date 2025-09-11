export interface LoginCredentials {
  email?: string;
  password: string;
  phoneNumber?: string;
  countryCode?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  role: string;
}

export interface UpdateProfileParams {
  first_name?: string;
  last_name?: string;
  // password?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  countryCode: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
