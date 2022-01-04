import { useState, useEffect } from 'react';

import { useRefreshToken } from '../src/hooks/refresh-token';
import type { NextPage } from 'next';
import Head from 'next/head';

import { AxiosResponse } from 'axios';

import { IContext } from '../custom-types';
import { toast } from 'react-toastify';
import { callData, getMe } from '../src/utilis/initial-calls/callData';

import { IUser } from '../custom-types';

import { isLoggedIn } from '../src/recoil';
import { useSetRecoilState } from 'recoil';

interface Props {
  data: {
    response: any;
    expiresRefresh: number;
    logged: boolean;
  };
}

const Home: NextPage<Props> = ({ data }) => {
  const setIsLogged = useSetRecoilState(isLoggedIn);
  const { response, expiresRefresh, logged } = data;

  const [value, setValue] = useState<string>('');

  console.log('data in home', response.data, logged);

  useEffect(() => {
    if (response?.data?.status && response?.data?.status !== 200) {
      toast.error(
        `Status: ${response?.data?.status} ${response?.data?.message}`,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
  }, [response]);

  const notify = () => {
    // toast.success('Success Notification !', {
    //   position: toast.POSITION.TOP_CENTER
    // });
    // toast.error('Error Notification !', {
    //   position: toast.POSITION.TOP_LEFT
    // });
    // toast.warn('Warning Notification !', {
    //   position: toast.POSITION.BOTTOM_LEFT
    // });
    // toast.info('Info Notification !', {
    //   position: toast.POSITION.BOTTOM_CENTER
    // });
    // toast('Custom Style Notification with css class!', {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
  };

  // todo. move this logic somehow in _app tsx. all the pages need to check if the user is logged in not only the index. what if the user stays on user page for longer then 5v minutes?
  useEffect(() => {
    if (!logged) {
      localStorage.setItem('user', JSON.stringify({}));
      setIsLogged(false);
    } else {
      (async () => {
        const { data } = (await getMe()) as AxiosResponse;
        if (data) {
          const { user } = data as { user: IUser };
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      })();
    }

    if (logged) {
      setIsLogged(true);
    }
  }, [logged, setIsLogged]);

  useRefreshToken(expiresRefresh);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Main page content</main>

      <footer></footer>
    </div>
  );
};

export async function getServerSideProps(context: IContext) {
  const { req, res } = context;

  const dataResponse = await callData(req, res);

  const { response, expiresRefresh } = dataResponse as {
    response: unknown;
    expiresRefresh: number;
  };

  const { logged = false } = response as { logged: boolean };

  return {
    props: {
      data: {
        response,
        logged,
        expiresRefresh: expiresRefresh ? expiresRefresh : 99999999999
      }
    }
  };
}
export default Home;
