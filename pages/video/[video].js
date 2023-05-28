import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import styles from '../../styles/Video.module.css';

export default function Video() {
    const router = useRouter();
    console.log(router);

    return <div>video page {router.query.video
    }
        <Modal isOpen={true} contentLabel="Watch the video" onRequestClose={() => { router.back() }}
            overlayClassName={styles.overlay}>
            <div>Modal body</div>
        </Modal>
    </div>
}