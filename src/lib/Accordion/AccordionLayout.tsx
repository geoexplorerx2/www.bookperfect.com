import React, { FC, ReactNode } from 'react';
// import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

interface AccordionLayoutProps {
    title?: string;
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
    customStyle?: string;
    onClick?: () => void;
};

const AccordionLayout: FC<AccordionLayoutProps> = ({title, icon, children, className = "text-[#3944B3] items-center font-bold ml-2", customStyle = "flex w-full p-2 mt-2 rounded-lg bg-[#F4F8FF]", onClick}) => {
  return (
     <>
        <div className={customStyle} onClick =  { onClick}>
            <span className="">{icon}</span>
            <div className=''>
                {/* <div className='text-[#3944B3] items-center font-bold ml-2' style={{fontWeight: 500, fontFamily: 'Poppins', fontSize: '14px'}}>{title}</div> */}
                <span className={className} >{title}</span>
            </div>
            <div className="flex items-center justify-center">
                {/* <BsFillArrowUpCircleFill className='w-8 h-8' /> */}
                {/* <ChevronUpIcon className='w-8 h-8 ml-16' /> */}
            </div>
       </div>
       <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6 space-y-4">
        {children}
       </div>
     </>
  )
};

export default AccordionLayout;