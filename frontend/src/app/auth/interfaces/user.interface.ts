
export interface Res {
  ok: boolean;
  msg: string;
}

export interface AuthResponse extends Res {
  token: string;
  user: User
}

export interface User {
  name: string;
  uid: string;
  email?: string;
}
