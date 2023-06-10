import { SVGProps } from 'react';

export const MenuSVG = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="3" y="6" width="18" height="2" rx="0.5" fill="black" />
            <rect x="3" y="11" width="18" height="2" rx="0.5" fill="black" />
            <rect x="3" y="16" width="18" height="2" rx="0.5" fill="black" />
        </svg>
    );
};
