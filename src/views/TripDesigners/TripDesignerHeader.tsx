import React, { FC, useEffect, useState } from 'react';
import { Cookies } from "react-cookie";
import ButtonWithIcon from '../../lib/Button/ButtonWithIcon';
import {ReactComponent as QuestionMarkIcon} from '../../images/icons/questionMarkIcon.svg'
import { useSelector } from 'react-redux';
interface TripDesignerHeaderProps {
  taxonomy?: any;
  onTaxonomy?: any;
  onRequestTripDesignerHowTo?: any;
};

const cookie = new Cookies();

const TripDesignerHeader: FC<TripDesignerHeaderProps> = ({onRequestTripDesignerHowTo}) => {
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);

  const handleClick = () => {
    cookie.set('beenherebefore', 'false');
    onRequestTripDesignerHowTo();
  };

  return (
    <div className={`rounded-t-2xl bg-[#2431bb] dark:bg-[#171925] opacity-[0.9] w-[100%] px-4 lg:px-7 pt-[.5vw] pb-[2vw] relative md:absolute bottom-0 flex items-center justify-between cursor-pointer`}>
        <div className='space-y-4'>
            <div className="flex flex-row space-x-3 mx-auto">
                <span className="text-base md:text-xl lg:text-[28px] text-[#FFFFFF] leading-[42px] mt-3 cursor-pointer font-poppins font-medium md:font-light">{(staticpagetext && staticpagetext[0].translations.trip_designer) ?? 'Trip Designer'}</span>
            </div>
            <span 
             className='py-4 justify-center items-center pb-0 text-sm md:text-base opacity-80 text-white font-light '
            >
                {(staticpagetext && staticpagetext[0].translations.trip_designer_description)}
            </span>
        </div>
        <div className='' onClick={() => {handleClick()}}>
            <QuestionMarkIcon className='text-white w-10 h-10' />
        </div>
    </div>
  )
}

export default TripDesignerHeader;