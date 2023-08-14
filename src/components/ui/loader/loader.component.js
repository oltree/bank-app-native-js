import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
// import { $R } from '@/core/rquery';

import template from './loader.template.html';

export const LOADER_SELECTOR = '[data-component="loader"]';

export class Loader extends ChildComponent {
  constructor(width = 100, height = 100) {
    super();

    this.width = width;
    this.height = height;
  }

  render() {
    this.element = RenderService.htmlToElement(template, []);

    // не добавляет из-за плохой svg
    /* $R(this.element)
      .css('width', `${this.width}px`)
      .css('height', `${this.height}px`)
      .addClass('bounce'); */

    this.element.style = `width: ${this.width}px; height: ${this.height}px`;
    this.element.classList.add('bounce');

    return this.element;
  }
}
