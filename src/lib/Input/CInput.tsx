import React, { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChange?: any;
  name?: string;
};

const CInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = " ",
      sizeClass = "h-13 px-24 py-3 ",
      fontClass = "text-sm font-normal",
      rounded = "rounded-xl",
      label = "",
      placeholder = "",
      icon ,
      children,
      type = "text",
      onChange,
      name = "",
      ...args
    },
    ref
  ) => {
    return (
      <div>
          <label className="mb-2 text-sm font-medium  text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative z-[1000]">
            <input              
              ref = { ref }
              type = { type }
              name = { name}           
              placeholder = { placeholder }
              onChange = {event => {
                // console.log('even::',event)
                onChange(event)}}
              className={`block w-full  dark:bg-[transparent]  !ring-0  ${rounded} ${fontClass} ${sizeClass} ${className}`}
              { ...args } 
            />
            {/* <span>password error</span> */}
          </div>
      </div>
    );
  }
);

export default CInput;
