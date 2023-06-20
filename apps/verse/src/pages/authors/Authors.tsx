import { useQuery } from '@tanstack/react-query';
import { authorsQuery } from '../../api/getAuthors';
import styles from './Authors.module.css';
import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

const Authors = () => {
    const { data } = useQuery(authorsQuery);
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className={styles.authors}>
            <h1 className={styles.heading}>Poets</h1>
            <input
                className={styles.search}
                type="text"
                onChange={handleSearchChange}
                value={searchText}
                placeholder="Search..."
            />
            <div className={styles.authorsGrid}>
                {data
                    ?.filter(author => author.toLowerCase().includes(searchText.toLowerCase()))
                    .map(author => (
                        <Link className={styles.author} key={author} to={`/author/${author}`}>
                            {author}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Authors;
