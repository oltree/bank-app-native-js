import { StatisticService } from '@/api/statistic.service';

import { Heading } from '@/components/ui/heading';
import { LOADER_SELECTOR, Loader } from '@/components/ui/loader';

import { TRANSACTION_COMPLETED } from '@/constants/event.constants';

import { ChildComponent } from '@/core/component';
import { Store } from '@/core/store';
import { RenderService } from '@/core/services';
import { $R } from '@/core/rquery';

import { formatToCurrency } from '@/utils/format/formtat-to-currency';

import { StatisticsItem } from './statistics-item';

import styles from './statistics.module.scss';
import template from './statistics.template.html';

export class Statistics extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.statisticService = new StatisticService();

    this.element = RenderService.htmlToElement(
      template,
      [new Heading('Statistics')],
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
    this.statisticService.getStatistic((data) => {
      if (!data) return;

      const loaderElement = this.element.querySelector(LOADER_SELECTOR);
      if (loaderElement) {
        loaderElement.remove();
      }

      const statisticsItemsElement = $R(this.element).find('#statistics-items');
      statisticsItemsElement.text('');

      /* const circleChartElement = $R(this.element).find('#circle-chart');
      circleChartElement.text(''); */

      statisticsItemsElement
        .append(
          new StatisticsItem(
            'Income:',
            formatToCurrency(data[0].value ?? 0),
            'green'
          ).render()
        )
        .append(
          new StatisticsItem(
            'Expense:',
            formatToCurrency(data[1].value ?? 0),
            'purple'
          ).render()
        );
    });
  }

  render() {
    if (this.store.user) {
      $R(this.element).append(new Loader().render());
      this.fetchData();
    }

    return this.element;
  }
}
