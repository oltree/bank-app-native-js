/**
 * Formats a credit card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - the credit card number string to format.
 * @return {string} - returns the formatted credit card number string.
 */
export const formatCardNumberWithDashes = (cardNumber) =>
  cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');

/**
 * Formats a credit card number into the format **** **** **** ****.
 * @param {string} cardNumber - the credit card number consisting of 16 digits without separators.
 * @returns {string} - the formatted credit card number.
 */
export const formatCardNumber = (cardNumber) => {
  const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g);

  return formattedNumber ? formattedNumber.join(' ') : '';
};
