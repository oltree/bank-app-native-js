import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import { CardInfo } from './card-info';
import { Actions } from './actions';
import { Contacts } from './contacts';
import { Transactions } from './transactions';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(
      template,
      [CardInfo, Transactions, Actions, Contacts],
      styles
    );

    return element;
  }
}
