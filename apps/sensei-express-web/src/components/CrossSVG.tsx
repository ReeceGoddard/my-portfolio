import { SVGProps } from 'react';

export const CrossSVG = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <mask
                id="mask0_126_359"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="3"
                y="3"
                width="26"
                height="26"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 7.33333L7.33333 4L16 12.6667L24.6667 4L28 7.33333L19.3333 16L28 24.6667L24.6667 28L16 19.3333L7.33333 28L4 24.6667L12.6667 16L4 7.33333Z"
                    fill="#555555"
                    stroke="#F0796D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </mask>
            <g mask="url(#mask0_126_359)">
                <path d="M0 0H32V32H0V0Z" fill="#F0796D" />
            </g>
        </svg>
    );
};
