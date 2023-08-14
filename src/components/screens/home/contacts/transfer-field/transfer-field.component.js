import { CardService } from '@/api/card.service';

import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import {
  BALANCE_UPDATED,
  TRANSACTION_COMPLETED,
} from '@/constants/event.constants';

import {
  NotificationService,
  RenderService,
  ValidationService,
} from '@/core/services';
import { ChildComponent } from '@/core/component';
import { Store } from '@/core/store';
import { $R } from '@/core/rquery';

import styles from './transfer-field.module.scss';
import template from './transfer-field.template.html';

export const TRANSFER_FIELD_SELECTOR = '[name="card-number"]';

export class TransferField extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.cardService = new CardService();
    this.notificationService = new NotificationService();
  }

  handleTransfer = (event) => {
    event.preventDefault();

    if (!this.store.user) {
      this.notificationService.show('error', 'You need authorization!');
    }

    $R(event.target).text('Sending...').attribute('disabled', true);

    const inputElement = $R(this.element).find('input');
    const toCardNumber = inputElement.value().replaceAll('-', '');

    const reset = () => {
      $R(event.target).removeAttribute('disabled').text('Send');
    };

    if (!toCardNumber) {
      ValidationService.showError($R(this.element).find('label'));
      reset();

      return;
    }

    let amount = prompt('Transfer amount 👇');

    this.cardService.transfer({ amount, toCardNumber }, () => {
      inputElement.value('');
      amount = '';

      document.dispatchEvent(new Event(TRANSACTION_COMPLETED));
      document.dispatchEvent(new Event(BALANCE_UPDATED));
    });

    reset();
  };

  render() {
    this.element = RenderService.htmlToElement(
      template,
      [
        new Field({
          name: 'card-number',
          placeholder: 'xxxx-xxxx-xxxx-xxxx',
          variant: 'credit-card',
        }),
        new Button({
          children: 'Send',
          variant: 'purple',
          onClick: this.handleTransfer,
        }),
      ],
      styles
    );

    return this.element;
  }
}
