import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { Store } from '@/core/store';
import { $R } from '@/core/rquery';

import { AuthRequiredMessage } from '@/components/ui/auth-required-message';

import { CardInfo } from './card-info';
import { Actions } from './actions';
import { Contacts } from './contacts';
import { Statistics } from './statistics';
import { Transactions } from './transactions';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });

    this.store = Store.getInstance();
    this.store.addObserver(this);

    this.components = {
      cardInfo: null,
      transactions: null,
      statistics: null,
    };
  }

  createOrUpdateComponent(component, componentName) {
    if (this.components[componentName]) {
      this.components[componentName].destroy();
    }

    this.components[componentName] = new component();

    return this.components[componentName];
  }

  update() {
    this.user = this.store.state.user;

    if (!this.user) {
      $R(this.element).html(new AuthRequiredMessage().render().outerHTML); // из-за outerHTML не будут работать клики и т.д.
    }
  }

  render() {
    const componentsToRender = [
      this.createOrUpdateComponent(CardInfo, 'cardInfo'),
      this.createOrUpdateComponent(Transactions, 'transactions'),
      this.createOrUpdateComponent(Statistics, 'statistics'),
      Actions,
      Contacts,
    ];

    this.element = RenderService.htmlToElement(
      template,
      componentsToRender,
      styles
    );

    this.update();

    return this.element;
  }
}
