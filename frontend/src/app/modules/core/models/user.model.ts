export interface UserLoginData {
  email: string;
  password: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  password: string;
  salt: string;
}

export type PostUserResponse = GetUserResponse;

export type PostUser = Omit<GetUserResponse, 'id'>;
export class User {
  constructor(
    public email: string
  ) {}
}
