import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../custom-types';
import Cookies from 'cookies';
import { addMinutes, addDays } from 'date-fns';
const externUrl = process.env.NEXT_EXTERN_URL;

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const cookies = new Cookies(req, res);
  try {
    const { data, headers: returnedHeaders } = await axios.post(
      `${externUrl}/auth/login`,
      body
    );
    Object.entries(returnedHeaders).forEach(keyArr =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );

    const { user, token: accessToken, refreshToken } = data as {
      token: string;
      refreshToken: string;
      user: IUser;
    };

    cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: true,
      overwrite: true,
      expires: addDays(new Date(Date.now()), 7),
      maxAge: addDays(new Date(Date.now()), 7).getTime(),
      secure: process.env.NEXT_ENV !== 'development'
    });

    cookies.set('accessToken', accessToken, {
      httpOnly: true,
      overwrite: true,
      sameSite: true,
      expires: addMinutes(new Date(Date.now()), 5),
      maxAge: addMinutes(new Date(Date.now()), 5).getTime()
    });

    res.json({ user });
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

export default loginHandler;
