import Button, { ButtonProps } from "./Button";
import React, { ReactNode } from "react";

export interface ButtonSecondaryProps extends ButtonProps {
  // icon: any;
  rounded?: string;
  onClick?: () => void;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = "",
  onClick,
  rounded,
  type,
  btnId,
  ...args
}) => {

  return (
    <Button
      // icon = { icon }
      onClick = { onClick }
      rounded = { rounded }
      type = { type }
      btnId = { btnId }
      className={`ButtonSecondary w-full flex justify-center text-neutral-700 dark:bg-[#171925]   ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
