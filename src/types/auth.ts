export type UserRole = 'admin' | 'driver' | 'transport';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}