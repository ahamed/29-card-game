import { css, Global } from '@emotion/react';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

import Layout from '@Components/Layout/Layout';
import { baseFontSize } from '@Config/constants';
import { GameProvider } from '@Context/GameContext';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Radio+Canada:wght@300&display=swap');
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    font-size: ${baseFontSize};
    margin: 0;
    font-family: 'Radio Canada', sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    margin: 0;
  }
  body {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgb(230, 22, 230), rgb(0, 0, 0));
      clip-path: circle(15% at 30% 80%);
    }
  }
`;

const Head = () => {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      <style>
        {`
            #__next {
              height: 100%;
              background: rgba(93, 101, 231, 0.2); 
              backdrop-filter: blur(70px);
            }
          `}
      </style>
    </NextHead>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Head />
      <Global styles={globalStyles} />
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </GameProvider>
  );
}

export default MyApp;
