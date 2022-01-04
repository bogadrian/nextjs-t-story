import { Fragment, useState, useEffect } from 'react';
import { accessToken } from '../src/utilis/initial-calls/callData';

import { useInterval } from '../src/hooks';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../src/components/layout';
import { useMediaQuery } from '../src/hooks';
import { Header } from '../src/Ui-components/Header';

import { useGetUser } from '../src/hooks/getUserFromLS';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import axios, { AxiosResponse } from 'axios';
import { isRefreshStillValid } from '../src/utilis/isRefreshStillValid';

const accessTokenHoc = (refreshToken: string | undefined) => {
  const innerAccessToken = async () => {
    return await axios.post(
      `${process.env.NEXT_INTERN_URL}/api/askAccessToken`,
      {
        refreshToken
      },
      { headers: { withCredentials: 'include' } }
    );
  };

  return innerAccessToken;
};

let callAccessNew: () => Promise<AxiosResponse<unknown, any>>;

axios.interceptors.request.use(
  function (config) {
    if (!config?.data?.refreshToken) {
      return config;
    }

    const { isRefreshValid } = isRefreshStillValid(config?.data?.refreshToken);

    if (isRefreshValid) {
      callAccessNew = accessTokenHoc(config?.data?.refreshToken);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error?.response?.data?.statusCode !== 401) {
      return Promise.reject(error);
    }
    const lastRequest = error.config;

    lastRequest._retry = true;

    if (
      error &&
      error?.response?.data?.statusCode === 401 &&
      lastRequest._retry
    ) {
      const dataAfterNewCall = callAccessNew()
        .then((response: AxiosResponse<unknown, any>) => {
          const { accessToken } = response.data as { accessToken: string };

          if (!accessToken) {
            throw new Error(error);
          }

          if (lastRequest._retry) {
            lastRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            lastRequest.token = accessToken;
            return lastRequest;
          }
          lastRequest._retry = false;
        })
        .then(async request => {
          const { token, ...rest } = request;
          const res = await axios.request(rest);
          res.headers['token'] = token;
          return res;
        });

      return dataAfterNewCall;
    }
  }
);

interface Props {
  pageProps: Props;
  Component: React.FC<any>;
}

const App: React.FC<Props & AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  const device = useMediaQuery();
  const user = useGetUser();

  useInterval(() => {
    (async () => {
      await accessToken();
    })();
  }, 4.5 * 60 * 1000);

  useEffect(() => {
    (async () => {
      await accessToken();
    })();
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="image"
          content={'/images/site/social_media.png'}
          key="ogtitle"
        />
        <meta
          property="og:image"
          content={`/images/site/social_media.png`}
          key="ogimage"
        />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Header device={device} />
              <Component {...pageProps} />
            </Layout>
            <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </Fragment>
  );
};

export default App;
