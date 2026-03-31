import { Role } from '../enums/Role';

export interface UserResponse {
  id: number;
  username: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
