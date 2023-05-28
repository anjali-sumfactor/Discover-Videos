import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import styles from '../../styles/Video.module.css';

export default function Video() {
    const router = useRouter();

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
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com&controls=0&rel=1"
                frameborder="0"></iframe>
        </Modal>
    </div>
}