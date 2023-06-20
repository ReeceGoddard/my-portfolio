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
    }, [poems]);

    return (
        <div className={styles.authorProfile}>
            <button className={styles.back} onClick={() => navigate('/')}>
                <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.87891 12L13.9389 19.061L16.0609 16.939L11.1209 12L16.0609 7.06104L13.9389 4.93903L6.87891 12Z" />
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
                                        <p className={styles.line} key={line}>
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
