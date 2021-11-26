import axios, { AxiosError, AxiosResponse } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

import { ServerError } from '../../src/utilis/errors';

const commonHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { url, method, data, accessToken }
  } = req;
  const instance = (axios as any)[method];

  try {
    const response = await instance(
      url,
      { data },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ data: response.data });
  } catch (err) {
    res
      .status((err as AxiosError<any>)?.response?.data.statusCode)
      .json((err as AxiosError<any>)?.response?.data.message);
  }
};

export default commonHandler;
