/* eslint-disable @typescript-eslint/no-empty-function */
import { Lesson, Question } from '@/pages/lesson/types';
import React, { ReactNode, createContext, useContext, useMemo, useRef, useState } from 'react';

interface LessonContextType {
    currentLesson: Lesson | null;
    initLesson: (lesson: Lesson) => void;
    clearLesson: () => void;
    answerCurrentQuestion: (answer: string) => boolean;
    currentQuestion: Question | null;
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
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const audioElement = useRef<HTMLAudioElement>(null);

    const currentQuestion: Question | null = useMemo(() => {
        const numOfAnswers = currentLesson?.questions.filter(question => question.userAnswer).length;
        return currentLesson?.questions[numOfAnswers || 0] || null;
    }, [currentLesson]);

    const numberOfQuestions: number = useMemo(() => {
        return currentLesson?.questions.length || 0;
    }, [currentLesson]);

    const initLesson = (lesson: Lesson) => {
        setCurrentLesson(lesson);
    };

    const answerCurrentQuestion = (userAnswer: string): boolean => {
        let isCorrect = false;

        const updatedQuestions = currentLesson?.questions.map(question => {
            if (question.id === currentQuestion?.id) {
                // Check correctness
                isCorrect = userAnswer === question.answer;
                return { ...question, userAnswer, isCorrect };
            }

            return question;
        });

        // Set state
        if (currentLesson && updatedQuestions) {
            setCurrentLesson({ id: currentLesson.id, createdAt: currentLesson.createdAt, questions: updatedQuestions });
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
