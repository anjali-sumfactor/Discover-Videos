import Head from 'next/head';
import { Navbar } from "@/components/nav/navbar";
import { SectionCards } from '@/components/card/section-cards';

import styles from '../../styles/MyList.module.css';
import { getMyList } from '@/lib/videos';
import useRedirectUser from '@/utils/redirectUser';

export async function getServerSideProps(context) {
    const { userId, token } = await useRedirectUser(context);
    const videos = await getMyList(userId, token);
    console.log({ videos });

    return {
        props: {
            myListVideos: videos,
        }
    }
}

const MyList = ({ myListVideos }) => {
    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.sectionWrapper}>
                    <SectionCards
                        title="My list"
                        videos={myListVideos}
                        size="small"
                        shouldWrap
                        shouldScale={false}
                    />
                </div>
            </main>
        </div>
    )
}

export default MyList;