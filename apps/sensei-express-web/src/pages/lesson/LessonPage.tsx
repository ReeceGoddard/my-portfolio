import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Question } from './Question';
import { Lesson } from './types';
import styles from './LessonPage.module.css';
import { useMemo, useState } from 'react';

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
            <div className={styles.progress}>
                {lesson.questions.map(question => (
                    <div
                        key={question.id}
                        className={`${styles.progressSegment} ${
                            question.isCorrect != null ? (question.isCorrect ? styles.correct : styles.incorrect) : ''
                        }`}
                    ></div>
                ))}
                <div className={styles.completionLabel}>
                    {activeQuestion}/{lesson.questions.length}
                </div>
            </div>
            <div className={styles.questions}>
                <Question
                    className={styles.question}
                    question={lesson.questions[activeQuestion - 1].question}
                    onAnswer={userAnswer => handleAnswer(userAnswer)}
                    choices={lesson.questions[activeQuestion - 1].choices ?? []}
                />
            </div>
        </div>
    );
};
