import {ERoutes, Route} from './index';
import Block from '../Block';

class Router {
  private static __instance: Router | null = null;

  routes: Route[] = [];

  history: History = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window)?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const previousRoute = this._currentRoute;
    const nextRoute = this.getRoute(pathname) || this.getRoute(ERoutes.PAGE_404);

    if (previousRoute && previousRoute !== nextRoute) {
      previousRoute.leave();
    }

    if (nextRoute) {
      nextRoute.render();
      this._currentRoute = nextRoute;
    }
  }

  public go(pathname: ERoutes): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
