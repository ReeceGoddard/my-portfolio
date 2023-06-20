import { useQuery } from '@tanstack/react-query';
import { getAuthorsQuery } from '../../api/getAuthors';
import styles from './Authors.module.css';
import { Link } from 'react-router-dom';

const Authors = () => {
    const { data } = useQuery(getAuthorsQuery);

    return (
        <div className={styles.authors}>
            <h1>Authors</h1>
            <div className={styles.authorsGrid}>
                {data?.map(author => (
                    <Link className={styles.author} key={author} to={`/author/${author}`}>
                        {author}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Authors;
