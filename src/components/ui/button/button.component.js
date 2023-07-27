import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './button.module.scss';
import template from './button.template.html';

export class Button extends ChildComponent {
  constructor({ children, onClick, variant }) {
    super();

    if (!children) throw new Error('Children is empty!');

    this.children = children;
    this.onClick = onClick;
    this.variant = variant;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element).html(this.children).click(this.onClick);

    if (this.variant) {
      $R(this.element).addClass(styles[this.variant]);
    }

    return this.element;
  }
}
