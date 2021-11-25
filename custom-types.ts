import { NextApiRequest, NextApiResponse } from 'next';

export type IUser = {
  photo: string;
  role: string;
  _id: string;
  name: string;
  email: string;
  passwordChangedAt: Date;
};

export type IContext = { req: NextApiRequest } & { res: NextApiResponse };
