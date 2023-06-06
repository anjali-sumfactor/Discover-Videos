import Head from 'next/head';
import { Navbar } from "@/components/nav/navbar";
import { SectionCards } from '@/components/card/section-cards';

const MyList = () => {
    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main>
                <Navbar />
                <div>
                    <SectionCards
                        title="My list"
                        videos={[]}
                        size="small" />
                </div>
            </main>
        </div>
    )
}

export default MyList;