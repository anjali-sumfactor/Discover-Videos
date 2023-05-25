import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Login.module.css';

export default function Login() {
    const handleLoginWithEmail = (e) => {
        e.preventDefault();
        console.log("hi button");
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

                    <input type='text' placeholder='Email address'></input>

                    <p className={styles.userMsg}></p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign In</button>
                </div>
            </main>
        </div>
    )
};