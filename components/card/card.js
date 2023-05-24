import Image from 'next/image';
import { useState } from 'react';
import { motion } from "framer-motion";
import cls from "classnames";

import styles from './card.module.css';

export function Card(props) {
    const { imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80", size = "medium", id } = props;

    const [imgSrc, setImgSrc] = useState(imgUrl);
    const classMap = {
        "large": styles.lgItem,
        "medium": styles.mdItem,
        "small": styles.smItem,
    }

    const handleOnError = () => {
        console.log("hii error");
        setImgSrc("https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80");
    }

    const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

    return (
        <div className={styles.container} >
            <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{ ...scale }}>
                <Image
                    src={imgSrc}
                    className={styles.cardImg}
                    alt="img"
                    layout="fill"
                    onError={handleOnError}
                />
            </motion.div>
        </div>
    )
}