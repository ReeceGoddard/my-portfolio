import styles from './Switch.module.css';

interface SwitchProps {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
}

export const Switch = ({ checked, onChange, label }: SwitchProps) => {
    return (
        <div className={styles.switchWrapper}>
            <input type="checkbox" id="switch" className={styles.switchInput} checked={checked} onChange={onChange} />
            <label className={styles.switchLabel} htmlFor="switch" />
            {label ? (
                <label className={styles.label} htmlFor="switch">
                    {label}
                </label>
            ) : null}
        </div>
    );
};
