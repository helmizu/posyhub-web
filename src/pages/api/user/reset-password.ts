import callApi from '@/utils/network';
import { AxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const session = await getServerSession(request, response, authOptions);
    if (!session) return response.status(403).json({ status: 403, message: 'Unauthorized' });
    const { accessToken = '' } = session.user as any;
    const requestConfig: AxiosRequestConfig = {
      method: 'PUT',
      baseURL: process.env.API_BASE_URL,
      url: '/reset-password/' + request.body.username,
      data: { password: request.body.password },
      headers: {
        Authorization: `Bearer ${accessToken || ''}`
      }
    };
    const res = await callApi(requestConfig);
    return response.status(res?.status).json(res?.data);
  } catch (error: any) {
    const status = error?.status || error?.response?.data?.status || 500;
    return response.status(status).json(error?.response?.data || { message: error?.message || '' });
  }
}