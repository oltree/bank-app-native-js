import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';

import { UserItem } from '@/components/ui/user-item';

import styles from './header.module.scss';
import template from './header.template.html';

import { Logo } from './logo';
import { LogoutButton } from './logout-button';
import { Search } from './search';

export class Header extends ChildComponent {
  constructor({ router }) {
    super();

    this.router = router;
  }

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [
        Logo,
        new LogoutButton({
          router: this.router,
        }),
        Search,
        new UserItem({
          avatarPath:
            'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
          name: 'Oleg',
        }),
      ],
      styles
    );

    return this.element;
  }
}
