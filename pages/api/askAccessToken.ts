import axios from 'axios';

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
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
};

export default askAccessToken;
