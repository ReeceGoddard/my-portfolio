import { useMemo } from 'react';
import { Lesson, Question } from '../lesson/types';
import { Link, useLocation } from 'react-router-dom';

type QuestionWithAnswer = {
    userAnswer: string;
    isCorrect: boolean;
} & Question;

interface ResultsPageProps {
    questionsWithAnswers: QuestionWithAnswer[];
}

export const ResultsPage = () => {
    const lesson = useLocation().state as Lesson;

    const numOfCorrectAnswers = useMemo(() => {
        return lesson.questions.reduce((prev, curr) => prev + (curr.isCorrect ? 1 : 0), 0);
    }, [lesson]);

    const quantityMessage =
        numOfCorrectAnswers > 0
            ? `Well done! You got ${numOfCorrectAnswers} correct.`
            : `Looks like you had trouble with that one. Try again!`;

    return (
        <div>
            <pre>{JSON.stringify(lesson, null, 3)}</pre>
            <div>{quantityMessage}</div>
            <Link to={'/dashboard'}>Back to dashboard</Link>
        </div>
    );
};
