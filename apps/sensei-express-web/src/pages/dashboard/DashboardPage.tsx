import styles from './DashboardPage.module.css';
import { MenuSVG } from '@/components/MenuSVG';
import { LogoSVG } from '@/components/LogoSVG';
import { useEffect, useRef } from 'react';
import hoverSound from '@assets/sounds/hover.wav';
import startSound from '@assets/sounds/start.wav';
import { DashboardItem } from './DashboardItem';
import { LessonItem } from './LessonItem';
import { useAudioContext } from '@/providers/AudioProvider';
import { useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion';

export const DashboardPage = (): JSX.Element => {
    const hoverAudioElementRef = useRef<HTMLAudioElement | null>(null);
    const startAudioElementRef = useRef<HTMLAudioElement | null>(null);
    const { playStartLessonSound } = useAudioContext();
    const navigate = useNavigate();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (hoverAudioElementRef.current) hoverAudioElementRef.current.muted = false;
    }, []);

    const handleItemSelected = (url: string) => {
        playStartLessonSound();
        animate(
            scope.current,
            {
                filter: ['blur(0px)', 'blur(20px)'],
                opacity: [1, 0],
                rotate: ['0deg', '-2deg'],
                scale: [1, 1.1],
            },
            { duration: 0.8 }
        ).then(() => navigate(url));
    };

    return (
        <div ref={scope} className={styles.pageContainer}>
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

                <section className={styles.boards}>
                    <h2 className={styles.sectionHeading}>Boards</h2>
                    <div className={styles.options}>
                        <DashboardItem
                            label="Hiragana"
                            option={{ type: 'board', url: '/board/hiragana', onItemSelected: handleItemSelected }}
                        />
                        <DashboardItem
                            label="Katakana"
                            option={{ type: 'board', url: '/board/katakana', onItemSelected: handleItemSelected }}
                        />
                    </div>
                </section>
                <section className={styles.lessons}>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <LessonItem
                            label="Intro to Hiragana"
                            options={[
                                {
                                    type: 'multipleChoice',
                                    url: `/lesson/hiragana/vowels/multi`,
                                    onItemSelected: handleItemSelected,
                                },
                                {
                                    type: 'writing',
                                    url: '/lesson/hiragana/vowels/writing',
                                    onItemSelected: handleItemSelected,
                                },
                            ]}
                        />
                        <LessonItem
                            label="Basic Hiragana"
                            options={[
                                { type: 'multipleChoice', url: '/lesson/multi', onItemSelected: handleItemSelected },
                                { type: 'writing', url: '/lesson/writing', onItemSelected: handleItemSelected },
                            ]}
                        />
                        <LessonItem
                            label="Intermediate Hiragana"
                            options={[
                                { type: 'multipleChoice', url: '/lesson/multi', onItemSelected: handleItemSelected },
                                { type: 'writing', url: '/lesson/writing', onItemSelected: handleItemSelected },
                            ]}
                        />
                        <LessonItem
                            label="Advanced Hiragana"
                            options={[
                                { type: 'multipleChoice', url: '/lesson/multi', onItemSelected: handleItemSelected },
                                { type: 'writing', url: '/lesson/writing', onItemSelected: handleItemSelected },
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
