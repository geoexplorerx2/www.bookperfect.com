import Button, { ButtonProps } from "./Button";
import React, { ButtonHTMLAttributes } from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  handleLogout?: any;
  buttonType?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "bg-primary-6000 hover:bg-primary-700",
  handleLogout,
  buttonType,
  type,
  ...args
}) => {

  const handleClick = () => {
    if(buttonType == 'logout') handleLogout();
  };

  return (
    <Button
      onClick={() => handleClick()}
      type={type}
      className={`disabled:bg-opacity-70 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
