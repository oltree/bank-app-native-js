import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

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
  }

  render() {
    const element = RenderService.htmlToElement(
      template,
      [CardInfo, Transactions, Statistics, Actions, Contacts],
      styles
    );

    return element;
  }
}
