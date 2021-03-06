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
  } catch (err) {
    if (
      (err as AxiosError<any>) &&
      (err as AxiosError<any>).code !== 'ECONNREFUSED'
    ) {
      res
        .status((err as AxiosError<any>)?.response?.data.statusCode)
        .json((err as AxiosError<any>)?.response?.data.message);
    } else {
      res.status(500).json('connection errors');
    }
  }
};

export default forgotPasswordHandler;
