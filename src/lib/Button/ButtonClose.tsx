import React from "react";
import { XIcon } from "@heroicons/react/solid";
import twFocus from "../../common/twFocus";

export interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${className} ` +
        twFocus()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XIcon className="w-5 h-5" />
    </button>
  );
};

export default ButtonClose;
