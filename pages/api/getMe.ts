import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../custom-types';

const externUrl = process.env.NEXT_EXTERN_URL;

const getMeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken =
      req?.headers?.cookie
        ?.split(';')
        ?.filter((el: string) => el.includes('accessToken'))[0]
        ?.split('=')[1]
        .trim() ?? '';

    const { data } = await axios.get(`${externUrl}/protected/getMe`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });

    const { user } = data as { user: IUser };

    res.json({ user });
  } catch (err) {
    res
      .status((err as AxiosError<any>)?.response?.data.statusCode)
      .json((err as AxiosError<any>)?.response?.data.message);
  }
};

export default getMeHandler;
