import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const externUrl = process.env.NEXT_EXTERN_URL;

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  try {
    const data = await axios.post(`${externUrl}/auth/signup`, body, {
      headers: { ContentType: 'application/json' }
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

export default signupHandler;
