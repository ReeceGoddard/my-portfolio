import styles from './Tooltip.module.css';

type Position = {
    x: number;
    y: number;
};

export type TooltipProps = {
    position: Position;
    value: string | number;
    hidden: boolean;
};

export const Tooltip = ({ position, value, hidden = true }: TooltipProps): JSX.Element => {
    return (
        <div
            className={`${styles.tooltip} ${hidden ? styles.hidden : ''}`}
            style={{ left: position.x, top: position.y }}
        >
            {value}
        </div>
    );
};
