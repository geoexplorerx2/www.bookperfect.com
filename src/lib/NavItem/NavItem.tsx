import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import twFocus from "../../common/twFocus";
import { ToTranslationFormat, TranslateIfExists } from "../../helpers";

export interface NavItemProps {
  className?: string;
  radius?: string;
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  navItemStyle?:string;
  componentId?:string;
}

const NavItem: FC<NavItemProps> = ({
  className = "px-[32px] h-[30px] sm:h-[unset] mt-3 sm:mt-0 text-sm sm:text-base sm:px-[60px] sm:py-[14px] capitalize",
  radius = "rounded-full",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
  navItemStyle,
  componentId,
}) => {
  // @ts-ignore
  const {t, i18n} = useTranslation()
  return (
    <li className={`relative ${navItemStyle}`}>
      {renderX && renderX}
      <button
        className={`block !leading-none font-medium whitespace-nowrap lg:text-[15px] ${className} ${radius} ${
          isActive
            ? "bg-gradient-to-br from-[#FE9A7A] to-[#FA6455] text-secondary-50 "
            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900  dark:hover:bg-neutral-800"
        } ${twFocus()}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {/* { typeof children == 'string' ? t(`TRIP_IDEAS.${ToTranslationFormat(children)}`) : t(children)} */}
        {/* {i18n.exists(`TRIP_IDEAS.${ToTranslationFormat(children as string)}`) ?  t(`TRIP_IDEAS.${ToTranslationFormat(children as string)}`) : children} */}
        {TranslateIfExists(`TRIP_IDEAS.${children}`)}
      </button>
    </li>
  );
};

export default NavItem;
