import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './../createEmotionCache';
import theme from './../theme';
import Header from '../components/Header/Header';
import axios from 'axios';
import { SWRConfig } from 'swr';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
axios.defaults.baseURL = 'https://swr-practice-user-data.herokuapp.com';

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios(url).then((res) => res.data),
        dedupingInterval: 10000,
      }}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Healthcare Tech</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
