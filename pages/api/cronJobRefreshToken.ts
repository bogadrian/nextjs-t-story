import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

import Cookies from 'cookies';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_EXTERN_URL}/auth/newRefreshToken`,
  method: 'get'
});

const cronJobRefreshToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const cookies = new Cookies(req, res);
  try {
    let refreshToken = req?.headers?.cookie
      ?.split(';')
      ?.filter((el: string) => el.includes('refreshToken'))[0]
      ?.split('=')[1]
      .trim();

    const { data } = await axiosInstance({
      headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer ' + refreshToken
      }
    });
    const { refreshToken: newRefreshToken } = data as {
      refreshToken: string;
    };

    if (newRefreshToken) {
      cookies.set('refreshToken', newRefreshToken as string, {
        httpOnly: true,
        overwrite: true,
        sameSite: true,
        secure: process.env.NEXT_ENV !== 'development'
      });
      res.json({
        refreshToken: newRefreshToken ? newRefreshToken : null
      });
    } else {
      res.json({ status: 'waiting for a new refresh token' });
    }
  } catch (err) {
    if (
      (err as AxiosError<any>) &&
      (err as AxiosError<any>).code !== 'ECONNREFUSED'
    ) {
      res
        .status((err as AxiosError<any>)?.response?.data.statusCode)
        .json((err as AxiosError<any>)?.response?.data.message);
    } else {
      res.status(500).json('connection errors');
    }
  }
};

export default cronJobRefreshToken;
