import { Suspense, useEffect, useState } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useLessonContext } from '@providers/LessonContext';
import { Question } from './Question';
import { Progress } from './Progress';
import { Lesson } from './types';
import { API_URL } from '@lib/axios';
import styles from './LessonPage.module.css';

export const LessonPage = () => {
    const { initLesson, currentLesson, currentQuestion, currentQuestionIndex, answerCurrentQuestion } =
        useLessonContext();
    const lesson = useLoaderData() as Lesson;
    const navigate = useNavigate();
    const [activeQuestion, setActiveQuestion] = useState(1);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        initLesson(lesson.questions);
    }, []);

    const finishLesson = () => {
        animate(
            scope.current,
            {
                blur: ['0px', '20px'],
                opacity: [1, 0],
            },
            { duration: 0.3 }
        ).then(() => {
            navigate('/results', { state: lesson });
        });
    };

    const handleAnswer = (userAnswer: string) => {
        answerCurrentQuestion(userAnswer);

        if (activeQuestion < lesson.questions.length) {
            setActiveQuestion(activeQuestion + 1);
        } else {
            finishLesson();
        }
    };

    return (
        <Suspense>
            <Await resolve={lesson} errorElement={<p>Error loading lesson.</p>}>
                <AnimatePresence>
                    {currentLesson ? (
                        <motion.div
                            ref={scope}
                            initial={{
                                filter: 'blur(20px)',
                                opacity: 0,
                                rotate: '2deg',
                                scale: 1.1,
                            }}
                            animate={{
                                filter: 'blur(0px)',
                                opacity: 1,
                                rotate: '0deg',
                                scale: 1,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <Progress
                                className={styles.progress}
                                segments={currentLesson.map(question => {
                                    return { result: question.isCorrect };
                                })}
                                currentSegment={activeQuestion}
                                endLesson={finishLesson}
                            />
                            <div className={styles.questions}>
                                {currentQuestion ? (
                                    <Question
                                        key={currentQuestionIndex}
                                        className={styles.question}
                                        question={currentQuestion.question.question}
                                        answer={currentQuestion.question.answer}
                                        onAnswer={userAnswer => handleAnswer(userAnswer)}
                                        choices={currentQuestion.question.choices ?? []}
                                        soundUrl={`${API_URL}${currentQuestion.question.soundUrl}`}
                                    />
                                ) : null}
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </Await>
        </Suspense>
    );
};
