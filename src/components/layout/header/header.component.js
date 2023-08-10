import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';
import { Store } from '@/core/store';

import { UserItem } from '@/components/ui/user-item';

import styles from './header.module.scss';
import template from './header.template.html';

import { Logo } from './logo';
import { LogoutButton } from './logout-button';
import { Search } from './search';

export class Header extends ChildComponent {
  constructor({ router }) {
    super();

    this.store = Store.getInstance();
    this.store.addObserver(this);

    this.router = router;

    this.userItem = new UserItem({
      avatarPath: '/',
      name: 'User',
    });
  }

  update() {
    this.user = this.store.state.user;

    const authSideElement = $R(this.element).find('#auth-side');

    if (this.user) {
      authSideElement.show();

      this.userItem.update(this.user);

      this.router.navigate('/');
    } else {
      authSideElement.hide();
    }
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
        this.userItem,
      ],
      styles
    );

    this.update();

    return this.element;
  }
}
