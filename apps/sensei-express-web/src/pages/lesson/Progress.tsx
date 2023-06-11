import { HTMLProps, useEffect } from 'react';
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
                {currentSegment} <span className={styles.fade}>/</span> {segments.length}
            </div>
            <div className={styles.segments}>
                {segments.map((segment, index) => (
                    <div
                        key={index}
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
            <button className={styles.endLesson}>END LESSON</button>
        </div>
    );
};
