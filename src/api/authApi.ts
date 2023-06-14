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

  signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  request(): Promise<User> {
    return this.http.get<User>('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
