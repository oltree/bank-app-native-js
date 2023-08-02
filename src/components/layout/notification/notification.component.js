import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import styles from './notification.module.scss';
import template from './notification.template.html';

export class Notification extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    return this.element;
  }
}
