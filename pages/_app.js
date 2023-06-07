import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';
import { Loading } from '@/components/loading/loading';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // async function login() {
    //   const isLoggedIn = await magic.user.isLoggedIn();
    //   if (isLoggedIn) {
    //     setIsLoading(false);
    //     router.push('/');
    //   } else {
    //     setIsLoading(false);
    //     router.push('/login');
    //   }
    // }
    // login();

    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // route to /
        router.push("/");
      } else {
        // route to /login
        router.push("/login");
      }
    };
    handleLoggedIn();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }

    router.events.on('routerChangeComplelte', handleComplete);
    router.events.on('routerChangeError', handleComplete);

    return () => {
      router.events.off('routerChangeComplelte', handleComplete);
      router.events.off('routerChangeError', handleComplete);
    }
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
