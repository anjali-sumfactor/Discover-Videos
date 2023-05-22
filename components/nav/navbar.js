import styles from './navbar.module.css';

export function Navbar(props) {
    const { username } = props;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        Netflix
                    </div>
                </a>
            </div>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>Home</li>
                <li className={styles.navItem2}>My List</li>
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button className={styles.usernameBtn}>
                        <p className={styles.username}>{username}</p>
                        {/**expand more icon */}
                    </button>

                    <div className={styles.navDropdown}>
                        <div>
                        <a>Sign out</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}