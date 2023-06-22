import { ChangeEvent, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './Question.module.css';
import { Choice } from './Choice';
import { SoundSVG } from '@/components/SoundSVG';
import { useAnimate } from 'framer-motion';
import { useLessonContext } from '@providers/LessonContext';
import { SendSVG } from '@/components/SendSVG';

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
    const { playAnswerSound } = useLessonContext();
    const [userAnswer, setUserAnswer] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [questionTextRef, animateQuestionText] = useAnimate();
    const [userInputRef, animateUserInput] = useAnimate();

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            // Skip if modifier key held
            if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
                return;
            }

            // Check if the input is not focused and the user starts typing
            if (document.activeElement !== userInputRef.current && event.key.match(/^[a-zA-Z]$/)) {
                event.preventDefault();
                userInputRef.current?.focus();
                setUserAnswer(prevAnswer => prevAnswer + event.key);
            }
        };

        // Focus input on load
        const inputElement = userInputRef.current;
        if (inputElement) inputElement.focus();

        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [userInputRef]);

    useEffect(() => {
        userInputRef.current?.focus();
    }, [userInputRef]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (userAnswer.length === 0) return;
        handleUserAnswer(userAnswer);
        setUserAnswer('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleUserAnswer = (userAnswer: string) => {
        if (onAnswer) {
            const isCorrectAnswer = userAnswer.toLowerCase() === answer.toLowerCase();
            const rgbVar = isCorrectAnswer ? '--bold-green-rgb-vals' : '--japan-red-rgb-vals';
            const duration = 0.4;

            Promise.all([
                playAnswerSound(isCorrectAnswer),
                choices.length === 0
                    ? animateUserInput(
                          userInputRef.current,
                          {
                              boxShadow: [
                                  `0 0 0 0px rgb(var(${rgbVar}) / 0.2)`,
                                  `0 0 400px 200px rgb(var(${rgbVar}) / 0)`,
                              ],
                          },
                          { duration }
                      )
                    : null,
                animateQuestionText(
                    questionTextRef.current,
                    {
                        opacity: [1, 0],
                        translate: ['0 0', `0 ${isCorrectAnswer ? '-20px' : '20px'}`],
                        color: [null, `${isCorrectAnswer ? 'var(--bold-green)' : 'var(--japan-red)'}`],
                    },
                    { duration }
                ),
            ]).then(() => {
                onAnswer(userAnswer);
            });
        }
    };

    const loadAudio = async () => {
        const audioModule = await import(`../../assets/sounds/${answer}.wav`);

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
                <div className={styles.question}>
                    <span ref={questionTextRef}>{question}</span>
                </div>
                {hasSound ? (
                    <>
                        <button className={styles.playSound} onClick={playAudio}>
                            <SoundSVG width={24} height={24} />
                        </button>
                        <audio ref={audioRef} />
                    </>
                ) : null}
            </div>

            {choices.length === 0 ? (
                <div className={styles.writingAnswerWrapper}>
                    <input
                        ref={userInputRef}
                        className={styles.userAnswer}
                        type="text"
                        value={userAnswer}
                        onInput={handleInputChange}
                        onSubmit={handleSubmit}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="button" onClick={handleSubmit}>
                        <SendSVG />
                    </button>
                </div>
            ) : (
                <div className={styles.choices}>
                    {choices.map((choice, index) => (
                        <Choice
                            key={choice}
                            label={choice}
                            choiceNumber={index + 1}
                            isCorrectAnswer={choice === answer}
                            onChoiceSelected={handleUserAnswer}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
