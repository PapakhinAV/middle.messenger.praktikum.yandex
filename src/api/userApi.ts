import { BaseAPI } from './baseApi';

export interface IChangePasswordData {
  login: string;
  password: string;
}

export interface IChangeUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface IChangeAvatar {
  avatar: File
}

export interface ISearchUserByLogin {
  login: string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  protected headers = { 'Content-Type': 'application/json' };

  updateUser(data: IChangeUserData) {
    return this.http.put('/profile', { data, headers: this.headers });
  }

  updatePassword(data: IChangePasswordData) {
    return this.http.put('/password', { data, headers: this.headers });
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  getUserById(id: string) {
    return this.http.get(`/${id}`, { headers: this.headers });
  }

  getUserByLogin(data: ISearchUserByLogin) {
    return this.http.post('/user/search', { data, headers: this.headers });
  }
}

export default new UserAPI();
