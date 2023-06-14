import API, { AuthAPI, SigninData, SignupData } from '../api/authApi';
import router from '../core/Router/Router';
import { ERoutes } from '../core/Router';
import { store } from '../core/Store';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go(ERoutes.HOME);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      router.go(ERoutes.HOME);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.request();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();
      store.set('user', null);

      router.go(ERoutes.LOGIN);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
