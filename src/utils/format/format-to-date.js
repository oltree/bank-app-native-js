/**
 * Formats a date in the "MMM DD, YYYY" format.
 * @param {string} dateString - the date string in the format "YYYY-MM-DDTHH:mm:ss.sssZ".
 * @returns {string} - the formatted date string in the format "MMM DD, YYYY".
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };

  return date.toLocaleDateString('en-US', options);
};
