import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/Login.module.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [userMsg, setUserMsg] = useState("");

    const router = useRouter();

    const handleOnChangeEmail = (e) => {
        setUserMsg("");
        e.preventDefault();
        console.log("event", e);
        const email = e.target.value;
        setEmail(email);
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        console.log("hi button");
        if (email) {
            if (email === "anjali@gmail.com") {
                router.push('/');
            } else {
                console.log("Something went wrong logging in");
            }

        } else {
            //show user msg
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
                    <h1 className={styles.signinHaeder}>Sign In</h1>

                    <input type='text' placeholder='Email address' onChange={handleOnChangeEmail}></input>

                    <p className={styles.userMsg}>{userMsg}</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign In</button>
                </div>
            </main>
        </div>
    )
};