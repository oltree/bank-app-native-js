import { RenderService } from '@/core/services';
import { ChildComponent } from '@/core/component';

import styles from './header.module.scss';
import template from './header.template.html';

export class Header extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    return this.element;
  }
}
