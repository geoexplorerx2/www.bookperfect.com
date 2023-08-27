import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import airlinelogo from "../../images/airlinelogo.png";

import $ from 'jquery';
import styled from 'styled-components';

import activities from "../../images/activities.png";
import Activitis from "../ActivitisLike/Activitis";
import Reviews from "../Reviews/reviews";
import { TopActivities } from "../../data/TopActivities";
import { formatDate } from "../../common/formatDate";
import { urlBaseActivities } from "../HeroInputSearch/ActivitiesSearchForm";
import { useSelector } from "react-redux";
import { currencySymbol } from "./TripIdeaCard";
import BASE_URL_HOME from "../../api/env";
import { useTranslation } from "react-i18next";

export interface ActivitiesCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
  cardWidth?: number;
};

const EconomyWrapper = styled.div`
  /* caption/light */
  width: 70px;
  margin-left: 27px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  text-align: right;

  /* paragraph */

  color: #3F4249;

  opacity: 0.9;
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
  width: 47px;
  height: 27px;
  // left: 314px;
  // top: 499px;
  margin-left: 50%; 

  /* h6/bold */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */


  /* primary */

  color: #3944B3;
`;

const DEMO_DATA = TopActivities[0];

const ActivitiesCard: FC<ActivitiesCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
  cardWidth
}) => {
  const {
    id,
    city,
    name,
    currency,
    baseServicePrice,
    imageUrls,
    searchlink,
    datasheets
  } = data;

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const lightmode: any = useSelector((state: any) => state.LightMode.mode);
  // @ts-ignore
  const {t} = useTranslation()
  const [destination, setDestination] = useState<any>();

  let defaultGuest = {
    rooms: 1,
    adults: 2,
    children: 0,
  };

  // TODO: dynamic dates
  let date = (new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)));
  let newDate = (new Date(date.getTime() + (15 * 24 * 60 * 60 * 1000)));

  let cityName = data.datasheets.EN.meetingPoint;
  
  const departure = {
    date: formatDate(date)
  };

  const returned = {
    date: formatDate(newDate)
  };

  const destinationCountries: any[] = [];
  
  // TODO: create hook for depth searched
  useEffect(() => {
    $.ajax({
      url: BASE_URL_HOME + "/jsonp/locationSearch?callback=?&tripType=ONLY_TICKET",
      dataType: "jsonp",
      data: {
          query: cityName,
          micrositeId: 'bookperfect',
          languageId: 'EN',
          destinationCountries: destinationCountries
      },
      success: function (data: any) {
          if (!$.isEmptyObject(data)) {            
            setDestination(data);
          }
      }
   })
  }, [data]);

  const handleActivity = () => {
    if (destination && destination[0]) {
      var linkToBooking = urlBaseActivities + "&destination=" + destination[0].id + "&departureDate=" + departure.date + "&arrivalDate=" + returned.date + "&distribution=" + defaultGuest.adults + "-" + defaultGuest.children + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
      window.open(linkToBooking, '_blank');
    }
  };

  const renderContent = () => {
    return (
      <div className="max-w-sm md:!max-w-[unset] bg-white shadow-md dark:bg-gray-800 flight-card group relative border border-[#3842B233] dark:border-neutral-800 rounded-2xl hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow ">
        <>
          <div className="relative">
            <img className="w-full h-[185px] rounded-t-[16px]" src={ imageUrls ?? activities} alt="product image" />

            <div className='absolute right-3 bottom-3 w-20  h-16 bg-[#3944B3] rounded-xl flex items-center justify-center text-xs py-10 px-3'>
              <div className="grid grid-cols-1 space-y-1 w-[100%]">
                <span className="text-[10px] text-white w-[full] text-center">from per person</span>
                <div className=" text-white text-[18px] font-semibold text-center py-1">
                  { currencySymbol(currency) } { baseServicePrice }
                </div>
              </div>
            </div>

          </div>
          <div className="pt-5 md:pb-5 space-y-3">
            <a href="#">
              <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white px-2 md:px-5">
                {cityName ?? city}
              </h5>
            </a>
            <div className="flex flex-col md:flex-row  py-3 px-2 md:px-5">
              <div className="md:w-[50%] mr-3 mb-3 md:mb-0"><Activitis /></div>
              <div className="md:w-[50%]"><Reviews /></div>
            </div>
            <div className="flex flex-col md:flex-row flex-grow  items-center text-neutral-500 dark:text-neutral-400 text-sm md:space-x-4 space-y-2 md:space-y-0">

              <span className="w-full px-2 md:px-5 flex flex-1 space-x-2 md:border-r-2">
                <span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.41489 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1209 6.84638 16.2635 4.78216 14.7407 3.25932C13.2178 1.73648 11.1536 0.87913 9 0.875V0.875ZM8.84375 4.625C9.02917 4.625 9.21043 4.67998 9.3646 4.783C9.51877 4.88601 9.63893 5.03243 9.70989 5.20373C9.78085 5.37504 9.79941 5.56354 9.76324 5.7454C9.72707 5.92725 9.63778 6.0943 9.50667 6.22541C9.37555 6.35652 9.20851 6.44581 9.02665 6.48199C8.84479 6.51816 8.65629 6.49959 8.48499 6.42864C8.31368 6.35768 8.16726 6.23752 8.06425 6.08335C7.96124 5.92918 7.90625 5.74792 7.90625 5.5625C7.90625 5.31386 8.00503 5.0754 8.18084 4.89959C8.35666 4.72377 8.59511 4.625 8.84375 4.625ZM9.625 13.375H9C8.83424 13.375 8.67527 13.3092 8.55806 13.1919C8.44085 13.0747 8.375 12.9158 8.375 12.75V9C8.20924 9 8.05027 8.93415 7.93306 8.81694C7.81585 8.69973 7.75 8.54076 7.75 8.375C7.75 8.20924 7.81585 8.05027 7.93306 7.93306C8.05027 7.81585 8.20924 7.75 8.375 7.75H9C9.16576 7.75 9.32474 7.81585 9.44195 7.93306C9.55916 8.05027 9.625 8.20924 9.625 8.375V12.125C9.79076 12.125 9.94974 12.1908 10.0669 12.3081C10.1842 12.4253 10.25 12.5842 10.25 12.75C10.25 12.9158 10.1842 13.0747 10.0669 13.1919C9.94974 13.3092 9.79076 13.375 9.625 13.375Z" fill={lightmode == 'dark' ? '#fff' : '#3944B3'} />
                  </svg>
                </span>
                <span>{name}</span>
              </span>

              <span className="w-full px-2 md:px-5 flex flex-1 space-x-2">
                <span>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 1.6543H12.375V1.0293C12.375 0.863537 12.3092 0.704565 12.1919 0.587355C12.0747 0.470145 11.9158 0.404297 11.75 0.404297C11.5842 0.404297 11.4253 0.470145 11.3081 0.587355C11.1908 0.704565 11.125 0.863537 11.125 1.0293V1.6543H4.875V1.0293C4.875 0.863537 4.80915 0.704565 4.69194 0.587355C4.57473 0.470145 4.41576 0.404297 4.25 0.404297C4.08424 0.404297 3.92527 0.470145 3.80806 0.587355C3.69085 0.704565 3.625 0.863537 3.625 1.0293V1.6543H1.75C1.41848 1.6543 1.10054 1.78599 0.866116 2.02041C0.631696 2.25483 0.5 2.57278 0.5 2.9043V15.4043C0.5 15.7358 0.631696 16.0538 0.866116 16.2882C1.10054 16.5226 1.41848 16.6543 1.75 16.6543H14.25C14.5815 16.6543 14.8995 16.5226 15.1339 16.2882C15.3683 16.0538 15.5 15.7358 15.5 15.4043V2.9043C15.5 2.57278 15.3683 2.25483 15.1339 2.02041C14.8995 1.78599 14.5815 1.6543 14.25 1.6543ZM11.2422 9.60742L7.59375 13.0449C7.53702 13.1005 7.46985 13.1443 7.3961 13.1738C7.32235 13.2033 7.24348 13.2179 7.16406 13.2168C7.00396 13.2174 6.84989 13.1558 6.73438 13.0449L4.75781 11.1699C4.69432 11.1145 4.64269 11.0469 4.60601 10.971C4.56934 10.8952 4.54838 10.8127 4.5444 10.7285C4.54041 10.6443 4.55349 10.5602 4.58284 10.4813C4.61219 10.4023 4.65721 10.3301 4.71518 10.2689C4.77316 10.2078 4.8429 10.159 4.92021 10.1255C4.99753 10.092 5.08081 10.0745 5.16507 10.074C5.24932 10.0735 5.33281 10.09 5.41051 10.1226C5.4882 10.1552 5.5585 10.2032 5.61719 10.2637L7.16406 11.7324L10.3828 8.70117C10.4418 8.64385 10.5117 8.59891 10.5884 8.569C10.665 8.53908 10.7469 8.5248 10.8292 8.52698C10.9114 8.52916 10.9924 8.54777 11.0674 8.58171C11.1423 8.61565 11.2097 8.66424 11.2656 8.72461C11.3795 8.84485 11.4409 9.00535 11.4365 9.17086C11.4321 9.33638 11.3622 9.49339 11.2422 9.60742ZM14.25 5.4043H1.75V2.9043H3.625V3.5293C3.625 3.69506 3.69085 3.85403 3.80806 3.97124C3.92527 4.08845 4.08424 4.1543 4.25 4.1543C4.41576 4.1543 4.57473 4.08845 4.69194 3.97124C4.80915 3.85403 4.875 3.69506 4.875 3.5293V2.9043H11.125V3.5293C11.125 3.69506 11.1908 3.85403 11.3081 3.97124C11.4253 4.08845 11.5842 4.1543 11.75 4.1543C11.9158 4.1543 12.0747 4.08845 12.1919 3.97124C12.3092 3.85403 12.375 3.69506 12.375 3.5293V2.9043H14.25V5.4043Z" fill={lightmode == 'dark' ? '#fff' : '#3944B3'} />
                  </svg>
                </span>
                <span className="">{ newDate.toDateString() }</span>
              </span>

            </div>

            <div className="flex md:px-5">
              <a onClick={(e: any) => handleActivity()} className="text-[#3842B2] cursor-pointer dark:bg-[#171925] dark:text-[#fff] dark:border-[1px] dark:border-[#fff] bg-white border border-solid border-[#3842B2] hover:bg-[#3842B2] hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                {t("VIEW_OPTIONS")}
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
          </div>
        </>
      </div>
    );
  };

  return (
    <div
      className={`flight-card group relative bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl ${className}`}
      data-nc-id="flight-card"
      style={{width: `${cardWidth && cardWidth > 100 ? cardWidth : null }px`}}
    >
      {/* <Link to={href}> */}
      {renderContent()}
      {/* </Link> */}
    </div>
  );
};

export default ActivitiesCard;
