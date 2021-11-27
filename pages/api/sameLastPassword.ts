import axios, { AxiosError } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const externUrl = process.env.NEXT_EXTERN_URL;

const sameLastPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  let accessToken = req?.headers?.cookie
    ?.split(';')
    ?.filter((el: string) => el.includes('accessToken'))[0]
    ?.split('=')[1]
    .trim();

  const { url } = body;

  try {
    const data = await axios.post(`${externUrl}/${url}`, body, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });

    res.json({ data: data.data });
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

export default sameLastPassword;
