import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { magic } from '../../lib/magic-client';

import styles from './navbar.module.css';

export function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function logout() {
            try {
                const { email } = await magic.user.getMetadata();
                if (email) {
                    setUsername(email);
                }
            } catch (error) {
                console.log("Error retrieving email", error);
            }
        }
        logout();
    }, []);

    const router = useRouter();

    const handleOnclickHome = (e) => {
        e.preventDefault();
        router.push('/');
    };

    const handleOnclickMyList = (e) => {
        e.preventDefault();
        router.push('/browse/my-list');
    };

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn());
            router.push('/login');
        } catch (error) {
            console.log("Error logging out", error);
            router.push('/login');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
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

                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnclickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnclickMyList}>My List</li>
                </ul>

                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image
                                src={'/static/expand_more.svg'}
                                width={24}
                                height={24}
                                alt="Expand dropdown"
                            />
                        </button>

                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <a className={styles.linkName} onClick={handleSignOut}>
                                        Sign out
                                    </a>
                                    <div className={styles.lineWrapper}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}