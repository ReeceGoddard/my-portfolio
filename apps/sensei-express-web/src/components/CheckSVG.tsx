import { SVGProps } from 'react';

export const CheckSVG = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <mask
                id="mask0_126_221"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="5"
                width="30"
                height="22"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.66666 16L5.99999 12.6667L12.6667 19.3333L26 6L29.3333 9.33333L12.6667 26L2.66666 16Z"
                    fill="#555555"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </mask>
            <g mask="url(#mask0_126_221)">
                <path d="M0 0H32V32H0V0Z" fill="#91C691" />
            </g>
        </svg>
    );
};
