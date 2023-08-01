import { SERVER_URL } from '@/config/url.config';

import { extractErrorMessage } from './extract-error-message';

/**
 * JSQuery is a library for handling API requests.
 * Fetch data from the API with provided options.
 *
 * @param {Object} options - configuration options for the API request.
 * @param {string} options.path - the API endpoint path.
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method='GET'] - the HTTP method to use for the request.
 * @param {Object} [options.body=null] - the request payload to send as JSON.
 * @param {Object} [options.headers={}] - additional headers to include with the request.
 * @param {Function} [options.onSuccess=null] - callback function to be called on successful response.
 * @param {Function} [options.onError=null] - callback function to be called on error response.
 * @returns {Promise<{isLoading: boolean, error: string|null, data: any|null}>} - an object containing the loading state, error, and data from the response.
 */
export const JSQuery = async ({
  path,
  body = null,
  headers = {},
  method = 'GET',
  onError = null,
  onSuccess = null,
}) => {
  let isLoading = true,
    error = null,
    data = null;

  const url = `${SERVER_URL}/api${path}`;

  const accessToken = '';

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      data = await response.json();

      if (onSuccess) {
        onSuccess(data);
      }
    } else {
      const error = await response.json();
      const errorMessage = extractErrorMessage(error);

      if (onError) {
        onError(errorMessage);
      }

      /* Notification error */
    }
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    if (errorMessage) {
      onError(errorMessage);
    }
  } finally {
    isLoading = false;
  }

  return { isLoading, error, data };
};
