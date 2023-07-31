import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(template, [], styles);

    return element;
  }
}
