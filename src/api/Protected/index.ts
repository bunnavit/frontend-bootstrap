import { createAxiosInstance } from '../../services/Axios';

// change the BASE_URL
const BASE_URL = 'placeholder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const axiosProtectedInstance = createAxiosInstance({
  baseUrl: BASE_URL,
  isProtected: true,
});

/**
 * ----------------------------------------------------------------------------
 * API requests
 * ----------------------------------------------------------------------------
 */
