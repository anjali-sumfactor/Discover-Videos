import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';

import styles from '../../styles/Video.module.css';

export default function Video() {
    const router = useRouter();

    const video = {
        title: 'Hi cute dog',
        publishTime: "1990-01-01",
        description: 'A big red dog that is super cute, can he get any biggerA big red dog that is super cute, can he get any bigger?A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger Paramount Picture? A big red dog that is super cute, can he get any bigger A big red dog that is super cute, can he get any bigger?A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any biggerA big red dog that is super cute, can he get any bigger?A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?that is super cute, can he get any bigger?A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any biggerA big red dog that is super cute, can ',
        channelTitle: 'Paramount Picture',
        viewCount: 10000,
    }

    const { title, publishTime, description, channelTitle, viewCount } = video;

    return <div className={styles.container}>video page {router.query.video
    }
        <Modal isOpen={true} contentLabel="Watch the video" className={styles.modal} onRequestClose={() => { router.back() }}
            overlayClassName={styles.overlay}>

            <iframe
                className={styles.videoPlayer}
                id="ytplayer"
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${router.query.video}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
                frameborder="0"></iframe>

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