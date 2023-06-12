import styles from './DashboardPage.module.css';
import { MenuSVG } from '@/components/MenuSVG';
import { LogoSVG } from '@/components/LogoSVG';
import { useEffect, useRef } from 'react';
import hoverSound from '@assets/sounds/hover.wav';
import startSound from '@assets/sounds/start.wav';
import { DashboardItem } from './DashboardItem';

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
                    <h2 className={styles.sectionHeading}>Boards</h2>
                    <div className={styles.options}>
                        <div>Hiragana</div>
                        <div>Katakana</div>
                    </div>
                </section>
                <section>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <DashboardItem
                            label="Intro to Hiragana"
                            options={[
                                { type: 'multipleChoice', to: '/lesson/multi' },
                                { type: 'writing', to: '/lesson/writing' },
                            ]}
                        />
                        <DashboardItem
                            label="Basic Hiragana"
                            options={[
                                { type: 'multipleChoice', to: '/lesson/multi' },
                                { type: 'writing', to: '/lesson/writing' },
                            ]}
                        />
                        <DashboardItem
                            label="Intermediate Hiragana"
                            options={[
                                { type: 'multipleChoice', to: '/lesson/multi' },
                                { type: 'writing', to: '/lesson/writing' },
                            ]}
                        />
                        <DashboardItem
                            label="Advanced Hiragana"
                            options={[
                                { type: 'multipleChoice', to: '/lesson/multi' },
                                { type: 'writing', to: '/lesson/writing' },
                            ]}
                        />
                    </div>
                </section>
            </div>
            <audio ref={hoverAudioElementRef} src={hoverSound} />
            <audio ref={startAudioElementRef} src={startSound} />
        </div>
    );
};
