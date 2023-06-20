import { useQuery } from '@tanstack/react-query';
import styles from './AuthorProfile.module.css';
import { getAuthorProfileQuery } from '../../api/getAuthorProfile';
import { useParams } from 'react-router-dom';

const AuthorProfile = () => {
    const { authorName } = useParams<keyof { authorName: string }>() as { authorName: string };
    const { data: poems } = useQuery(getAuthorProfileQuery(authorName as string));

    return (
        <div className={styles.authors}>
            <h1>{poems !== undefined && poems[0].author}</h1>
            <div className={styles.authorsGrid}>
                {poems?.map(poem => (
                    <div className={styles.poem} key={poem.title}>
                        {poem.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorProfile;
