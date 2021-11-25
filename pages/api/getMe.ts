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

    const { userRes: user } = data as { userRes: IUser };

    res.json({ user });
  } catch (err: AxiosError | unknown) {
    res
      .status(
        ((err as AxiosError)?.response?.data as { statusCode: number })
          ?.statusCode
      )
      .json({
        message: ((err as AxiosError)?.response?.data as { message: string })
          ?.message
      });
  }
};

export default getMeHandler;
