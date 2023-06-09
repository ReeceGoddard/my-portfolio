import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';

export const DashboardPage = (): JSX.Element => {
    return (
        <div>
            <h1 className={styles.mainHeading}>Dashboard</h1>
            <div className={styles.sectionsWrapper}>
                <section>
                    <h2 className={styles.sectionHeading}>Lessons</h2>
                    <div className={styles.options}>
                        <Link className={styles.option} to={'/lesson/multi'}>
                            Start a new multiple choice Lesson
                        </Link>
                        <Link className={styles.option} to={'/lesson/writing'}>
                            Start a new writing Lesson
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
