

import {FC, SVGProps} from 'react';

interface BedProps extends SVGProps<SVGSVGElement> {
   
    size?: number;
};

const Bed: FC<BedProps> = ({size, ...props}) => {
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
            <path d="M8.125 13.125V6.25H16.25C16.913 6.25 17.5489 6.51339 18.0178 6.98223C18.4866 7.45107 18.75 8.08696 18.75 8.75V13.125" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.25 16.25V3.75" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.25 13.125H18.75V16.25" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.125 6.25H1.25"  stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>


         </svg>
    );
};

export default Bed;
