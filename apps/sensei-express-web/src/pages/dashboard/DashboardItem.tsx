import { MultipleChoiceSVG } from '@/components/MultipleChoiceSVG';
import { useAudioContext } from '@/providers/AudioProvider';
import { Link, To } from 'react-router-dom';
import styles from './DashboardItem.module.css';
import { PencilSVG } from '@/components/PencilSVG';

export type DashboardItemLinkType = 'multipleChoice' | 'writing' | 'mixed' | 'board';

const iconComponents: Record<DashboardItemLinkType, React.ReactNode> = {
    multipleChoice: <MultipleChoiceSVG />,
    writing: <PencilSVG />,
    mixed: <MultipleChoiceSVG />,
    board: <MultipleChoiceSVG />,
};

const optionLabels: Record<DashboardItemLinkType, string> = {
    multipleChoice: 'Multiple Choice',
    writing: 'Writing',
    mixed: 'Mixed',
    board: '',
};

export interface IconLink {
    type: DashboardItemLinkType;
    to: To;
}

export interface OptionProps {
    label: string;
    options: IconLink[];
}

export const DashboardItem = ({ label, options }: OptionProps) => {
    const { playMenuHoverSound, playStartLessonSound } = useAudioContext();

    return (
        <div className={styles.dashboardItem}>
            <div className={styles.label}>{label}</div>
            <div className={styles.line} />
            <div className={styles.options}>
                {options.map(option => (
                    <Link
                        key={option.type}
                        className={styles.option}
                        onMouseEnter={playMenuHoverSound}
                        onClick={playStartLessonSound}
                        to={option.to}
                    >
                        <div className={styles.optionContentWrapper}>
                            {iconComponents[option.type]}
                            <div className={styles.optionLabel}>{optionLabels[option.type]}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
