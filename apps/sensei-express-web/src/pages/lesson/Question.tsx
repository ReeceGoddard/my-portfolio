import { ChangeEvent, FormEvent, HTMLProps, useEffect, useRef, useState } from 'react';
import styles from './Question.module.css';
import { Choice } from './Choice';
import { SoundSVG } from '@/components/SoundSVG';
import { useAnimate } from 'framer-motion';
import { useLessonContext } from './LessonContext';

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
        userInputRef.current?.focus();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (userAnswer.length === 0) return;

        handleUserAnswer(userAnswer);
        setUserAnswer('');
    };

    const handleUserAnswer = (userAnswer: string) => {
        if (onAnswer) {
            const isCorrectAnswer = userAnswer === answer;
            const rgbVar = isCorrectAnswer ? '--bold-green-rgb-vals' : '--japan-red-rgb-vals';

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
                          { duration: 0.3 }
                      )
                    : null,
                animateQuestionText(
                    questionTextRef.current,
                    {
                        opacity: [1, 0],
                        translate: ['0 0', `0 ${isCorrectAnswer ? '-20px' : '20px'}`],
                        color: [null, `${isCorrectAnswer ? 'var(--bold-green)' : 'var(--japan-red)'}`],
                    },
                    { duration: 0.3 }
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
                <form className={styles.questionForm} onSubmit={handleSubmit}>
                    <input
                        ref={userInputRef}
                        className={styles.userAnswer}
                        type="text"
                        value={userAnswer}
                        onInput={handleInputChange}
                    />
                    <button type="submit">Send</button>
                </form>
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
