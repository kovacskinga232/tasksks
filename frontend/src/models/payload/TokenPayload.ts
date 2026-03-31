import { Role } from '../enums/Role';

export interface TokenPayload {
  sub: string;
  id: number;
  role: Role;
  exp: number;
}
