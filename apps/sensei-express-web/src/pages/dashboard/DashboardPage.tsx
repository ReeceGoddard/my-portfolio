import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { MenuSVG } from '@/components/MenuSVG';
import { PencilSVG } from '@/components/PencilSVG';
import { MultipleChoiceSVG } from '@/components/MultipleChoiceSVG';
import { LogoSVG } from '@/components/LogoSVG';
import { useEffect, useRef } from 'react';
import hoverSound from '@assets/sounds/hover.wav';

export const DashboardPage = (): JSX.Element => {
    const audioElement = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioElement.current) return;

        audioElement.current.muted = false;
    }, []);

    const playHoverSound = async () => {
        if (audioElement.current) {
            audioElement.current.currentTime = 0;
            audioElement.current.play();
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <header className={styles.card}>
                    <h1 className={styles.mainHeading}>
                        <LogoSVG width={80} height={80} />
                        Sensei Express
                    </h1>
                    <button className={styles.actions}>
                        <MenuSVG />
                    </button>
                </header>
                <section>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <Link className={styles.option} to={'/lesson/multi'} onMouseEnter={playHoverSound}>
                            <MultipleChoiceSVG />
                            <div className={styles.label}>Vowels</div>
                        </Link>
                        <Link className={styles.option} to={'/lesson/writing'} onMouseEnter={playHoverSound}>
                            <PencilSVG />
                            <div className={styles.label}>Vowels</div>
                        </Link>
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionHeading}>Boards</h2>
                    <div className={styles.options}>
                        <Link className={styles.option} to={'/board/hiragana'} onMouseEnter={playHoverSound}>
                            Hiragana board
                        </Link>
                        <Link className={styles.option} to={'/board/katakana'} onMouseEnter={playHoverSound}>
                            Katakana board
                        </Link>
                    </div>
                </section>
            </div>
            <audio ref={audioElement} src={hoverSound} />
        </div>
    );
};
