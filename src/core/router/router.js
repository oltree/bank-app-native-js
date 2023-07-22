import { NotFound } from '@/components/screens';
import { ROUTES } from './routes.data';
import { Layout } from '@/components/layout';

export class Router {
  #routes = ROUTES;
  #currentRoute = undefined;
  #layout = undefined;

  constructor() {
    window.addEventListener('popstate', () => {
      this.#handleRouteChange();
    });

    this.#handleRouteChange();
    this.#handleClickLink();
  }

  #handleClickLink() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a');

      if (target) {
        event.preventDefault();

        this.navigate(target.href);
      }
    });
  }

  navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path);

      this.#handleRouteChange();
    }
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || '/';
    let route = this.#routes.find((route) => route.path === path);

    if (!route) {
      route = {
        component: NotFound,
      };
    }

    this.#currentRoute = route;

    this.#render();
  }

  #render() {
    const component = new this.#currentRoute.component(); // this.#currentRoute.component() - dinamic class from ROUTES

    if (!this.#layout) {
      this.#layout = new Layout({
        router: this, // all methods class Router
        children: component.render(),
      });

      document.getElementById('app').innerHTML = this.#layout.render();
    } else {
      document.querySelector('main').innerHTML = component.render();
    }
  }
}
