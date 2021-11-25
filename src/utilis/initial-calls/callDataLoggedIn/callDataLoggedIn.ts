import axios from 'axios';
const internUrl = process.env.NEXT_INTERN_URL;
const externUrl = process.env.NEXT_EXTERN_URL;
import Cookies from 'cookies';
import { addMinutes } from 'date-fns';

export const callDataLoggedIn = async (
  accessToken: string,
  refreshToken: string,
  cookies: Cookies
) => {
  try {
    const response = await axios.post(
      `${internUrl}/api`,
      {
        url: `${externUrl}/protected/admin`,
        method: 'post',
        data: 'some data to pass here',
        accessToken: accessToken ? accessToken : '',
        refreshToken: refreshToken ? refreshToken : ''
      },
      {
        headers: {
          accessToken: accessToken ? accessToken : '',
          refreshToken: refreshToken ? refreshToken : ''
        }
      }
    );

    const { token } = response.headers;

    if (token) {
      cookies.set('accessToken', token, {
        httpOnly: true,
        overwrite: true,
        sameSite: true,
        expires: addMinutes(new Date(Date.now()), 5),
        maxAge: addMinutes(new Date(Date.now()), 5).getTime()
      });
    }

    return { logged: true, data: response.data };
  } catch (err: unknown) {
    return {
      logged: true,
      data: {
        message: (err as { response: { statusText: string } })?.response
          ?.statusText,
        status: (err as { response: { status: number } })?.response?.status
      }
    };
  }
};
