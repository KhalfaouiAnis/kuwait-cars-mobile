export interface User {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  ANONYMOUS = "ANONYMOUS",
  USER = "USER",
}
