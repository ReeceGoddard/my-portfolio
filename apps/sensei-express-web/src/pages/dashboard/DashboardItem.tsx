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
    board: null,
};
const optionLabels: Record<DashboardItemLinkType, string> = {
    multipleChoice: 'Multiple Choice',
    writing: 'Writing',
    mixed: 'Mixed',
    board: '',
};

export interface IconLink {
    type?: DashboardItemLinkType;
    to: To;
}
export interface DashboardItemProps {
    label?: string;
    option: IconLink;
}

export const DashboardItem = ({ label, option }: DashboardItemProps) => {
    const { playMenuHoverSound, playStartLessonSound } = useAudioContext();

    return (
        <Link
            className={`${styles.option} ${option.type === 'board' ? styles.board : ''}`}
            onMouseEnter={playMenuHoverSound}
            onClick={playStartLessonSound}
            to={option.to}
        >
            <div className={styles.optionContentWrapper}>
                {option.type ? iconComponents[option.type] : null}
                <div className={styles.optionLabel}>
                    {option.type && option.type !== 'board' ? optionLabels[option.type] : label}
                </div>
            </div>
        </Link>
    );
};
