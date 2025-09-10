export interface LoginCredentials {
  email: string;
  password: string;
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

export interface AuthResponse {
  token: string;
  user: any;
}
