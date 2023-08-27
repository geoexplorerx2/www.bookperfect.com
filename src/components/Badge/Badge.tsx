import React, { FC, ReactNode } from "react";

export interface BadgeProps {
  className?: string;
  textClassName?: string
  desc?: string;
  icon?: any;
  color?: string;
  iconStyle?: string;
};

const Badge: FC<BadgeProps> = ({
  className = "",
  desc = "",
  icon = "",
  color,
  iconStyle = "w-full h-full",
  textClassName,
}) => {
  return (
    <div
      className={`badge flex items-center justify-center text-xs font-semibold md:font-light py-0.5 px-[10px] md:px-3 bg-${[color]} text-white ${className}`}
    >
     {icon && <img src={icon} className = {iconStyle}/> } 
     {desc && <span className={`${textClassName} min-w-[81px] min-h-[30px] flex justify-center items-center text-base font-medium `}>{desc}</span>}
    </div>
  );
};

export default Badge;
