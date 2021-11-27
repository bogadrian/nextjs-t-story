import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { isRefreshStillValid } from '../../src/utilis/isRefreshStillValid';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_EXTERN_URL}/auth/refresh`,
  method: 'get'
});

const askAccessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { isRefreshValid } = isRefreshStillValid(req.body.refreshToken);

  if (!isRefreshValid) {
    res.json({ error: 'Refresh token not valid' });
    return;
  }

  try {
    const { data } = await axiosInstance({
      headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer ' + req.body.refreshToken
      }
    });

    const { token: accessToken } = data as { token: string };

    if (accessToken) {
      res.json({ accessToken });
    } else {
      res.status(403).json({ status: 'failure' });
    }
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

export default askAccessToken;
