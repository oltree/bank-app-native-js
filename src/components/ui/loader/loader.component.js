import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './loader.module.scss';
import template from './loader.template.html';

export const LOADER_SELECTOR = '[data-component="loader"]';

export class Loader extends ChildComponent {
  constructor(width = 100, height = 100) {
    super();

    this.width = width;
    this.height = height;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element)
      .css('width', `${this.width}px`)
      .css('height', `${this.height}px`)
      .addClass('bounce');

    return this.element;
  }
}
