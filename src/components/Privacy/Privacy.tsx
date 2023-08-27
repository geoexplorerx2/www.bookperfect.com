import React, { FC } from 'react';

interface PrivacyProps{
  className?: string;
};

const Privacy: FC<PrivacyProps> = ({className = ''}) => {
  return (
    <div className={`flex flex-row flex-nowrap ${className} mx-auto max-w-[294px]`}>
      <span className='basis-1/3 text-[10px] cursor-pointer underline'>
        Terms of Use
      </span>
      <span className='basis-1/3 text-[10px] cursor-pointer underline'>
        Privacy Policy
      </span>
      <span className='basis-1/3 text-[10px] cursor-pointer underline'>
        Cookies Policy
      </span>
    </div>
  )
}

export default Privacy;