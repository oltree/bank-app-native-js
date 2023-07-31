import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import styles from './logo.module.scss';
import template from './logo.template.html';

export class Logo extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    return this.element;
  }
}
