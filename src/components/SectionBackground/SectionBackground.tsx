import React, { FC, ReactNode } from "react";
import Vector from '../../images/Vector.svg'

export interface SectionBackgroundProps {
  className?: string;
  children?: ReactNode;
  isWidth?: string;
  isRounded?: string;
  backgroundColor?: string;
  id?: string;
}

const SectionBackground: FC<SectionBackgroundProps> = ({
  className = "",
  children,
  isWidth,
  isRounded,
  id,
  backgroundColor = '',
}) => {
  let pathname = window.location.pathname.split('/');

  return (
    <div
      className={`nc-SectionBackground absolute inset-y-0 w-full 
       ${isWidth} 
       transform  
       ${isRounded} 
       z-0
      ${className}`}>

      <div className="absolute z-2 top-0 w-full h-full">
        {children}
      </div>
      {
        id=='destination' && <div className="absolute z-1 top-0 w-full h-full flex justify-end">
          <img className="h-[30rem] -translate-x-[30px]" src={Vector} />
        </div>
      }
    </div>
  );
};

export default SectionBackground;
