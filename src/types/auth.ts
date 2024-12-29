export type UserRole = 'ADMIN' | 'DRIVER' | 'TRANSPORT';

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