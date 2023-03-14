import axios, { AxiosRequestHeaders } from 'axios';
import { getRequestHeaders } from '../../util/url';
import { storeJWTs } from '../TokenService';

type CreateAxiosParams = {
  baseUrl: string;
  isProtected: boolean;
};

export const createAxiosInstance = (params: CreateAxiosParams) => {
  const { baseUrl, isProtected } = params;
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    method: 'post',
    withCredentials: isProtected,
  });

  // Cast as AxiosRequestHeaders (temporary workaround)
  // https://github.com/axios/axios/issues/5034
  axiosInstance.interceptors.request.use(
    (config) => {
      return {
        ...config,
        headers: getRequestHeaders(
          isProtected ? 'protected' : 'unprotected'
        ) as AxiosRequestHeaders,
      };
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

  return axiosInstance;
};
