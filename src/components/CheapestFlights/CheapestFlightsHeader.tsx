import React, { FC, useEffect, useState, ReactNode } from "react";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import Heading from "../../lib/Heading/Heading";
import Nav from "../../lib/Nav/Nav";
import NavItem from "../../lib/NavItem/NavItem";
import {useHistory} from 'react-router-dom'
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export interface CheapestFlightsHeaderProps {
  heading: ReactNode;
  subHeading?: ReactNode;
  onSecondaryBtnClick?: () => void;
  ideasModel?: any;
}

const CheapestFlightsHeader: FC<CheapestFlightsHeaderProps> = ({
  subHeading = "Find incredible value with our travel deals",
  heading = "Cheapest Flights and Travel Deals",
  onSecondaryBtnClick,
  ideasModel = ""
}) => {
  // see if we are on the flights page 
  let history = useHistory()
  let isFlightsPage = history.location.pathname == '/flights'
  // @ts-ignore
  const {t} = useTranslation()
  const handleButtonClick = () => {
    onSecondaryBtnClick && onSecondaryBtnClick()
  };
  
  return (
    <div className="flex flex-col relative mb-5 pb-5 border-b border-[#3A1C1A] border-opacity-20">
      <div className="flex items-center justify-between">
        <Heading
         desc={subHeading}
         className="text-neutral-900 dark:text-white pb-0"
         headingWrapperClassNames='!text-base md:!text-[32px] !text-[#15173F] font-normal dark:!text-white'
         subheadingClassNames={`!text-[#0E123D] dark:!text-white ${isFlightsPage ? '!text-base' : ''}`}
        >
          { heading }
        </Heading>
        {
          ideasModel == "" &&
          <span className="hidden sm:block flex-shrink-0">
            <ButtonSecondary onClick={() => handleButtonClick()}  className="!leading-none !rounded-2xl border border-[#3944B3] dark:border-white hover:border-[#F75847] dark:hover:border-[#3944B3] group">
              <span className="text-[#3944B3] dark:text-white group-hover:text-[#F75847] dark:group-hover:text-[#3944B3]">{t("CHEAP_FLIGHTS.MORE_FLIGHTS")}</span>
              <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-white group-hover:text-[#F75847] dark:group-hover:text-[#3944B3]"></i>
            </ButtonSecondary>
          </span>
        }
      </div>
    </div>
  );
};

export default CheapestFlightsHeader;
