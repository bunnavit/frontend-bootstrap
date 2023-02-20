import axios, { AxiosRequestHeaders } from 'axios';
import { storeJWTs } from '../../services/TokenService';
import { getRequestHeaders } from '../../util/url';

// change the BASE_URL
const BASE_URL = 'placeholder';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  method: 'post',
  withCredentials: true,
});

// Cast as AxiosRequestHeaders (temporary workaround)
// https://github.com/axios/axios/issues/5034
axiosInstance.interceptors.request.use(
  (config) => {
    return { ...config, headers: getRequestHeaders('protected') as AxiosRequestHeaders };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    storeJWTs({
      idToken: response.headers.id_token,
      accessToken: response.headers.access_token,
    });
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * ----------------------------------------------------------------------------
 * API requests
 * ----------------------------------------------------------------------------
 */
