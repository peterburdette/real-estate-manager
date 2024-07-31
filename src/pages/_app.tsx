import React from 'react';
import { NextPage } from 'next';
import HomeLayout from '@/components/Layout/HomeLayout';
import { Provider } from 'react-redux';
import store from '../app/store';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { SnackbarProvider } from 'notistack';
import Notification from '@/components/Notification/Notification';
import LoginLayout from '@/components/Layout/LoginLayout';

declare module 'notistack' {
  interface VariantOverrides {
    notification: true;
  }
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Provider store={store}>
      <SnackbarProvider
        Components={{
          notification: Notification,
        }}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {currentPath === '/' ? (
          <HomeLayout>
            <Component {...pageProps} />
          </HomeLayout>
        ) : currentPath === '/login' ? (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        ) : (
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        )}
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
