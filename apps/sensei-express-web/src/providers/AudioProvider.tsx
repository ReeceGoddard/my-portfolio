/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    ReactNode,
    RefObject,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import music from '@assets/sounds/music.wav';
import { MusicButton } from '@/components/music-button/MusicButton';

interface AudioContextType {
    musicAudioElement: React.RefObject<HTMLAudioElement> | null;
    answerAudioElement: React.RefObject<HTMLAudioElement> | null;
    menuHoverAudioElement: React.RefObject<HTMLAudioElement> | null;
    startLessonAudioElement: React.RefObject<HTMLAudioElement> | null;
    choiceHoverAudioElement: React.RefObject<HTMLAudioElement> | null;
    toggleMusic: () => void;
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
    toggleMusic: () => {},
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

const fadeDuration = 5000;
const fadeInterval = 50;

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
    const musicAudioElement = useRef<HTMLAudioElement>(null);
    const answerAudioElement = useRef<HTMLAudioElement>(null);
    const menuHoverAudioElement = useRef<HTMLAudioElement>(null);
    const startLessonAudioElement = useRef<HTMLAudioElement>(null);
    const choiceHoverAudioElement = useRef<HTMLAudioElement>(null);
    const fadeIntervalId = useRef<number | null>(null);

    const playSound = async (ref: RefObject<HTMLAudioElement>, soundName: string): Promise<void> => {
        if (ref.current) {
            const audioModule: typeof import('*.wav') = await import(`@assets/sounds/${soundName}.wav`);
            ref.current.src = audioModule.default;
            ref.current.currentTime = 0;
            return ref.current.play();
        }
    };

    // const playMusic = async (shouldPlay = true) => {
    //     if (musicAudioElement.current) {
    //         const initialVolume = shouldPlay ? 0 : 1;
    //         const targetVolume = shouldPlay ? 1 : 0;

    //         // Stop previous loop if interjected
    //         if (fadeInIntervalId) window.clearInterval(fadeInIntervalId);
    //         if (fadeOutIntervalId) window.clearInterval(fadeOutIntervalId);

    //         if (shouldPlay) {
    //             // Play and fade in
    //             const volumeStep = (targetVolume - initialVolume) / (fadeDuration / fadeInterval);
    //             musicAudioElement.current.volume = initialVolume;
    //             musicAudioElement.current.muted = false;
    //             musicAudioElement.current.play();
    //             setIsMusicPlaying(true);
    //             let currentVolume = initialVolume;

    //             fadeInIntervalId = window.setInterval(() => {
    //                 if (musicAudioElement.current) {
    //                     if (currentVolume >= 1) {
    //                         musicAudioElement.current.volume = 1;
    //                         if (fadeInIntervalId) window.clearInterval(fadeInIntervalId);
    //                     } else {
    //                         currentVolume = Math.min(1, currentVolume + volumeStep);
    //                         musicAudioElement.current.volume = currentVolume;
    //                     }
    //                 }
    //             }, fadeInterval);
    //         } else {
    //             // Fade out and pause
    //             setIsMusicPlaying(false);
    //             const volumeStep = (initialVolume - targetVolume) / (fadeDuration / fadeInterval);
    //             let currentVolume = initialVolume;
    //             fadeOutIntervalId = window.setInterval(() => {
    //                 if (musicAudioElement.current) {
    //                     if (currentVolume <= 0) {
    //                         musicAudioElement.current.volume = 0;
    //                         musicAudioElement.current.pause();
    //                         if (fadeOutIntervalId) window.clearInterval(fadeOutIntervalId);
    //                     } else {
    //                         currentVolume = Math.max(0, currentVolume - volumeStep);
    //                         musicAudioElement.current.volume = currentVolume;
    //                     }
    //                 }
    //             }, fadeInterval);
    //         }
    //     }
    // };

    const playAnswerSound = (isCorrect: boolean) => playSound(answerAudioElement, isCorrect ? 'correct' : 'incorrect');
    const playMenuHoverSound = () => playSound(menuHoverAudioElement, 'choice-hover');
    const playStartLessonSound = () => playSound(startLessonAudioElement, 'start2');
    const playChoiceHoverSound = () => playSound(choiceHoverAudioElement, 'choice-hover');

    const playAndFadeInMusic = useCallback(() => {
        if (musicAudioElement.current) {
            const initialVolume = musicAudioElement.current.volume;
            const targetVolume = 1;

            const volumeStep = (targetVolume - initialVolume) / (fadeDuration / fadeInterval);
            musicAudioElement.current.volume = initialVolume;
            musicAudioElement.current.muted = false;
            musicAudioElement.current.play();
            setIsMusicPlaying(true);
            let currentVolume = initialVolume;

            fadeIntervalId.current = window.setInterval(() => {
                if (musicAudioElement.current) {
                    if (currentVolume >= 1) {
                        musicAudioElement.current.volume = 1;
                        if (fadeIntervalId.current) window.clearInterval(fadeIntervalId.current);
                    } else {
                        currentVolume = Math.min(1, currentVolume + volumeStep);
                        musicAudioElement.current.volume = currentVolume;
                    }
                }
            }, fadeInterval);
        }
    }, []);

    const fadeOutAndPauseMusic = useCallback(() => {
        if (musicAudioElement.current) {
            const initialVolume = musicAudioElement.current.volume;
            const targetVolume = 0;

            setIsMusicPlaying(false);
            const volumeStep = (initialVolume - targetVolume) / (fadeDuration / fadeInterval);
            let currentVolume = initialVolume;
            fadeIntervalId.current = window.setInterval(() => {
                if (musicAudioElement.current) {
                    if (currentVolume <= 0) {
                        musicAudioElement.current.volume = 0;
                        musicAudioElement.current.pause();
                        if (fadeIntervalId.current) window.clearInterval(fadeIntervalId.current);
                    } else {
                        currentVolume = Math.max(0, currentVolume - volumeStep);
                        musicAudioElement.current.volume = currentVolume;
                    }
                }
            }, fadeInterval);
        }
    }, []);

    const toggleMusic = () => {
        setIsMusicPlaying(!isMusicPlaying);
    };

    useEffect(() => {
        if (musicAudioElement.current) {
            if (fadeIntervalId.current) window.clearInterval(fadeIntervalId.current);

            if (isMusicPlaying === true) playAndFadeInMusic();
            else fadeOutAndPauseMusic();
        }
    }, [isMusicPlaying, fadeIntervalId, playAndFadeInMusic, fadeOutAndPauseMusic]);

    useEffect(() => {
        if (musicAudioElement.current) musicAudioElement.current.volume = 0;
    }, [musicAudioElement]);

    return (
        <AudioContext.Provider
            value={{
                toggleMusic,
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
            {children}
            <MusicButton isMuted={!isMusicPlaying} onClick={toggleMusic} />
        </AudioContext.Provider>
    );
};
