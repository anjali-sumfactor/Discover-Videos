import Link from 'next/link';
import clsx from "classnames";

import { Card } from "./card";

import styles from "./section-cards.module.css";

export function SectionCards(props) {
    const { title, videos = [], size, shouldWrap = false, shouldScale } = props;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
                {videos.map((video, idx) => {
                    return (
                        <Link key={idx} href={`/video/${video.id}`}>
                            <Card id={idx} imgUrl={video.imgUrl} size={size} shouldScale=
                                {shouldScale} />
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}