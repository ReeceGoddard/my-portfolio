import styles from './DashboardPage.module.css';
import { MenuSVG } from '@/components/MenuSVG';
import { LogoSVG } from '@/components/LogoSVG';
import { useEffect, useRef } from 'react';
import hoverSound from '@assets/sounds/hover.wav';
import startSound from '@assets/sounds/start.wav';
import { Option } from './Option';

export const DashboardPage = (): JSX.Element => {
    const hoverAudioElementRef = useRef<HTMLAudioElement | null>(null);
    const startAudioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (hoverAudioElementRef.current) hoverAudioElementRef.current.muted = false;
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <header className={styles.card}>
                    <h1 className={styles.mainHeading}>
                        <LogoSVG width={80} height={80} />
                        Sensei Academy
                    </h1>
                    <button className={styles.actions}>
                        <MenuSVG />
                    </button>
                </header>
                <section>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <div>
                            <span>Vowels Only —</span> <span>Multi</span> | <span>Writing</span> | <span>Mixed</span>
                        </div>
                        <Option label="Vowels Only" icon="multipleChoice" to={'/lesson/multi'} />
                        <Option label="Vowels Only" icon="writing" to={'/lesson/writing'} />
                        <Option label="Basic Hiragana" icon="multipleChoice" to={'/lesson/multi'} />
                        <Option label="Basic Hiragana" icon="writing" to={'/lesson/writing'} />
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionHeading}>Boards</h2>
                    <div className={styles.options}>
                        <Option label="Hiragana Board" icon="board" to={'/board/hiragana'} />
                        <Option label="Katakana Board" icon="board" to={'/board/katakana'} />
                    </div>
                </section>
            </div>
            <audio ref={hoverAudioElementRef} src={hoverSound} />
            <audio ref={startAudioElementRef} src={startSound} />
        </div>
    );
};
