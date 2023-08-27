import React, { FC, ReactNode } from "react";

export interface NavProps {
  containerClassName?: string;
  className?: string;
  children: ReactNode;
  listStyle?:string;
  id?:boolean,
}

const Nav: FC<NavProps> = ({
  containerClassName = "",
  className = "",
  children,
  listStyle,
  id,
}) => {
  return (
    <nav  className={`${containerClassName}`}>
      <ul className={`flex ${listStyle} ${className}`}>{children}</ul>
    </nav>
  );
};

export default Nav;
