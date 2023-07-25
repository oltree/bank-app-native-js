import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(template, [], styles);

    $R(element).find('h1').css('color', 'green');

    return element;
  }
}
