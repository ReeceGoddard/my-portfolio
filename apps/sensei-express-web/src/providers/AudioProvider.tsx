/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, RefObject, createContext, useContext, useRef } from 'react';
import music from '@assets/sounds/music.wav';

interface AudioContextType {
    musicAudioElement: React.RefObject<HTMLAudioElement> | null;
    answerAudioElement: React.RefObject<HTMLAudioElement> | null;
    menuHoverAudioElement: React.RefObject<HTMLAudioElement> | null;
    startLessonAudioElement: React.RefObject<HTMLAudioElement> | null;
    choiceHoverAudioElement: React.RefObject<HTMLAudioElement> | null;
    playMusic: () => Promise<void>;
    playAnswerSound: (isCorrect: boolean) => Promise<void>;
    playMenuHoverSound: () => Promise<void>;
    playStartLessonSound: () => Promise<void>;
    playChoiceHoverSound: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType>({
    musicAudioElement: null,
    answerAudioElement: null,
    menuHoverAudioElement: null,
    startLessonAudioElement: null,
    choiceHoverAudioElement: null,
    playMusic: () => {
        return new Promise(res => res());
    },
    playAnswerSound: () => {
        return new Promise(res => res());
    },
    playMenuHoverSound: () => {
        return new Promise(res => res());
    },
    playStartLessonSound: () => {
        return new Promise(res => res());
    },
    playChoiceHoverSound: () => {
        return new Promise(res => res());
    },
});

export const useAudioContext = (): AudioContextType => useContext(AudioContext);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const musicAudioElement = useRef<HTMLAudioElement>(null);
    const answerAudioElement = useRef<HTMLAudioElement>(null);
    const menuHoverAudioElement = useRef<HTMLAudioElement>(null);
    const startLessonAudioElement = useRef<HTMLAudioElement>(null);
    const choiceHoverAudioElement = useRef<HTMLAudioElement>(null);

    const playSound = async (ref: RefObject<HTMLAudioElement>, soundName: string): Promise<void> => {
        if (ref.current) {
            const audioModule: typeof import('*.wav') = await import(`@assets/sounds/${soundName}.wav`);
            ref.current.src = audioModule.default;
            ref.current.currentTime = 0;
            return ref.current.play();
        }
    };

    const playMusic = async (shouldPlay = true) => {
        if (musicAudioElement.current) {
            const fadeDuration = 5000;
            const fadeInterval = 50;
            const initialVolume = shouldPlay ? 0 : 1;
            const targetVolume = shouldPlay ? 1 : 0;

            if (shouldPlay) {
                // Play and fade in
                const volumeStep = (targetVolume - initialVolume) / (fadeDuration / fadeInterval);
                musicAudioElement.current.volume = initialVolume;
                musicAudioElement.current.muted = false;
                musicAudioElement.current.play();
                let currentVolume = initialVolume;

                const fadeIntervalId = setInterval(() => {
                    if (musicAudioElement.current) {
                        if (currentVolume >= 1) {
                            musicAudioElement.current.volume = 1;
                            clearInterval(fadeIntervalId);
                        } else {
                            currentVolume = Math.min(1, currentVolume + volumeStep);
                            musicAudioElement.current.volume = currentVolume;
                        }
                    }
                }, fadeInterval);
            } else {
                // Fade out and pause
                const volumeStep = (initialVolume - targetVolume) / (fadeDuration / fadeInterval);
                let currentVolume = initialVolume;
                const fadeIntervalId = setInterval(() => {
                    if (musicAudioElement.current) {
                        if (currentVolume <= 0) {
                            musicAudioElement.current.volume = 0;
                            musicAudioElement.current.pause();
                            clearInterval(fadeIntervalId);
                        } else {
                            currentVolume = Math.max(0, currentVolume - volumeStep);
                            musicAudioElement.current.volume = currentVolume;
                        }
                    }
                }, fadeInterval);
            }
        }
    };

    const playAnswerSound = (isCorrect: boolean) => playSound(answerAudioElement, isCorrect ? 'correct' : 'incorrect');
    const playMenuHoverSound = () => playSound(menuHoverAudioElement, 'choice-hover');
    const playStartLessonSound = () => playSound(startLessonAudioElement, 'start2');
    const playChoiceHoverSound = () => playSound(startLessonAudioElement, 'choice-hover');

    return (
        <AudioContext.Provider
            value={{
                playMusic,
                answerAudioElement,
                menuHoverAudioElement,
                startLessonAudioElement,
                choiceHoverAudioElement,
                musicAudioElement,
                playAnswerSound,
                playMenuHoverSound,
                playStartLessonSound,
                playChoiceHoverSound,
            }}
        >
            <audio ref={musicAudioElement} muted src={music} autoPlay={true} loop={true} />
            <audio ref={answerAudioElement} />
            <audio ref={menuHoverAudioElement} />
            <audio ref={startLessonAudioElement} />
            <audio ref={choiceHoverAudioElement} />
            <button
                style={{ position: 'fixed', zIndex: 1000, right: 0, bottom: 0 }}
                onClick={() => {
                    playMusic(musicAudioElement.current?.muted);
                }}
            >
                M
            </button>
            {children}
        </AudioContext.Provider>
    );
};
