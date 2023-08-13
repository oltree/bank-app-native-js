import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import styles from './home.module.scss';
import template from './home.template.html';
import { CardInfo } from './card-info/card-info.component';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(template, [CardInfo], styles);

    return element;
  }
}
