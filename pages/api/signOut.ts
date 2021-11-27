import axios, { AxiosError, AxiosResponse } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

import Cookies from 'cookies';

const externUrl = process.env.NEXT_EXTERN_URL;

const signOutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  try {
    const data: AxiosResponse = await axios.get(`${externUrl}/auth/signOut`);

    // Object.entries(returnedHeaders).forEach(keyArr =>
    //   res.setHeader(keyArr[0], keyArr[1] as string)
    // );

    cookies.set('refreshToken', '', {
      httpOnly: true,
      sameSite: true,
      overwrite: true,
      secure: process.env.NEXT_ENV !== 'development'
    });

    cookies.set('accessToken', '', {
      httpOnly: true,
      overwrite: true,
      sameSite: true
    });

    res.json(data.data);
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

export default signOutHandler;
