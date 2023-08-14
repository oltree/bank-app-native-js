import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import { CardInfo } from './card-info/card-info.component';
import { Actions } from './actions/actions.component';
import { Contacts } from './contacts/contacts.component';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(
      template,
      [CardInfo, Actions, Contacts],
      styles
    );

    return element;
  }
}
