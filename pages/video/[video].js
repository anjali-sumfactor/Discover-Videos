import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';
import { useState, useEffect } from 'react';

import { getYoutubeVideoById } from '@/lib/videos';
import { Navbar } from '@/components/nav/navbar';
import Like from '@/components/icons/like-icon';
import DisLike from '@/components/icons/dislike-icon';

import styles from '../../styles/Video.module.css';

export async function getStaticProps(context) {
    // console.log({ context });

    const videoId = context.params.video;
    const videoArray = await getYoutubeVideoById(videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

    const paths = listOfVideos.map((video) => ({
        params: { video },
    }));
    return { paths, fallback: 'blocking' };
}

export default function Video({ video }) {
    const router = useRouter();
    const videoId = router.query.video;

    const [toggleLike, setToggleLike] = useState();
    const [toggleDislike, setToggleDisLike] = useState();

    const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 } } = video;

    //likeDiskeUpdate:-
    useEffect(() => {
        const statsLikeDislikeUpdate = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log({ data });
            if (data.length > 0) {
                const favourited = data[0].favourited;
                if (favourited === 1) {
                    setToggleLike(true);
                } else if (favourited === 0) {
                    setToggleDisLike(true);
                }
            }
        }
        statsLikeDislikeUpdate();
    }, []);


    const runRatingService = async (favourited) => {
        return await fetch('/api/stats', {
            method: 'POST',
            body: JSON.stringify({
                videoId,
                favourited,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    const handleToggleDislike = async () => {
        console.log("handleToggleDislike");
        const val = !toggleDislike
        setToggleDisLike(val);
        setToggleLike(toggleDislike);

        const favourited = val ? 0 : 1;
        const response = await runRatingService(favourited)
        console.log('data', await response.json());
    }

    const handleToggleLike = async () => {
        console.log("handleToggleLike");
        const val = !toggleLike;
        setToggleLike(val);
        setToggleDisLike(toggleLike);

        const favourited = val ? 1 : 0;
        const response = await runRatingService(favourited)
        console.log('data', await response.json());
    }

    return <div className={styles.container}>
        <Navbar />
        <Modal isOpen={true} contentLabel="Watch the video" className={styles.modal} onRequestClose={() => { router.back() }}
            overlayClassName={styles.overlay}>

            <iframe
                className={styles.videoPlayer}
                id="ytplayer"
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
                frameborder="0">
            </iframe>

            <div className={styles.likeDislikeBtnWrapper}>
                <div className={styles.likeBtnWrapper}>
                    <button onClick={handleToggleLike}>
                        <div className={styles.btnWrapper}>
                            <Like selected={toggleLike} />
                        </div>
                    </button>
                </div>
                <button onClick={handleToggleDislike}>
                    <div className={styles.btnWrapper}>
                        <DisLike selected={toggleDislike} />
                    </div>
                </button>
            </div>

            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>

                    <div className={styles.col1}>
                        <p className={styles.publishTime}>{publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                    </div>

                    <div className={styles.col2}>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>
                    </div>
                </div>

            </div>
        </Modal>
    </div>
}