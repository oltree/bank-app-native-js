import { ChildComponent } from '@/core/component';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { formatToCurrency } from '@/utils/format/formtat-to-currency';
import { formatDate } from '@/utils/format/format-to-date';

import styles from './transaction-item.module.scss';
import template from './transaction-item.template.html';

export class TransactionItem extends ChildComponent {
  constructor(transaction) {
    super();

    this.transaction = transaction;
  }

  render() {
    this.element = RenderService.htmlToElement(template, [], styles);

    const isIncome = this.transaction.type === 'TOP_UP';
    const name = isIncome ? 'Income' : 'Expense';

    if (isIncome) {
      $R(this.element).addClass(styles.income);
    }

    $R(this.element).find('#transaction-name').text(name);

    $R(this.element)
      .find('#transaction-date')
      .text(formatDate(this.transaction.createdAt));

    $R(this.element)
      .find('#transaction-amount')
      .text(formatToCurrency(this.transaction.amount));

    return this.element;
  }
}
