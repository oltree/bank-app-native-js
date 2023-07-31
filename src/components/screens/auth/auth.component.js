import { ScreenComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import { Heading } from '@/components/ui/heading';

import styles from './auth.module.scss';
import template from './auth.template.html';

export class Auth extends ScreenComponent {
  constructor() {
    super({ title: 'Auth' });
  }

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [new Heading('Auth')],
      styles
    );

    return this.element;
  }
}
