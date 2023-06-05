import { useThemeContext } from '../providers/ThemeProvider';
import { HSLA } from '../utils/HSLA';

export const SVGGradientDefs = () => {
    const { positiveColor, neutralColor, negativeColor } = useThemeContext();

    const createGradient = (id: string, color: HSLA) => (
        <>
            <linearGradient id={`${id}-area-gradient`} gradientTransform="rotate(90)">
                <stop offset="0%" stopColor={color.getHSLAString({ alpha: 0.1 })} />
                <stop offset="100%" stopColor={color.getHSLAString({ alpha: 0 })} />
            </linearGradient>
            <radialGradient id={`${id}-area-radial-gradient`} cx="50%" cy="0%" r="50%" fx="0%" fy="0%">
                <stop offset="0%" stopColor={color.getHSLAString({ alpha: 0.1 })} />
                <stop offset="100%" stopColor={color.getHSLAString({ alpha: 0 })} />
            </radialGradient>
        </>
    );

    return (
        <svg style={{ display: 'block' }} height="0px" width="0px">
            <defs>
                {createGradient('positive', positiveColor)}
                {createGradient('neutral', neutralColor)}
                {createGradient('negative', negativeColor)}
            </defs>
        </svg>
    );
};
