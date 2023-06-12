import { MultipleChoiceSVG } from '@/components/MultipleChoiceSVG';
import { useAudioContext } from '@/providers/AudioProvider';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Option.module.css';
import { PencilSVG } from '@/components/PencilSVG';

export type OptionIcon = 'multipleChoice' | 'writing' | 'mixed' | 'board';

const iconComponents: Record<OptionIcon, React.ReactNode> = {
    multipleChoice: <MultipleChoiceSVG />,
    writing: <PencilSVG />,
    mixed: <MultipleChoiceSVG />,
    board: <MultipleChoiceSVG />,
};

export interface OptionProps extends LinkProps {
    label: string;
    icon: OptionIcon;
}

export const Option = ({ label, icon, ...rest }: OptionProps) => {
    const { playMenuHoverSound, playStartLessonSound } = useAudioContext();

    return (
        <Link className={styles.option} onMouseEnter={playMenuHoverSound} onClick={playStartLessonSound} {...rest}>
            <div className={styles.optionContentWrapper}>
                {iconComponents[icon]}
                <div className={styles.label}>{label}</div>
            </div>
        </Link>
    );
};
