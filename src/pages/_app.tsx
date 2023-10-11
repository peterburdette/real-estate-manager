import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import store from '../app/store';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
