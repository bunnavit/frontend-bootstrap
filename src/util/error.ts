import axios from 'axios';

export const getErrorMessage = (
  error: unknown,
  defaultMessage = 'There was an error'
) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403) return 'Your session has expired.';
    const message =
      typeof error.response?.data === 'string' ? error.response.data : undefined;
    return message || error.response?.data.message || error.message || defaultMessage;
  }

  return error instanceof Error ? error.message : defaultMessage;
};

export const isForbiddenError = (error: unknown) => {
  return axios.isAxiosError(error) && error.response?.status === 403;
};
