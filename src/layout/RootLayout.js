import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { Philosopher } from 'next/font/google';

import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const philosopher = Philosopher({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStart = () => setIsLoading(true);
  const handleComplete = () => setIsLoading(false);

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>Mealapar!</title>
      </Head>
      <main className={philosopher.className}>
        <div className="mealapar-container">
          <Header />
          <div className="mealapar-content">{isLoading ? <Loading /> : children}</div>
        </div>
      </main>
    </React.Fragment>
  );
}
