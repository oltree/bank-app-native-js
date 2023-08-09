import { JSQuery } from '@/core/js-query';
import { NotificationService } from '@/core/services';
import { Store } from '@/core/store';

export class AuthService {
  #BASE_URL = '/auth';

  constructor() {
    this.store = Store.getInstance();

    this.notificationService = new NotificationService();
  }

  register(body) {
    return JSQuery({
      path: `${this.#BASE_URL}/register`,
      body,
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'You have successfully registered!'
        );
      },
      method: 'POST',
    });
  }

  login(body) {
    return JSQuery({
      path: `${this.#BASE_URL}/login`,
      body,
      onSuccess: (data) => {
        this.store.login(data.user, data.accessToken);

        this.notificationService.show(
          'success',
          'You have successfully logged in!'
        );
      },
      method: 'POST',
    });
  }
}
