import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Switch } from '@headlessui/react';
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import airlinelogo from "../../images/airlinelogo.png";
import styled from 'styled-components';
import { CloseButton, Modal } from '@mantine/core';
import FlightSearchForm from "../HeroInputSearch/FlightSearchForm";
import { useDispatch } from "react-redux";
import { arrivalByCodeData, departureByCodeData } from "../../store/actions";
import { useSelector } from "react-redux";
import { stripHtml } from "../../common/stripHtml";
import BookFlightModal from "../BookFlightModal/BookFlightModal";
import { ReactComponent as CrossIcon } from "../../images/icons/PopUpCloseIcon.svg";
import { ReactComponent as AirPlaneIcon } from '../../images/icons/boldAirplaneIcon.svg'
import { useCurrencyPicker } from "../../hooks";
import { useTranslation } from "react-i18next";

export interface FlightCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
  name?: string;
  useCompactStyles?: boolean;
  onCheckAvailability?: any;
};

const EconomyWrapper = styled.div`
  /* caption/light */
  width: 70px;
  margin-left: ${(props: any) => props.useCompactStyles ? '' : '27px'};
  margin-right: ${(props: any) => props.useCompactStyles ? '10px' : ''};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  display :flex;
  flex-direction: column;
  justify-content:space-between;
  color: #3F4249;
  opacity: 0.9;

  @media only screen and (max-width: 768px) {
   margin: 0;
  }

`;

const TravelBetweenWrapper = styled.div`
  /* caption/light */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */


  /* paragraph */

  color: #3F4249;

  opacity: 0.9;
`;

const DatesBetweenWrapper = styled.div`
  * caption/medium */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */


  /* title */

  color: #0E123D;

  opacity: 0.9;
`;

const PriceWrapper = styled.div`
  // position: absolute;
  //width: 47px;
  width: 100%;
  text-align: right;
  height: 27px;
  // left: 314px;
  // top: 499px;
  
  /* h6/bold */
  text-sm text-gray-500 truncate dark:text-gray-400
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */


  /* primary */

  color: #3944B3;
`;


export const flightCurrencyPicker = (currency:any) => {
  switch (currency) {
    case 'EUR':
      return "€" 
    case 'USD':
      return "$"   
    default:
      break;
  }
};

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const FlightCard: FC<FlightCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
  useCompactStyles = false,
  onCheckAvailability
}) => {

  const dispatch = useDispatch();
  const departure: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.departure);
  const arrival: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.arrival);

  const [opened, setOpened] = useState(false);

  const {
    name,
    startDate,
    endDate,
    baseAdultPrice,
    currency,
    departureLocationCode,
    arrivalLocationCode,
    datasheets,
    departureLocationName,
    arrivalLocationName
  } = data;
  // @ts-ignore
  const {t} = useTranslation()

  let start = new Date(startDate).toDateString();
  let end = new Date(endDate).toDateString();

  const defaultFrom = data.departureLocationName ?? name.split(" ")[2];
  const defaultTo = data.arrivalLocationName ?? name.split(" ")[4];

  var from = data.departureLocationName ?? departure?.filter((depart: any) => depart.code == departureLocationCode );
  var to = data.arrivalLocationName ?? arrival?.filter((dest: any) => dest.code == arrivalLocationCode );

  // const flightCurrency = flightCurrencyPicker(currency);
  const flightCurrency = useCurrencyPicker(currency);
    
  const handleCheckAvailability = () => {
    onCheckAvailability({
      opened: true, 
      data: data,
      defaultFrom: defaultFrom,
      defaultTo: defaultTo
    });
  };

  const renderContent = () => {
    return (
      <div className={`space-y-2 
        ${size === "default" ? "p-3 " : ""}
        ${useCompactStyles ? 'px-[10px]' : 'pl-4 pr-[22px]'}
        `
        }>
       <div className="flow-root">
        <div className={`flex justify-between 
                      ${useCompactStyles ? 'px-2 mb-[10px]' : 'py-3 sm:py-4 '}`}>
            <div className={`flex items-center space-x-2`}>
                <div className="flex-shrink-0">
                    <img className={`w-[72px] h-[72px] ${useCompactStyles ? 'hidden' : ''} `} src={airlinelogo} alt="image" />
                </div>
                <div className="flex-shrink-0">
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.3672 6.2806L13.7422 8.74935L16.2422 15.6243L14.3672 17.4993L10.6328 12.0306L8.74219 13.7493V15.6243L6.86719 17.4993L5.75781 14.2259L2.49219 13.1243L4.36719 11.2493H6.24219L8.11719 9.37435L2.49219 5.62435L4.36719 3.74935L11.2422 6.24935L13.7188 3.63216L13.6641 3.67122C14.0163 3.31898 14.494 3.12109 14.9922 3.12109C15.4903 3.12109 15.9681 3.31898 16.3203 3.67122C16.6726 4.02346 16.8704 4.5012 16.8704 4.99935C16.8704 5.49749 16.6726 5.97523 16.3203 6.32747L16.3672 6.2806Z" stroke="#3F4249" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> */}
                    <AirPlaneIcon className={`${useCompactStyles ? 'text-[#F75847]' : 'text-[#3F4249]'} `} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0E123D] truncate dark:text-gray-400">
                       {/* { name.split(" ")[2] } to */}
                       {/* { from && from[0] && from[0].name }  */}
                       { typeof from == 'object' ? (from[0] && from[0].name ) : from  } to
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                     {/* { name.split(" ")[4] } */}
                     {/* { to && to[0] && to[0].name } */}
                     { typeof to == 'object' ? (to[0] && to[0].name) : to }
                     {/* { arrival && arrival.name } */}
                    </p>
                </div>
                {/* <div className="text-xs  text-gray-900 dark:text-white">
                 { datasheets.EN.description }
                </div> */}
            </div>
            <div className={`min-w-0 dark:text-white ${useCompactStyles ? 'flex items-center' : 'hidden'}`}>
                      <EconomyWrapper useCompactStyles={useCompactStyles}>
                          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">                           */}
                        <span className={`dark:text-white  ${useCompactStyles ? 'w-full text-right whitespace-nowrap' : 'mx-1'}`}>{t('CHEAP_FLIGHTS.ECONOMY')}</span>
                        <span className={`w-full dark:text-white ${useCompactStyles ? 'w-full text-right whitespace-nowrap' : 'mx-1'}`}>{t('CHEAP_FLIGHTS.RETURN_FROM')}</span>
                          {/* </p> */}
                      </EconomyWrapper>
                      <PriceWrapper>
                        <span className="dark:text-[#f8f4ff]">{ flightCurrency } { baseAdultPrice }</span>
                      </PriceWrapper>
                      {/* <p className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $320
                      </p> */}
                    </div>
         </div>
         <div className={`w-[320px] inline-block whitespace-nowrap text-ellipsis text-xs text-gray-900 dark:text-white mt-2 max-h-4 overflow-hidden 
                        ${useCompactStyles ? 'hidden' : ''}
         `}>
           { (data.description && stripHtml(data.description)) ?? (datasheets.EN.description && stripHtml(datasheets.EN.description))  }
         </div>
         <div className={`dark:bg-[transparent] py-1 sm:py-1 ${useCompactStyles ? 'bg-[#F4F8FF] pl-3 pr-1 rounded-[10px]' : ''}`}>
                <div className="flex items-center space-x-6">
                    <div className={`flex-1 min-w-4`}>
                      {/* <TravelBetweenWrapper> */}
                        <p className="text-sm text-gray- truncate dark:text-gray-400">
                           {t('CHEAP_FLIGHTS.TRAVEL_BETWEEN')}                          
                        </p>
                      {/* </TravelBetweenWrapper> */}
                      {/* <DatesBetweenWrapper> */}
                        <p className={` text-[#0E123D] dark:text-white ${useCompactStyles ? 'text-sm' : 'truncate text-xs font-small'}`}>
                          {/* 03 Aug 2022 - 08 Aug 2022 */}
                          { start } - { end }
                        </p>
                      {/* </DatesBetweenWrapper> */}
                      
                    </div>
                    <div className={`py-1 sm:py-1  ${useCompactStyles ? '' : 'hidden'}`}>
                        <a onClick={() => handleCheckAvailability()} className="text-blue-800 bg-white dark:bg-transparent dark:border-white dark:text-white border-solid border-2 border-[#3944B3] hover:bg-[#3944B3] cursor-pointer hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                          {t('CHEAP_FLIGHTS.CHECK')}
                          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    </div> */}
                    <div className={`min-w-0 dark:text-white ${useCompactStyles ? 'hidden' : ''}`}>
                      <EconomyWrapper>
                          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">                           */}
                        <span className="mx-1 dark:text-white">Economy</span>
                        <span className="mx-1 w-full dark:text-white">Return form</span>
                          {/* </p> */}
                      </EconomyWrapper>
                      <PriceWrapper>
                        { flightCurrency } { baseAdultPrice }
                      </PriceWrapper>
                      {/* <p className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          $320
                      </p> */}
                    </div>
                </div>
         </div>

         <div className={`py-1 sm:py-1 ${useCompactStyles ? 'hidden' : ''}`}>
            <a onClick={() => setOpened(true)} className="text-blue-800 bg-white dark:bg-transparent dark:border-white dark:text-white border-solid border-2 border-[#3944B3] hover:bg-[#3944B3] cursor-pointer hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
              CHECK AVAILABILITY
              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
         </div>

        </div>
       </div>
    );
  };

  return (
    <div className={`flight-card group relative bg-white dark:bg-neutral-900 border border-[#DADBE8] dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow ${className}`}>
      { renderContent() }
    </div>
  );
};

export default FlightCard;
