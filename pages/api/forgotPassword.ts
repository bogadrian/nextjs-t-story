import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const externUrl = process.env.NEXT_EXTERN_URL;

const forgotPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;

  try {
    const { data } = await axios.post(
      `${externUrl}/auth/forgotPassword`,
      body,
      { headers: { ContentType: 'application/json' } }
    );

    const { message } = data as {
      message: string;
    };

    res.json({ message });
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

export default forgotPasswordHandler;
