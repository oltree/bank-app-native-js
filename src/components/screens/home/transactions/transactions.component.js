import { TransactionService } from '@/api/transaction.service';

import { ChildComponent } from '@/core/component';
import { Store } from '@/core/store';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { Heading } from '@/components/ui/heading';
import { LOADER_SELECTOR, Loader } from '@/components/ui/loader';

import { TRANSACTION_COMPLETED } from '@/constants/event.constants';

import { TransactionItem } from './transaction-item';

import styles from './transactions.module.scss';
import template from './transactions.template.html';

export class Transactions extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.transactionService = new TransactionService();

    this.element = RenderService.htmlToElement(
      template,
      [new Heading('Recent transactions')],
      styles
    );

    this.#addListeners();
  }

  #addListeners() {
    document.addEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted
    );
  }

  #removeListeners() {
    document.removeEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted
    );
  }

  #onTransactionCompleted = () => {
    this.fetchData();
  };

  destroy() {
    this.#removeListeners();
  }

  fetchData() {
    this.transactionService.getAll((data) => {
      if (!data) return;

      const loaderElement = this.element.querySelector(LOADER_SELECTOR);
      if (loaderElement) {
        loaderElement.remove();
      }

      const transactionsList = $R(this.element).find('#transactions-list');
      transactionsList.text('');

      if (data.length) {
        for (const transaction of data.transactions) {
          transactionsList.append(new TransactionItem(transaction).render());
        }
      } else {
        transactionsList.text('Transactions not found!');
      }
    });
  }

  render() {
    if (this.store.user) {
      $R(this.element).append(new Loader().render());

      setTimeout(() => this.fetchData(), 500);
    }

    return this.element;
  }
}
