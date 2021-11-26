import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { settings } from '../config/settings';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Doodle your great masterpiece and share with others!'
        />
        <meta property='og:title' content='Become Bob Ross' />
        <meta property='og:site_name' content='Match Strokes' />
        <meta
          property='og:url'
          content='https://mintbean-hackathon-chi.vercel.app/'
        />
        <meta
          property='og:description'
          content='Doodle your great masterpiece and share with others!'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/db0lf6jpc/image/upload/v1637888184/Screen_Shot_2021-11-25_at_3.23.07_PM_npdbgw.png'
        />

        <title>{settings.siteName}</title>
      </Head>
      <UserProvider>
        <Layout>
          <main className='content'>
            <Component {...pageProps} />
          </main>
        </Layout>
      </UserProvider>
    </>
  );
}

export default MyApp;
