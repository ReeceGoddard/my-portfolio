import { CheckSVG } from '@/components/CheckSVG';
import { CrossSVG } from '@/components/CrossSVG';
import styles from './QuestionResult.module.css';
import { QuestionWithAnswer } from '../lesson/types';

interface QuestionResultProps {
    questionWithAnswer: QuestionWithAnswer;
    questionNumber: number;
}

export const QuestionResult = ({ questionWithAnswer, questionNumber }: QuestionResultProps) => {
    return (
        <div
            className={`${styles.questionResult} ${questionWithAnswer.isCorrect ? styles.correct : styles.incorrect}`}
            key={questionWithAnswer.question.charID}
        >
            <div className={styles.leftWrapper}>
                <div className={styles.questionNumber}>{questionNumber}</div>
                <div className={styles.answer}>
                    {questionWithAnswer.question.question}{' '}
                    <span className={styles.equalsSign}>{questionWithAnswer.isCorrect === true ? '=' : '≠'}</span>{' '}
                    {questionWithAnswer.userAnswer}
                </div>
            </div>
            <div className={styles.rightWrapper}>
                {questionWithAnswer.isCorrect === false ? (
                    <div className={styles.correctAnswer}>{questionWithAnswer.question.answer}</div>
                ) : null}
                {questionWithAnswer.isCorrect === true ? <CheckSVG /> : <CrossSVG />}
            </div>
        </div>
    );
};
