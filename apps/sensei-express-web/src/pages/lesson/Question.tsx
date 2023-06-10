import { ChangeEvent, FormEvent, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './Question.module.css';
import { Choice } from './Choice';
import { SoundSVG } from '@/components/SoundSVG';

interface QuestionProps extends HTMLProps<HTMLDivElement> {
    question: string;
    answer: string;
    onAnswer: (userAnswer: string) => void;
    choices: string[];
    hasSound?: boolean;
}

export const Question = ({
    question,
    answer,
    onAnswer,
    choices = [],
    hasSound = true,
    className,
    ...rest
}: QuestionProps) => {
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        handleUserAnswer(userAnswer);
        setUserAnswer('');
    };

    const handleUserAnswer = (userAnswer: string) => {
        if (onAnswer) onAnswer(userAnswer);
    };

    const loadAudio = async () => {
        const audioModule = await import(`../../assets/sounds/${answer}.wav`);

        setAudioSrc(audioModule.default);
        if (audioRef.current) {
            audioRef.current.src = audioModule.default;
        }
    };

    const playAudio = async () => {
        await loadAudio();
        if (audioRef.current) audioRef.current.play();
    };

    return (
        <div className={`${styles.questionPageContainer} ${className}`} {...rest}>
            <div className={styles.questionWrapper}>
                <div className={styles.question}>{question}</div>
                {hasSound ? (
                    <>
                        <button className={styles.playSound} onClick={playAudio}>
                            <SoundSVG width={24} height={24} />
                        </button>
                        <audio ref={audioRef} />
                    </>
                ) : null}
            </div>

            <form className={styles.questionForm} onSubmit={handleSubmit}>
                {choices.length === 0 ? (
                    <input type="text" value={userAnswer} onInput={handleInputChange} />
                ) : (
                    <div className={styles.choices}>
                        {choices.map((choice, index) => (
                            <Choice
                                key={choice}
                                label={choice}
                                choiceNumber={index + 1}
                                onChoiceSelected={handleUserAnswer}
                            />
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};
