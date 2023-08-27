import {FC, SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

const LocationIcon: FC<IconProps> = ({size, ...props}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!!size ? size : "80%"}
            height={!!size ? size : "100%"}
            fill="none"
            stroke='currentColor'
            {...props}
        >
            <g clip-path="url(#clip0_5962_5064)">
            <path d="M22.5222 10.8832C22.5222 18.2906 12.9984 24.6398 12.9984 24.6398C12.9984 24.6398 3.47461 18.2906 3.47461 10.8832C3.47461 8.35731 4.47801 5.93489 6.26407 4.14883C8.05013 2.36277 10.4725 1.35937 12.9984 1.35938C15.5243 1.35938 17.9467 2.36277 19.7328 4.14883C21.5188 5.93489 22.5222 8.35731 22.5222 10.8832Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.9988 14.0582C14.7521 14.0582 16.1734 12.6369 16.1734 10.8836C16.1734 9.1303 14.7521 7.70898 12.9988 7.70898C11.2455 7.70898 9.82422 9.1303 9.82422 10.8836C9.82422 12.6369 11.2455 14.0582 12.9988 14.0582Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_5962_5064">
            <rect width="25.3968" height="25.3968" transform="translate(0.300781 0.300781)"/>
            </clipPath>
            </defs>
       </svg>
    );
};

export default LocationIcon;
