import { DashboardItem, IconLink } from './DashboardItem';
import styles from './LessonItem.module.css';

export interface LessonItemProps {
    label: string;
    options: IconLink[];
}

export const LessonItem = ({ label, options }: LessonItemProps): JSX.Element => {
    return (
        <div className={styles.dashboardItem}>
            <div className={styles.label}>{label}</div>
            <div className={styles.line} />
            <div className={styles.options}>
                {options.map(option => (
                    <DashboardItem key={option.type} label={label} option={{ type: option.type, to: option.to }} />
                ))}
            </div>
        </div>
    );
};
