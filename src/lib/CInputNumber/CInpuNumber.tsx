import React, { FC, useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

export interface CInputNumberProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
  name? : string;
  disabled?: boolean;
}

const CInputNumber: FC<CInputNumberProps> = ({
  className = "w-full",
  defaultValue= 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
  name, 
  disabled
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange && onChange(value);
  }, [value, defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
  };
  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => state + 1);
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
        {desc && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
            {desc}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      data-nc-id="NcInputNumber"
    >
      {label && renderLabel()}

      <div
      
        className={`nc-NcInputNumber flex items-center justify-end xs:justify-start md:justify-between md:w-28`}
      >
        <button
          
          className="w-6 h-6 dark:bg-transparent dark:text-[#fff] md:w-8 md:h-8 rounded-full mr-3 md:mr-0 flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="dark:text-[#fff]">{value}</span>
        <button
          className="w-6 h-6 md:w-8 md:h-8 dark:bg-transparent dark:text-[#fff] rounded-full ml-3 md:ml-0 flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickIncrement}
          disabled={max! <= value || disabled }
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CInputNumber;
