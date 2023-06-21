import { HTMLProps } from 'react';
import styles from './Progress.module.css';

type Segment = {
    result: boolean | null;
};

export interface ProgressProps extends HTMLProps<HTMLDivElement> {
    segments: Segment[];
    currentSegment: number;
    endLesson: () => void;
}

export const Progress = ({ segments, currentSegment, endLesson, className, ...rest }: ProgressProps) => {
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
                            segment.result !== null ? (segment.result === true ? styles.correct : styles.incorrect) : ''
                        }`}
                    ></div>
                ))}
            </div>
            <button className={styles.endLesson} onClick={endLesson}>
                END LESSON
            </button>
        </div>
    );
};
