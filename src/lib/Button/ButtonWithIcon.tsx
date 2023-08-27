import { UserIcon, GlobeIcon, ChevronDownIcon } from '@heroicons/react/solid';
import React, { FC, ReactNode } from 'react';

interface ButtonWithIconProps {
  icon: ReactNode,
  handleClick: any,
  buttonType?: string,
  hasDropdown?: boolean,
  isAuthentecated?: any,
  openAuthProfileMenu?: boolean,
  className?: string,
  chevronClassName?: string,
  data?: any
};

const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  icon,
  hasDropdown,
  handleClick,
  buttonType,
  isAuthentecated,
  openAuthProfileMenu,
  className = "",
  chevronClassName = "mr-[5px] h-4 w-4 translate-y-[1px] text-neutral-500",
  data }) => {

  const production = process.env.REACT_APP_PRODUCTION;

  const handleClickEvent = () => {
    if (buttonType == 'signin') {
      if (isAuthentecated
        // && isAuthentecated.token
      ) {
        handleClick(!openAuthProfileMenu, '');
        return;
      }
      else {
        handleClick(true, '');
      }
    } else if (buttonType === 'feedback') {
      // execute the handleClick function on the feedback navIcon to open the Modal
      handleClick()
    } else if (buttonType === 'language' || buttonType === 'currency') {
      handleClick(true, buttonType);
    } else if (buttonType === 'support') {
      handleClick();
    }
  };

  // username or email truncated
  const usernameOrEmailTruncated = (email: any) => {
    if(email && /\S+@\S+\.\S+/.test(email)) return email.split("@")[0].trim();
    else return email;
  };

  return (
    <button
      onClick={(e: any) => production == 'true' ? null : handleClickEvent()}
      className={`relative group overflow-hidden 
        ${buttonType == 'currency' ? 'pl-1' : ''}
         py-1 ${hasDropdown ? 'px-1' : 'px-3'} h-9 flex items-center rounded-full border border-[#3944B3] dark:border-white bg-neutral from-neutral-500 to-purple-500 hover:to-purple-600 ${className}`}>
      {icon}

      {
        isAuthentecated &&
        data != '' &&
        <span className='hidden xl:inline-block bg-[#FFF9F9] dark:bg-transparent text-[12px] text-[#F75847] dark:text-white'> {usernameOrEmailTruncated(data?.name)} </span>
      }

      {
        (
          hasDropdown ||
          (isAuthentecated &&
            data
            // && isAuthentecated.token
          )
        ) &&
        <ChevronDownIcon
          className={chevronClassName}
          aria-hidden="true"
        />
      }
    </button>
  )
}

export default ButtonWithIcon;