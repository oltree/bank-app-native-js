import { JSQuery } from '@/core/js-query';

export class UserService {
  #BASE_URL = '/users';

  getAll(searchTerm, onSuccess) {
    return JSQuery({
      path: `${this.#BASE_URL}${
        searchTerm
          ? `?${new URLSearchParams({
              searchTerm,
            })}`
          : ''
      }`,
      onSuccess,
    });
  }
}
