import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { Question } from './Question';
import { Lesson, Question as QuestionType } from './types';
import { Suspense, useState } from 'react';
import { Progress } from './Progress';
import styles from './LessonPage.module.css';
import { LessonProvider } from './LessonContext';

export const LessonPage = () => {
    const lesson = useLoaderData() as Lesson;
    const [answers, setAnswers] = useState<QuestionType[]>(Array(lesson.questions.length).fill({}));
    const navigate = useNavigate();
    const [activeQuestion, setActiveQuestion] = useState(1);

    const finishLesson = () => {
        navigate('/results', { state: lesson });
    };

    const handleAnswer = (userAnswer: string) => {
        const isCorrect = userAnswer.toLowerCase() === lesson.questions[activeQuestion - 1].answer.toLowerCase();
        setAnswers(prev =>
            prev.map((answer, i) => {
                if (i === activeQuestion - 1) {
                    return { ...lesson.questions[i], isCorrect, userAnswer };
                }
                return answer;
            })
        );

        if (activeQuestion < lesson.questions.length) {
            setActiveQuestion(activeQuestion + 1);
        } else {
            finishLesson();
        }
    };

    return (
        <LessonProvider>
            <Suspense>
                <Await resolve={lesson} errorElement={<p>Error loading lesson.</p>}>
                    <Progress
                        className={styles.progress}
                        segments={answers.map(answer => {
                            return { result: answer.isCorrect };
                        })}
                        currentSegment={activeQuestion}
                    />
                    <div key={lesson.id + Math.random()} className={styles.questions}>
                        <Question
                            key={lesson.questions[activeQuestion - 1].question}
                            className={styles.question}
                            question={lesson.questions[activeQuestion - 1].question}
                            answer={lesson.questions[activeQuestion - 1].answer}
                            onAnswer={userAnswer => handleAnswer(userAnswer)}
                            choices={lesson.questions[activeQuestion - 1].choices ?? []}
                        />
                    </div>
                </Await>
            </Suspense>
        </LessonProvider>
    );
};
