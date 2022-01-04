import axios, { AxiosError, AxiosResponse } from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

import httpProxyMiddleware from 'next-http-proxy-middleware';

const externUrl = process.env.NEXT_EXTERN_URL;

export const config = {
  api: {
    bodyParser: false
  }
};

const imageProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken =
      req?.headers?.cookie
        ?.split(';')
        ?.filter((el: string) => el.includes('accessToken'))[0]
        ?.split('=')[1]
        .trim() ?? '';

    const axiosInstance = await axios.create({
      baseURL: `${externUrl}/user/uploadUserPhoto`,
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': req.headers['content-type']!
      }
    });

    const response = await axiosInstance({
      method: 'PATCH',
      data: req
    });

    console.log(response.data);
    res.json(response.data);
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

export default imageProfile;
