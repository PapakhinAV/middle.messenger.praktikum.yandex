import API, {
  IChangePasswordData, IChangeUserData, ISearchUserByLogin, UserAPI,
} from '../api/userApi';
import { store } from '../core/Store';
import router from '../core/Router/Router';

class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async updateUser(data: IChangeUserData) {
    try {
      const user = await this.api.updateUser(data);
      store.set('user', user);
      router.back();
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: IChangePasswordData) {
    try {
      await this.api.updatePassword(data);
      router.back();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async updateAvatar(data: File) {
    try {
      const formData = new FormData();
      formData.append('avatar', data);
      const user = await this.api.updateAvatar(formData);
      store.set('user', user);
      router.back();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.api.getUserById(id);
      if (user) {
        store.set('search.userById', user);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async findUsersByLogin(data: ISearchUserByLogin) {
    try {
      const users = await this.api.getUserByLogin(data);
      if (users) {
        store.set('search.usersByLogin', users);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UserController();
