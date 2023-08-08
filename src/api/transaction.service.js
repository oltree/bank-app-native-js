import { JSQuery } from '@/core/js-query';

export class TransactionService {
  #BASE_URL = '/transactions';

  getAll(onSuccess) {
    return JSQuery({
      path:
        this.#BASE_URL +
        `?${new URLSearchParams({
          orderBy: 'desc',
        })}`,
      onSuccess,
    });
  }
}
