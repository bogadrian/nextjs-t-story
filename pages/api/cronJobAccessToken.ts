import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { isRefreshStillValid } from '../../src/utilis/isRefreshStillValid';
import Cookies from 'cookies';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_EXTERN_URL}/auth/refresh`,
  method: 'get'
});

const cronJobAccessToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const cookies = new Cookies(req, res);

  let refreshToken = req?.headers?.cookie
    ?.split(';')
    ?.filter((el: string) => el.includes('refreshToken'))[0]
    ?.split('=')[1]
    .trim();

  const { isRefreshValid } = isRefreshStillValid(
    refreshToken ? refreshToken : ''
  );

  if (!isRefreshValid) {
    res.json({ error: 'Refresh token not valid' });
    return;
  }

  try {
    const { data } = await axiosInstance({
      headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer ' + refreshToken
      }
    });

    const { token: accessToken } = data as { token: string };

    if (accessToken) {
      cookies.set('accessToken', accessToken, {
        httpOnly: true,
        overwrite: true,
        sameSite: true
      });
    }

    res.json({ accessToken });
  } catch (err) {
    if (
      (err as AxiosError<any>) &&
      (err as AxiosError<any>).code !== 'ECONNREFUSED'
    ) {
      console.log('err', err);
      res
        .status((err as AxiosError<any>)?.response?.data.statusCode)
        .json((err as AxiosError<any>)?.response?.data.message);
    } else {
      res.status(500).json('connection errors');
    }
  }
};

export default cronJobAccessToken;
