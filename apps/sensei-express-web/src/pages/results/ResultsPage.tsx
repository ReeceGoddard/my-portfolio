import { Link } from 'react-router-dom';
import { useLessonContext } from '@/providers/LessonContext';
import { QuestionResult } from './QuestionResult';
import styles from './ResultsPage.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { postResults } from './api/postResults';

const calculateScoreMessage = (percentCorrect: number) => {
    if (percentCorrect === 100) {
        return "Perfect! Maybe it's time to try a harder lesson?";
    } else if (percentCorrect >= 90) {
        return 'Great job!';
    } else if (percentCorrect >= 70) {
        return "Not bad! You're getting there.";
    } else {
        return 'Try again and see if you can do better!';
    }
};

export const ResultsPage = () => {
    const { currentLesson, clearLesson } = useLessonContext();

    const questionsWithAnswers = currentLesson?.filter(question => question.userAnswer) || [];
    const numOfCorrectAnswers = currentLesson?.reduce((prev, curr) => prev + (curr.isCorrect ? 1 : 0), 0) || 0;
    const percentCorrect = (questionsWithAnswers.length / numOfCorrectAnswers) * 100;

    const scoreMessage = calculateScoreMessage(percentCorrect);

    useEffect(() => {
        const abortController = new AbortController();

        const postResultsOnLoad = async () => {
            await postResults(
                {
                    results: questionsWithAnswers.map(questionResult => {
                        return {
                            userID: questionResult.userID,
                            characterID: questionResult.question.id,
                            isCorrect: questionResult.isCorrect || false,
                            userAnswer: questionResult.userAnswer || '',
                        };
                    }),
                },
                { signal: abortController.signal }
            );
        };

        if (questionsWithAnswers.length > 0) postResultsOnLoad();

        return () => {
            abortController.abort();
        };
    }, [questionsWithAnswers]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ translateY: -10, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={styles.resultsPageContainer}
            >
                <div className={styles.scoreMessage}>{scoreMessage}</div>
                <div className={styles.resultsHeader}>
                    <h1 className={styles.mainHeading}>Lesson Results</h1>
                    <h2 className={styles.subHeading}>
                        {numOfCorrectAnswers} / {questionsWithAnswers.length}
                    </h2>
                </div>

                <div className={styles.results}>
                    {questionsWithAnswers.map((question, index) => (
                        <QuestionResult
                            key={question.question.id + Math.random()}
                            questionWithAnswer={question}
                            questionNumber={index + 1}
                        />
                    ))}
                    {questionsWithAnswers.length === 0 ? (
                        <div className={styles.noAnswersLabel}>No results to show</div>
                    ) : null}
                </div>
                <section className={styles.postLesson}>
                    <div className={styles.actions}>
                        <Link to={'/dashboard'} onClick={clearLesson}>
                            Done
                        </Link>
                        <Link className={styles.ghost} to={'/lesson/multi'} onClick={clearLesson}>
                            Repeat lesson
                        </Link>
                    </div>
                </section>
            </motion.div>
        </AnimatePresence>
    );
};
