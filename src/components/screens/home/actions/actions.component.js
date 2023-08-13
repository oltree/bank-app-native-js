import { CardService } from '@/api/card.service';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';

import { BALANCE_UPDATED } from '@/constants/event.constants';

import { ChildComponent } from '@/core/component';
import { $R } from '@/core/rquery';
import {
  NotificationService,
  RenderService,
  ValidationService,
} from '@/core/services';
import { Store } from '@/core/store';

import styles from './actions.module.scss';
import template from './actions.template.html';

export class Actions extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.cardService = new CardService();
    this.notificationService = new NotificationService();
  }

  updateBalance(event, type) {
    event.preventDefault();

    if (!this.store.user) {
      this.notificationService.show('error', 'You need authorization!');
    }

    $R(event.target).text('Sending...').attribute('disabled', true);

    const inputElement = $R(this.element).find('input');
    const amount = inputElement.value();

    if (!amount) {
      ValidationService.showError($R(this.element).find('label'));

      return;
    }

    this.cardService.updateBalance(amount, type, () => {
      inputElement.value('');

      const balanceUpdatedEvent = new Event(BALANCE_UPDATED); // custom event
      document.dispatchEvent(balanceUpdatedEvent);
    });

    $R(event.target).removeAttribute('disabled').text(type);
  }

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [
        new Field({
          name: 'amount',
          placeholder: 'Enter amount:',
          type: 'number',
        }),
      ],
      styles
    );

    $R(this.element)
      .find('#action-buttons')
      .append(
        new Button({
          children: 'Top-up',
          variant: 'green',
          onClick: (e) => this.updateBalance(e, 'top-up'),
        }).render()
      )
      .append(
        new Button({
          children: 'Withdrawal',
          variant: 'purple',
          onClick: (e) => this.updateBalance(e, 'withdrawal'),
        }).render()
      );

    return this.element;
  }
}
