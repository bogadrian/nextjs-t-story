import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const commonHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { url, method, data, accessToken }
  } = req;
  const instance = (axios as any)[method];

  try {
    const { data: resData, headers: returnedHeaders } = await instance(
      url,
      { data },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    Object.entries(returnedHeaders).forEach(keyArr =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );

    res.json({ resData });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default commonHandler;
