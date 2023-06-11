/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useRef } from 'react';

interface LessonContextType {
    audioElement: React.RefObject<HTMLAudioElement> | null;
    playAnswerSound: (isCorrect: boolean) => Promise<void>;
}

const LessonContext = createContext<LessonContextType>({
    audioElement: null,
    playAnswerSound: () => {
        return new Promise(res => res());
    },
});

export const useLessonContext = (): LessonContextType => useContext(LessonContext);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
    const audioElement = useRef<HTMLAudioElement>(null);

    const playAnswerSound = async (isCorrect: boolean): Promise<void> => {
        if (audioElement.current) {
            const audioModule = isCorrect
                ? await import('../../assets/sounds/correct3.mp3')
                : await import('../../assets/sounds/incorrect.wav');
            audioElement.current.src = audioModule.default;
            return audioElement.current.play();
        }
    };

    return (
        <LessonContext.Provider value={{ audioElement, playAnswerSound }}>
            <audio ref={audioElement} />
            {children}
        </LessonContext.Provider>
    );
};
