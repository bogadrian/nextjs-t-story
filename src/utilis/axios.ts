import axios, { AxiosError } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUser = async ({ accessToken }: { accessToken: string }) => {
  try {
    const user = await axios.get(`${baseUrl}/protected/getMe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    return user.data;
  } catch (err) {
    console.log(err);
  }
};
