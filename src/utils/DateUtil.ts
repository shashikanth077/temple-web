import moment from 'moment';

/**
 * Formats the given date string using the 'YYYY-MM-DD' format.
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (Date:string) => moment(Date).format('YYYY-MM-DD');
