import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './field.module.scss';
import template from './field.template.html';

export class Field extends ChildComponent {
  constructor({ placeholder, type = 'text', value = '', name, variant }) {
    super();

    if (!name) throw new Error('Please fill field "name"!');

    this.placeholder = placeholder;
    this.type = type;
    this.value = value;
    this.name = name;
    this.variant = variant;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    const inputElement = $R(this.element).find('input').input({
      placeholder: this.placeholder,
      type: this.type,
      value: this.value,
      name: this.name,
    });

    if (this.type === 'number') {
      inputElement.numberInput();
    }

    if (this.variant === 'credit-card') {
      inputElement.creditCardInput();
    }

    return this.element;
  }
}
