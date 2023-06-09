import { HTMLProps, useEffect } from 'react';
import styles from './Choice.module.css';

interface ChoiceProps extends HTMLProps<HTMLButtonElement> {
    label: string;
    choiceNumber: number;
    onChoiceSelected: (choice: string) => void;
}

export const Choice = ({ label, choiceNumber, onChoiceSelected, className, ...rest }: ChoiceProps) => {
    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const centerX = (clientX - left).toFixed(0);
        const centerY = (clientY - top).toFixed(0);
        document.documentElement.style.setProperty('--gradient-x', `${centerX}px`);
        document.documentElement.style.setProperty('--gradient-y', `${centerY}px`);
    };

    const selectChoice = () => {
        //TODO: Animate button styles before selecting
        onChoiceSelected(label);
    };

    return (
        <button
            className={`${styles.choice} ${className ? className : ''}`}
            onMouseMove={handleMouseMove}
            {...rest}
            type={'button'}
            onClick={() => selectChoice()}
        >
            <div className={styles.hoverGradient}></div>
            <div className={styles.label}>{label}</div>
            <div className={styles.hotkey}>{choiceNumber}</div>
        </button>
    );
};
