export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Operator = 'OPERATOR',
  Auditor = 'AUDITOR',
}

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
