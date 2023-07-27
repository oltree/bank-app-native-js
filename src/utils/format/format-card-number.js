/**
 * Formats a credit card number string by adding dashes (-) after every 4th character.
 * @param {string} cardNumber - the credit card number string to format.
 * @return {string} - returns the formatted credit card number string.
 */
export const formatCardNumberWithDashes = (cardNumber) =>
  cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
