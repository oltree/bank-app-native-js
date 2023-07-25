import { ChildComponent } from '@/core/component';
import { $R } from '@/core/rquery';
import { RenderService } from '@/core/services';

import styles from './layout.module.scss';
import template from './layout.template.html';

import { Header } from './header/header.component';

export class Layout extends ChildComponent {
  constructor({ router, children }) {
    super();

    this.router = router;
    this.children = children;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    const mainElement = $R(this.element).find('main');

    const contentContainer = $R(this.element).find('#content');
    contentContainer.append(this.children);

    mainElement.before(new Header().render()).append(contentContainer.element);

    return this.element;
  }
}
