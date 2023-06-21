import { useQuery } from '@tanstack/react-query';
import styles from './AuthorProfile.module.css';
import { getAuthorProfileQuery } from '../../api/getAuthorProfile';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AuthorProfile: React.FC = (): JSX.Element => {
    const { authorName } = useParams<keyof { authorName: string }>() as { authorName: string };
    const { data: poems } = useQuery(getAuthorProfileQuery(authorName as string));
    const [poemsToggleStatus, setPoemsToggleStatus] = useState<Map<number, boolean>>(new Map<number, boolean>());
    const navigate = useNavigate();

    useEffect(() => {
        const titles: [[number, boolean]] = poems?.map((_, index) => [index, false]) ?? [];
        const map: Map<number, boolean> = new Map(titles);
        setPoemsToggleStatus(map);
        document.documentElement.scrollTo({
            top: 0,
        });
    }, [poems]);

    return (
        <div className={styles.authorProfile}>
            <button className={styles.back} onClick={() => navigate('/')}>
                <svg width="11" height="16" viewBox="0 0 11 16" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.878906 8.00004L7.93891 15.061L10.0609 12.939L5.12091 8.00004L10.0609 3.06104L7.93891 0.939034L0.878906 8.00004Z" />
                </svg>
                Back
            </button>
            <h1>Poems by {poems !== undefined && poems[0].author}</h1>
            <div className={styles.poemsGrid}>
                {poems
                    ?.sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? 0 : 0))
                    .map((poem, index) => (
                        <div
                            className={`${styles.poem} ${
                                poemsToggleStatus.get(index) ? styles.poemVisible : styles.poemHidden
                            }`}
                            key={poem.title}
                        >
                            <button
                                className={styles.togglePoem}
                                onClick={() =>
                                    setPoemsToggleStatus(
                                        new Map(poemsToggleStatus.set(index, !poemsToggleStatus.get(index) || false))
                                    )
                                }
                            >
                                {poem.title}
                                <svg
                                    className={styles.chevronIcon}
                                    viewBox="0 0 24 24"
                                    fill="black"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 17.121L19.061 10.061L16.939 7.93897L12 12.879L7.06104 7.93897L4.93904 10.061L12 17.121Z" />
                                </svg>
                            </button>
                            <div className={styles.poemLinesWrapper}>
                                <div className={styles.poemLines}>
                                    {poem.lines.map(line => (
                                        <p className={styles.line} key={line + Math.random()}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AuthorProfile;
