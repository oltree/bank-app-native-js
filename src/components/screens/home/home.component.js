import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import template from './home.template.html';
import styles from './home.module.scss';
import { $R } from '@/core/rquery/rquery.lib';

export class Home extends ScreenComponent {
  constructor() {
    super({ title: 'Home' });
  }

  render() {
    const element = RenderService.htmlToElement(template, [], styles);

    $R(element).find('h1').css('color', 'red');

    return element.outerHTML;
  }
}
