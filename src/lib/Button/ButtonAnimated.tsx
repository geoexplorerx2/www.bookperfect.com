import React from 'react';

interface ButtonAnimatedProps {
  clickEvent?: any;
  classes?: string
};

const ButtonAnimated: React.FC<ButtonAnimatedProps>  = ({clickEvent, classes}) => {
  return (
    <button onClick = {(e: any) => clickEvent(true)} className={`${classes} relative group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center `}>
      <span className="relative text-lg text-white">GET STARTED</span>
      <div className="flex items-center -space-x-3 translate-x-3">
        <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
};

export default ButtonAnimated