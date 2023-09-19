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

export const swrFetcher = async (url: string, options?: AxiosRequestConfig, onSuccess?: (data: any, res: AxiosResponse) => void, onError?: (err: any) => void) => {
  if (!url) return;
  return await axios
    .get(url, options)
    .then((res) =>{
      const { data } = res;
      onSuccess?.(data?.data, res);
      return data?.data;
    })
    .catch((err: any) => {
      onError?.(err);
      throw err;
    });
};

export default callApi;
