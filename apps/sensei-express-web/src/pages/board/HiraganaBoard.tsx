import { useKanaChars } from './api/getKanaChars';
import styles from './HiraganaBoard.module.css';
import { nanoid } from 'nanoid';

export const HiraganaBoard = () => {
    const { data } = useKanaChars({ boardType: 'hiragana' });

    return (
        <div>
            {Array.from({ length: Math.max(...Object.values(data ? data : []).map(char => char.row)) }, (_, index) => (
                <div className={styles.row} key={nanoid()}>
                    {data
                        ? data
                              .filter(char => char.row === index + 1)
                              .map(char => <div key={char.id}>{char.character}</div>)
                        : null}
                </div>
            ))}
        </div>
    );
};
