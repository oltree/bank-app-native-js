import { UserService } from '@/api/user.service';

import { UserItem } from '@/components/ui/user-item';
import { Loader } from '@/components/ui/loader';
import { Heading } from '@/components/ui/heading';
import { LOADER_SELECTOR } from '@/components/ui/loader/loader.component';

import { ChildComponent } from '@/core/component';
import { Store } from '@/core/store';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { formatCardNumberWithDashes } from '@/utils/format/format-card-number';

import styles from './contacts.module.scss';
import template from './contacts.template.html';
import { TRANSFER_FIELD_SELECTOR, TransferField } from './transfer-field';

export class Contacts extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.userService = new UserService();
  }

  fetchData() {
    this.userService.getAll(null, (data) => {
      if (!data) return;

      this.element.querySelector(LOADER_SELECTOR).remove();

      for (const user of data) {
        $R(this.element)
          .find('#contacts-list')
          .append(
            new UserItem(user, true, () => {
              $R(TRANSFER_FIELD_SELECTOR).value(
                formatCardNumberWithDashes(user.card.number)
              );
            }).render()
          );
      }

      $R(this.element)
        .find('#contacts-list')
        .findAll('button')
        .forEach((contactElement) => {
          contactElement.addClass('fade-in');
        });
    });
  }

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [TransferField, new Heading('Transfer money')],
      styles
    );

    if (this.store.user) {
      $R(this.element)
        .find('#contacts-list')
        .html(new Loader().render().outerHTML);

      setTimeout(() => this.fetchData(), 500);
    }

    return this.element;
  }
}
