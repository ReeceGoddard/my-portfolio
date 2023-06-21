/* eslint-disable @typescript-eslint/no-empty-function */
import { Lesson, Question, QuestionWithAnswer } from '@/pages/lesson/types';
import React, { ReactNode, createContext, useContext, useMemo, useRef, useState } from 'react';

interface LessonContextType {
    currentLesson: QuestionWithAnswer[] | null;
    initLesson: (questions: Question[]) => void;
    clearLesson: () => void;
    answerCurrentQuestion: (answer: string) => boolean;
    currentQuestion: QuestionWithAnswer | null;
    numberOfQuestions: number;
    audioElement: React.RefObject<HTMLAudioElement> | null;
    playAnswerSound: (isCorrect: boolean) => Promise<void>;
}

const LessonContext = createContext<LessonContextType>({
    currentLesson: null,
    initLesson: () => {},
    clearLesson: () => {},
    answerCurrentQuestion: () => {
        return false;
    },
    currentQuestion: null,
    numberOfQuestions: 0,
    audioElement: null,
    playAnswerSound: () => {
        return new Promise(res => res());
    },
});

export const useLessonContext = (): LessonContextType => useContext(LessonContext);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
    const [currentLesson, setCurrentLesson] = useState<QuestionWithAnswer[] | null>(null);
    const audioElement = useRef<HTMLAudioElement>(null);

    const currentQuestion: QuestionWithAnswer | null = useMemo(() => {
        const numOfAnswers = currentLesson?.filter(question => question.userAnswer).length;
        return currentLesson?.[numOfAnswers || 0] || null;
    }, [currentLesson]);

    const numberOfQuestions: number = useMemo(() => {
        return currentLesson?.length || 0;
    }, [currentLesson]);

    const initLesson = (questions: Question[]) => {
        const questionsWithAnswers: QuestionWithAnswer[] = questions.map(question => ({
            question,
            isCorrect: null,
            userAnswer: null,
            userID: '1',
        }));

        setCurrentLesson(questionsWithAnswers);
    };

    const answerCurrentQuestion = (userAnswer: string): boolean => {
        let isCorrect = false;

        const updatedQuestions: QuestionWithAnswer[] | undefined = currentLesson?.map(lessonQuestion => {
            if (lessonQuestion.question.charID === currentQuestion?.question.charID) {
                // Check correctness
                isCorrect = userAnswer.toLowerCase() === lessonQuestion.question.answer.toLowerCase();

                return { ...lessonQuestion, userAnswer, isCorrect };
            }
            return lessonQuestion;
        });

        // Set state
        if (currentLesson && updatedQuestions) {
            setCurrentLesson(updatedQuestions);
        }

        return isCorrect;
    };

    const clearLesson = () => {
        setCurrentLesson(null);
    };

    const playAnswerSound = async (isCorrect: boolean): Promise<void> => {
        if (audioElement.current) {
            const audioModule = isCorrect
                ? await import('@assets/sounds/correct3.mp3')
                : await import('@assets/sounds/incorrect.wav');
            audioElement.current.src = audioModule.default;
            return audioElement.current.play();
        }
    };

    return (
        <LessonContext.Provider
            value={{
                initLesson,
                currentLesson,
                answerCurrentQuestion,
                clearLesson,
                currentQuestion,
                numberOfQuestions,
                audioElement,
                playAnswerSound,
            }}
        >
            <audio ref={audioElement} />
            {children}
        </LessonContext.Provider>
    );
};
