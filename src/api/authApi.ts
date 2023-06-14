import { BaseAPI } from './baseApi';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User extends Record<string, any>{
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  display_name?: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  protected headers = { 'Content-Type': 'application/json' };

  signin(data: SigninData) {
    return this.http.post('/signin', { data, headers: this.headers });
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data, headers: this.headers });
  }

  request(): Promise<User> {
    return this.http.get<User>('/user', { headers: this.headers });
  }

  logout() {
    return this.http.post('/logout', { headers: this.headers });
  }
}

export default new AuthAPI();
