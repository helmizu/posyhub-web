import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const CancelToken = axios.CancelToken;
let cancel: any = undefined;

export const callApi = async (config: AxiosRequestConfig, withCancel?: boolean) => {
  if (cancel != undefined && withCancel) { cancel(); }
  config.timeout = 30000;

  try {
    const options: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    };
    const response = await axios(options);
    if (response && response.data) {
      return response.data;
    }
    return Promise.reject('request failed');
  } catch (error: any) {
    // const statusCode = error?.response?.code || error.response.data?.status;
    // if (statusCode.code === 401) {
    //   const newToken = '';
    //   return reFetch(config, newToken);
    // }
    return Promise.reject(error.response?.data);
  }
};

export const swrCallApi = async (url: string, options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error: any) {
    const statusCode = error.response.data?.status || error?.response?.code;
    if (statusCode === 401) {
      return window.location.href = '/logout';
    }
    console.log({ error });
    throw error;
  }
};

export default callApi;
