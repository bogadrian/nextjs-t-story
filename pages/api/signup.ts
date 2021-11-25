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
  } catch (err: AxiosError | unknown) {
    res.json((err as AxiosError)?.response?.data);
  }
};

export default signupHandler;
