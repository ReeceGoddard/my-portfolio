import { ChangeEvent, FormEvent, HTMLProps, useEffect, useState } from 'react';
import styles from './Question.module.css';
import { Choice } from './Choice';

interface QuestionProps extends HTMLProps<HTMLDivElement> {
    question: string;
    onAnswer: (userAnswer: string) => void;
    choices: string[];
}

export const Question = ({ question, onAnswer, choices = [], className, ...rest }: QuestionProps) => {
    const [userAnswer, setUserAnswer] = useState('');

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

    return (
        <div className={`${styles.questionWrapper} ${className}`} {...rest}>
            <div className={styles.question}>{question}</div>
            <form onSubmit={handleSubmit}>
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
