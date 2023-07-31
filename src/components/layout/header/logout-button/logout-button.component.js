import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './logout-button.module.scss';
import template from './logout-button.template.html';

export class LogoutButton extends ChildComponent {
  constructor({ router }) {
    super();

    this.router = router;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element)
      .find('button')
      .click(() => {
        this.router.navigate('/auth');
      });

    return this.element;
  }
}
