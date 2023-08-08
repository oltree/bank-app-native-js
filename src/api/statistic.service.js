import { JSQuery } from '@/core/js-query';

export class StatisticService {
  #BASE_URL = '/statistics';

  getStatistic(onSuccess) {
    return JSQuery({
      path: this.#BASE_URL,
      onSuccess,
    });
  }
}
