import {FC, SVGProps} from 'react';

interface MagnifyingGlassProps extends SVGProps<SVGSVGElement> {
   
    size?: number;
};

const MagnifyingGlass: FC<MagnifyingGlassProps> = ({size, ...props}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!!size ? size : "100%"}
            height={!!size ? size : "100%"}
            fill="none"
            stroke='currentColor'
            {...props}
        >
            <g clip-path="url(#clip0_5994_550)">
            <path d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.7031 13.7031L17.5 17.5"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_5994_550">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>

         </svg>
    );
};

export default MagnifyingGlass;
