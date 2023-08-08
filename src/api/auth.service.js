import { JSQuery } from '@/core/js-query';
import { NotificationService } from '@/core/services';

export class AuthService {
  #BASE_URL = '/auth';

  constructor() {
    // working with store!

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
      onSuccess: (/* data */) => {
        // put data in the store

        this.notificationService.show(
          'success',
          'You have successfully logged in!'
        );
      },
      method: 'POST',
    });
  }
}
