import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import {settings} from '../config/settings';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Doodle your great masterpiece and share with others!"
        />
        <title>{settings.siteName}</title>
      </Head>
      <Layout>
        <main className="content">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default MyApp;
