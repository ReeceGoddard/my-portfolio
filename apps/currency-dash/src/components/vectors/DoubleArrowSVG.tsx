import { SVGProps, useMemo } from 'react';

export interface DoubleArrowSVGProps extends SVGProps<SVGSVGElement> {
    direction?: 'up' | 'right' | 'down' | 'left';
    color?: string;
}

export const DoubleArrowSVG = ({
    direction = 'down',
    color = '#000000',
    className,
    ...rest
}: DoubleArrowSVGProps): JSX.Element => {
    const rotation = useMemo(() => {
        if (direction === 'up') return 180;
        if (direction === 'right') return -90;
        if (direction === 'left') return 90;
        if (direction === 'down') return 0;
    }, [direction]);

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            style={{ rotate: `${rotation}deg`, fill: color }}
            className={`${direction} ${className}`}
            {...rest}
        >
            <path d="M12 19.1639L18.207 12.9569L16.793 11.5429L12 16.3359L7.20703 11.5429L5.79303 12.9569L12 19.1639ZM12 13.5139L18.207 7.30694L16.793 5.89294L12 10.6859L7.20703 5.89294L5.79303 7.30694L12 13.5139Z" />
        </svg>
    );
};
