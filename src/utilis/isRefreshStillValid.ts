import jwt from 'jsonwebtoken';
import { isBefore } from 'date-fns';

export const isRefreshStillValid = (refreshToken: string) => {
  const decodedRefreshToken = jwt.decode(refreshToken ? refreshToken : '');

  let expiresRefresh = 99999999999;
  if (decodedRefreshToken) {
    const { exp } = decodedRefreshToken as { exp: number };

    expiresRefresh = exp * 1000;
  }
  const isRefreshValid = isBefore(
    new Date(Date.now()),
    new Date(expiresRefresh)
  );

  return { isRefreshValid, expiresRefresh };
};
