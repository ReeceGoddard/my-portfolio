import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import { MenuSVG } from '@/components/MenuSVG';
import { PencilSVG } from '@/components/PencilSVG';
import { MultipleChoiceSVG } from '@/components/MultipleChoiceSVG';

export const DashboardPage = (): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <header className={styles.card}>
                    <h1 className={styles.mainHeading}>
                        Sensei <span>EXPRESS</span>
                    </h1>
                    <button className={styles.actions}>
                        <MenuSVG />
                    </button>
                </header>
                <section>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <Link className={styles.option} to={'/lesson/multi'}>
                            <MultipleChoiceSVG />
                            <div className={styles.label}>Vowels</div>
                        </Link>
                        <Link className={styles.option} to={'/lesson/writing'}>
                            <PencilSVG />
                            <div className={styles.label}>Vowels</div>
                        </Link>
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionHeading}>Boards</h2>
                    <div className={styles.options}>
                        <Link className={styles.option} to={'/board/hiragana'}>
                            Hiragana board
                        </Link>
                        <Link className={styles.option} to={'/board/katakana'}>
                            Katakana board
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};
