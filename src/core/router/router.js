import { Layout } from '@/components/layout/layout.component';
import { NotFound } from '@/components/screens/not-found/not-found.component';

import { $R } from '../rquery';

import { ROUTES } from './routes.data';

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

  getCurrentPath() {
    return window.location.pathname;
  }

  navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path);

      this.#handleRouteChange();
    }
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
    const component = new this.#currentRoute.component().render(); // this.#currentRoute.component() - dinamic class from ROUTES

    if (!this.#layout) {
      this.#layout = new Layout({
        router: this, // all methods class Router
        children: component,
      }).render();

      $R('#app').append(this.#layout);
    } else {
      $R('#content').html('').append(component);
    }
  }
}
