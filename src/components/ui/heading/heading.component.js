import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './heading.module.scss';
import template from './heading.template.html';

export class Heading extends ChildComponent {
  constructor(title = '') {
    super();

    this.title = title;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element).text(this.title);

    return this.element;
  }
}
