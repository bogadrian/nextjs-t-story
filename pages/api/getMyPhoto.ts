import axios, { AxiosError, AxiosResponse } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const externUrl = process.env.NEXT_EXTERN_URL;

const getMyPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.body.key;
  try {
    const accessToken =
      req?.headers?.cookie
        ?.split(';')
        ?.filter((el: string) => el.includes('accessToken'))[0]
        ?.split('=')[1]
        .trim() ?? '';

    const { data, headers } = await axios.get(
      `${externUrl}/user/getMyPhoto/${key}`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );

    console.log(data);
    res.send(data);
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

export default getMyPhoto;
