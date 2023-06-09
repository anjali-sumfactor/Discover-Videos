import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { magic } from '../lib/magic-client';

import styles from '../styles/Login.module.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [userMsg, setUserMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

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

    const handleOnChangeEmail = (e) => {
        setUserMsg("");
        e.preventDefault();
        const email = e.target.value;
        setEmail(email);
    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();

        if (email) {
            try {
                setIsLoading(true);

                const didToken = await magic.auth.loginWithMagicLink({
                    email,
                });
                if (didToken) {

                    const response = await fetch('./api/login', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${didToken}`,
                            'Content-Type': "application/json",
                        },
                    });

                    const loggedInResponse = await response.json();
                    if (loggedInResponse.done) {
                        router.push('/');
                    } else {
                        setIsLoading(false);
                        setUserMsg("Enter a valid email address");
                    }

                }
            } catch (error) {
                console.error('Something went wrong logging in', error);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            setUserMsg("Enter a valid email address");
        }
    }

    return (
        <div className={styles.container}>

            <Head>
                <title>Netflix SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a className={styles.logoLink} href="/">
                        <div className={styles.logoWrapper}>
                            <Image
                                src={'/static/netflix.svg'}
                                width={128}
                                height={34}
                                alt="Netflix logo"
                            />
                        </div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign In</h1>

                    <input type='text' placeholder='Email address' onChange={handleOnChangeEmail} className={styles.emailInput}></input>

                    <p className={styles.userMsg}>{userMsg}</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                        {isLoading ? "Loading..." : "Sign In"}</button>
                </div>
            </main>
        </div>
    )
};