import { HTMLProps, useCallback, useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import { useAudioContext } from '@providers/AudioProvider';
import styles from './Choice.module.css';

interface ChoiceProps extends HTMLProps<HTMLButtonElement> {
    label: string;
    choiceNumber: number;
    isCorrectAnswer: boolean;
    onChoiceSelected: (choice: string) => void;
}

export const Choice = ({ label, choiceNumber, isCorrectAnswer, onChoiceSelected, className, ...rest }: ChoiceProps) => {
    const [scope, animate] = useAnimate();
    const { playChoiceHoverSound } = useAudioContext();

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const centerX = (clientX - left).toFixed(0);
        const centerY = (clientY - top).toFixed(0);
        document.documentElement.style.setProperty('--gradient-x', `${centerX}px`);
        document.documentElement.style.setProperty('--gradient-y', `${centerY}px`);
    };

    const selectChoice = useCallback(() => {
        const rgbVar = isCorrectAnswer ? '--bold-green-rgb-vals' : '--japan-red-rgb-vals';
        const duration = 0.3;

        animate(
            scope.current,
            {
                boxShadow: [`0 0 0 0px rgb(var(${rgbVar}) / 0.2)`, `0 0 400px 200px rgb(var(${rgbVar}) / 0)`],
                borderColor: [null, `rgb(var(${rgbVar}))`],
                color: [null, `rgb(var(${rgbVar}))`],
            },
            { duration }
        );

        animate(
            `div.${styles.hotkey}`,
            { background: [null, `rgb(var(${rgbVar}))`], color: ['white', 'white'] },
            { duration }
        );

        onChoiceSelected(label);
    }, [animate, isCorrectAnswer, label, onChoiceSelected, scope]);

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            // Skip if modifier key held
            if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
                return;
            }

            // Check if the input is not focused and the user starts typing
            if (event.key === choiceNumber.toString()) {
                selectChoice();
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [choiceNumber, selectChoice]);

    return (
        <button
            className={`${styles.choice} ${className ? className : ''}`}
            ref={scope}
            onMouseEnter={playChoiceHoverSound}
            onMouseMove={handleMouseMove}
            {...rest}
            type={'button'}
            onClick={selectChoice}
        >
            <div className={styles.hoverGradient}></div>
            <div className={styles.label}>{label}</div>
            <div className={styles.hotkey}>{choiceNumber}</div>
        </button>
    );
};
