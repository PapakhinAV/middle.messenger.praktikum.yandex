import API, {
  IChangePasswordData, IChangeUserData, ISearchUserByLogin, UserAPI,
} from '../api/userApi';
import { store } from '../core/Store';
import router from '../core/Router/Router';
import { EStoreFields } from '../core/Store/Store';
import { RequestRateLimiter } from '../utils/requestRateLimiter';

export interface ISearchUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string
  login: string;
  email: string;
  phone: string;
  avatar?: string;
}
class UserController {
  private readonly api: UserAPI;

  private rateLimiter: RequestRateLimiter = new RequestRateLimiter(500);

  constructor() {
    this.api = API;
  }

  async updateUser(data: IChangeUserData) {
    try {
      this.rateLimiter.checkRequestRate();
      const user = await this.api.updateUser(data);
      store.set(EStoreFields.USER, user);
      router.back();
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: IChangePasswordData) {
    try {
      this.rateLimiter.checkRequestRate();
      await this.api.updatePassword(data);
      router.back();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async updateAvatar(data: File) {
    try {
      this.rateLimiter.checkRequestRate();
      const formData = new FormData();
      formData.append('avatar', data);
      const user = await this.api.updateAvatar(formData);
      store.set(EStoreFields.USER, user);
      router.back();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.api.getUserById(id);
      if (user) {
        store.set(`${EStoreFields.SEARCH}.userById`, user);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async findUsersByLogin(data: ISearchUserByLogin) {
    try {
      const users = await this.api.getUserByLogin(data);
      if (users) {
        store.set(`${EStoreFields.SEARCH}.usersByLogin`, users);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UserController();
