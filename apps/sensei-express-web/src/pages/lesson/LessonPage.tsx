import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Question } from './Question';
import { Lesson } from './types';
import styles from './LessonPage.module.css';
import { useMemo, useState } from 'react';
import { Progress } from './Progress';

export const LessonPage = () => {
    const lesson = useLoaderData() as Lesson;
    const navigate = useNavigate();
    const { lessonType } = useParams();
    const [activeQuestion, setActiveQuestion] = useState(1);

    const progress = useMemo(() => {
        return (activeQuestion / lesson.questions.length) * 100;
    }, [activeQuestion, lesson]);

    const finishLesson = () => {
        navigate('/results', { state: lesson });
    };

    const handleAnswer = (userAnswer: string) => {
        const isCorrect = userAnswer.toLowerCase() === lesson.questions[activeQuestion - 1].answer.toLowerCase();
        lesson.questions[activeQuestion - 1] = { ...lesson.questions[activeQuestion - 1], isCorrect, userAnswer };
        window.alert(isCorrect);

        if (activeQuestion < lesson.questions.length) {
            setActiveQuestion(activeQuestion + 1);
        } else {
            finishLesson();
        }
    };

    return (
        <div>
            <Progress
                className={styles.progress}
                segments={lesson.questions.map(question => {
                    return { result: question.isCorrect };
                })}
                currentSegment={activeQuestion}
            />
            <div className={styles.questions}>
                <Question
                    className={styles.question}
                    question={lesson.questions[activeQuestion - 1].question}
                    answer={lesson.questions[activeQuestion - 1].answer}
                    onAnswer={userAnswer => handleAnswer(userAnswer)}
                    choices={lesson.questions[activeQuestion - 1].choices ?? []}
                />
            </div>
        </div>
    );
};
