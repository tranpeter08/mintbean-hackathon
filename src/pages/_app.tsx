import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>MintBeam Hackathon</title>
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
