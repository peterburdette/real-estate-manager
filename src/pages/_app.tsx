import React from 'react';
import { NextPage } from 'next';
import HomeLayout from '@/components/Layout/HomeLayout';
import { Provider } from 'react-redux';
import store from '../app/store';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Provider store={store}>
      {currentPath === '/' ? (
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      ) : (
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      )}
    </Provider>
  );
};

export default App;
