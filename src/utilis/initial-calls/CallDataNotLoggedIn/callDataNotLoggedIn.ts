import axios from 'axios';
const internUrl = process.env.NEXT_INTERN_URL;
const externUrl = process.env.NEXT_EXTERN_URL;

export const callDataNotLoggedIn = async () => {
  try {
    const response = await axios.post(
      `${internUrl}/api`,
      {
        url: `${externUrl}/freeRoutes`,
        method: 'get',
        data: 'some data to pass here'
      },
      { headers: { ContentType: 'application/json' } }
    );

    return { logged: false, data: response.data };
  } catch (err: unknown) {
    return {
      logged: true,
      data: {
        message: (err as { response: { data: string } })?.response?.data,
        status: (err as { response: { status: number } })?.response?.status
      }
    };
  }
};
