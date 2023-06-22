import styles from './Switch.module.css';

interface SwitchProps {
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
    return (
        <>
            <input type="checkbox" id="switch" className={styles.switchInput} checked={checked} onChange={onChange} />
            <label className={styles.switchLabel} htmlFor="switch" />
        </>
    );
};
