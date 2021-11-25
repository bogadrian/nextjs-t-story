import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../custom-types';

const externUrl = process.env.NEXT_EXTERN_URL;

const resetPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;
  try {
    const { data } = await axios.post(`${externUrl}/auth/resetPassword`, body, {
      headers: { ContentType: 'application/json' }
    });

    const { user } = data as {
      user: IUser;
    };

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

export default resetPasswordHandler;
