import { Roles } from "./Roles";

export interface User extends Roles {
  email: string;
  password: string;
}
