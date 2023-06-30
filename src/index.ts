import {
  Authorization, Page404, HomePage, Page500, PersonalInfo, PersonalInfoEdit, Registration,
} from './pages';
import { ERoutes } from './core/Router/ERoutes';
import { Router } from './core/Router';
import AuthController from './controllers/AuthController';
import { store } from './core/Store';
import './styles/styles.pcss';

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(ERoutes.LOGIN, Authorization)
    .use(ERoutes.REGISTRATION, Registration)
    .use(ERoutes.HOME, HomePage)
    .use(ERoutes.PROFILE, PersonalInfo)
    .use(ERoutes.PROFILE_EDIT, PersonalInfoEdit)
    .use(ERoutes.PAGE_500, Page500)
    .use(ERoutes.PAGE_404, Page404);

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
  case ERoutes.LOGIN:
  case ERoutes.REGISTRATION:
  case ERoutes.PAGE_404:
  case ERoutes.PAGE_500:
    isProtectedRoute = false;
    break;
  }
  try {
    await AuthController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(ERoutes.HOME);
    }
  } catch (e) {
    Router.start();
    const userId = store.getState()?.user?.id;
    if (!isProtectedRoute && userId) {
      Router.go(ERoutes.HOME);
    }
    if (typeof e === 'object' && e !== null && 'reason' in e) {
      const error = e as { reason?: string };
      if (error.reason === 'User already in system' && userId) {
        Router.go(ERoutes.HOME);
      }
    }
    if (isProtectedRoute && !userId) {
      Router.go(ERoutes.LOGIN);
    }
  }
});
