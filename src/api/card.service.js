import { JSQuery } from '@/core/js-query';
import { NotificationService } from '@/core/services';

export class CardService {
  #BASE_URL = '/cards';

  constructor() {
    // working with store!

    this.notificationService = new NotificationService();
  }

  byUser(onSuccess) {
    return JSQuery({
      path: `${this.#BASE_URL}/by-user`,
      onSuccess,
    });
  }

  /**
   * Updates the user's balance with the specified amount and type.
   * @param {number} amount - the amount to be added or withdrawn from the user's balance.
   * @param {'top-up' | 'withdrawal'} type - the type of the transaction, either "top-up" or "withdrawal".
   * @param {function} onSuccess - the callback function to be executed when the balance update is successful.
   * @returns {Promise} - a promise object that resolves to the response from the API.
   */
  updateBalance(amount, type, onSuccess) {
    return JSQuery({
      path: `${this.#BASE_URL}/balance/${type}`,
      body: { amount: Number(amount) },
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Balance successfully changed!'
        );
        onSuccess();
      },
      method: 'PATCH',
    });
  }

  /**
   * Transfers money between two card numbers.
   * @function
   * @param {Object} body - the transfer details.
   * @param {number} body.amount - the amount to be transferred.
   * @param {string} body.toCardNumber - the recipient's card number.
   * @param {Function} onSuccess - the callback function to be executed upon successful transfer.
   * @returns {Promise} - a promise that resolves with the redQuery response.
   */
  transfer(body, onSuccess) {
    return JSQuery({
      path: `${this.#BASE_URL}/transfer-money`,
      body: {
        amount: Number(body.amount),
        // fromCardNumber: this.store.user.card.number,
        // body.toCardNumber
      },
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Transfer successfully completed!'
        );
        onSuccess();
      },
      method: 'PATCH',
    });
  }
}
