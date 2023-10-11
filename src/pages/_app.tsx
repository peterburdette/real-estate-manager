import React from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout/Layout';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
