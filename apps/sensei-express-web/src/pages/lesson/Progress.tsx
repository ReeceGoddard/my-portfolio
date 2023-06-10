import { HTMLProps } from 'react';
import styles from './Progress.module.css';

type Segment = {
    result?: boolean;
};

export interface ProgressProps extends HTMLProps<HTMLDivElement> {
    segments: Segment[];
    currentSegment: number;
}

export const Progress = ({ segments, currentSegment, className, ...rest }: ProgressProps) => {
    return (
        <div className={`${styles.progress} ${className}`} {...rest}>
            <div className={styles.completionLabel}>
                Q{currentSegment} <span className={styles.fade}>of</span> {segments.length}
            </div>
            <div className={styles.segments}>
                {segments.map(segment => (
                    <div
                        key={Math.random()}
                        className={`${styles.segment} ${
                            segment.result !== undefined
                                ? segment.result === true
                                    ? styles.correct
                                    : styles.incorrect
                                : ''
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};
