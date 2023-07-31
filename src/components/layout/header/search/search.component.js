import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import styles from './search.module.scss';
import template from './search.template.html';

export class Search extends ChildComponent {
  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    $R(this.element).find('input').input({
      type: 'search',
      name: 'search',
      placeholder: 'Search contacts...',
    });

    return this.element;
  }
}
