import { SVGProps } from 'react';

export const MultipleChoiceSVG = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 2H2V11H11V2ZM11 13H2V22H11V13ZM13 2H22V11H13V2ZM22 13H13V22H22V13Z"
                fill="url(#paint0_linear_120_46)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_120_46"
                    x1="2.47607"
                    y1="2.47607"
                    x2="21.5237"
                    y2="23.3094"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#65EDFF" />
                    <stop offset="1" stop-color="#D49DFF" />
                </linearGradient>
            </defs>
        </svg>
    );
};
