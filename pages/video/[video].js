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
            <div>Modal body</div>
        </Modal>
    </div>
}