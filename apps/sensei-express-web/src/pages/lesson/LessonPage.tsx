import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Question } from './Question';
import { Lesson, Question as QuestionType } from './types';
import { Suspense, useEffect, useState } from 'react';
import { Progress } from './Progress';
import styles from './LessonPage.module.css';
import { useLessonContext } from '@/providers/LessonContext';

export const LessonPage = () => {
    const { initLesson, currentLesson, answerCurrentQuestion, clearLesson } = useLessonContext();
    const lesson = useLoaderData() as Lesson;
    // const [answers, setAnswers] = useState<QuestionType[]>(Array(lesson.questions.length).fill({}));
    const navigate = useNavigate();
    const [activeQuestion, setActiveQuestion] = useState(1);

    useEffect(() => {
        initLesson(lesson);
    }, []);

    const finishLesson = () => {
        navigate('/results', { state: lesson });
    };

    const handleAnswer = (userAnswer: string) => {
        const isCorrect = userAnswer.toLowerCase() === lesson.questions[activeQuestion - 1].answer.toLowerCase();
        answerCurrentQuestion(userAnswer);
        // setAnswers(prev =>
        //     prev.map((answer, i) => {
        //         if (i === activeQuestion - 1) {
        //             return { ...lesson.questions[i], isCorrect, userAnswer };
        //         }
        //         return answer;
        //     })
        // );

        if (activeQuestion < lesson.questions.length) {
            setActiveQuestion(activeQuestion + 1);
        } else {
            finishLesson();
        }
    };

    return (
        <Suspense>
            <Await resolve={lesson} errorElement={<p>Error loading lesson.</p>}>
                {currentLesson ? (
                    <>
                        <Progress
                            className={styles.progress}
                            segments={currentLesson.questions.map(question => {
                                return { result: question.isCorrect };
                            })}
                            currentSegment={activeQuestion}
                            endLesson={finishLesson}
                        />
                        <div key={currentLesson.id + Math.random()} className={styles.questions}>
                            <Question
                                key={currentLesson.questions[activeQuestion - 1].question}
                                className={styles.question}
                                question={currentLesson.questions[activeQuestion - 1].question}
                                answer={currentLesson.questions[activeQuestion - 1].answer}
                                onAnswer={userAnswer => handleAnswer(userAnswer)}
                                choices={currentLesson.questions[activeQuestion - 1].choices ?? []}
                            />
                        </div>
                    </>
                ) : null}
            </Await>
        </Suspense>
    );
};
