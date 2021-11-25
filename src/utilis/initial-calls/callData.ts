import { NextApiRequest, NextApiResponse } from 'next';

import axios, { AxiosError } from 'axios';
import Cookies from 'cookies';

import { callDataLoggedIn } from './callDataLoggedIn';
import { callDataNotLoggedIn } from './CallDataNotLoggedIn';

import { isRefreshStillValid } from '../isRefreshStillValid';

const baseUrl = process.env.NEXT_INTERN_URL;

export const callData = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);

  const accessToken =
    req?.headers?.cookie
      ?.split(';')
      ?.filter((el: string) => el.includes('accessToken'))[0]
      ?.split('=')[1]
      .trim() ?? '';

  let refreshToken = req?.headers?.cookie
    ?.split(';')
    ?.filter((el: string) => el.includes('refreshToken'))[0]
    ?.split('=')[1]
    .trim() as string;

  const { isRefreshValid, expiresRefresh } = isRefreshStillValid(refreshToken);

  const isLoggedIn = refreshToken && isRefreshValid;

  const response = isLoggedIn
    ? await callDataLoggedIn(accessToken, refreshToken, cookies)
    : await callDataNotLoggedIn();

  return { response, expiresRefresh };
};

export const accessToken = async () => {
  try {
    return await axios.get(`${baseUrl}/api/cronJobAccessToken`);
  } catch (err: Error | AxiosError | unknown) {
    return err;
  }
};

export const getMe = async () => {
  try {
    return await axios.get(`${baseUrl}/api/getMe`);
  } catch (err: Error | AxiosError | unknown) {
    return err;
  }
};
