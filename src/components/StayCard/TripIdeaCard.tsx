import React, { FC } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";

import Badge from "../Badge/Badge";

import tripidea from "../../images/tripidea.png";
import FlightBadge from "../../images/icons/FlightBadge.svg";
import DestPin from "../../images/icons/DestPin.svg";
import MoonIcon from "../../images/icons/MoonIcon.svg";

import styled from "styled-components";
import LocationIcon from "../../images/icons/locationIcon";
import BASE_URL_HOME, { BASE_URL } from "../../api/env";
import { useLocation } from 'react-router-dom';
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { goToPage } from "../../common/goToPage";
import { useSelector } from "react-redux";
import StringToBoolean from "../../common/StringToBoolean";

export interface TripIdeaCardProps {
  className?: string;
  ratioClass?: string;
  data?: any; // TODO: TRIP_IDEA_DATA
  size?: "default" | "small";
  cardType?: string;
  OnTripIdea?: any;
  TripTo?: any;
  margin?: any;
  taxoLength?: number;
  imageWrapperClassName?: any;
  cardWrapperClassNames?: any;
};

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

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

export const currencySymbol = (currency: string) => {
  switch (currency) {
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
    case 'GBP':
      return '£'
    case 'TRY':
      return '₺'
    default:
      return ''
  }
};

const TripIdeaCard: FC<TripIdeaCardProps> = ({
  size = "default",
  className = "",
  margin,
  data,
  ratioClass,
  cardType,
  OnTripIdea,
  TripTo,
  taxoLength,
  imageWrapperClassName,
  cardWrapperClassNames
}) => {
  const {
    type = 'continent',
    name = '',
    country = '',
    city = '',
    pack = '',
    title,
    description,
    destinations,
    imageUrl,
    totalPrice,
    ideaUrl,
    counters,
    field_cover_image
  } = data;

  // @ts-ignore
  const { t } = useTranslation();
  const currentURL = useLocation();
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);
  const destImg = field_cover_image && BASE_URL + field_cover_image.url;

  const handleClick = () => {
    if (isTravelCompositorDealsPage && taxoLength == 2) {
      let citycode = data.name.toLowerCase();
      let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;

      goToPage(dealspage, 'redirect');
      return;
    };

    OnTripIdea(data);
    TripTo(data);
  };

  const renderContent = () => {
    return (
      <>
        <div className="w-[100%] h-full bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={() => handleClick()}>

          <div className={`${imageWrapperClassName} h-[170px] sm:min-h-[264px] relative cursor-pointer`}>
            <img className="w-full h-full min-h-[154px] cursor-pointer" src={imageUrl ?? (destImg ? destImg : tripidea)} alt="product image" />
            {
             data.counters?.transfers == 0 && 
             data.ribbonText &&
             <Badge 
               className="absolute left-3 top-3 rounded-full sm:rounded-[10px] bg-gradient-to-r from-[#FE9878] to-[#F75247] md:rounded-xl w-16 md:w-36" 
               textClassName="text-[10px] md:text-xs" 
               color="#FE9A7A" 
               desc={data.ribbonText} 
             />
            }
            {totalPrice && <Badge className="absolute right-3 top-3 rounded-full sm:rounded-[10px] bg-[#3944B3] md:rounded-xl w-16 md:w-20" textClassName="text-[10px] md:text-xs" color="#3944B3" desc={totalPrice && Math.round(totalPrice.amount) + " " + currencySymbol(totalPrice.currency)} />}
            <div className="flex justify-end items-end flex-col absolute top-0 w-[100%] h-[100%]">
              {
                data.destinations &&
                data.counters?.transfers == 0 &&
                <>
                  <div className="flex justify-around w-[100%] mb-2 md:mb-0">
                    <div className="w-9 md:w-10 h-6 flex justify-around">
                      <Badge className="text-sm text-bold bg-gradient-to-r from-[#FE9878] to-[#F75247] rounded-[10px] w-full h-full p-[6px]" textClassName="text-sm font-medium" iconStyle="mr-[5px] !w-[11px] !h-[11px]" desc={counters?.transports ?? 0} icon={FlightBadge} color="#FE9A7A" />
                    </div>
                    <div className="w-9 md:w-10 h-6 flex justify-around md:ml-8">
                      <Badge className="text-sm text-bold bg-gradient-to-r from-[#FE9878] to-[#F75247] rounded-[10px] w-full h-full p-[6px]" textClassName="text-sm font-medium" iconStyle="mr-[5px] !w-[11px] !h-[13px]" desc={counters?.destinations ?? 0} icon={DestPin} color="#FE9A7A" />
                    </div>
                    <div className="w-9 md:w-10 h-6 flex justify-around md:ml-4">
                      <Badge className="text-sm text-bold bg-gradient-to-r from-[#FE9878] to-[#F75247] rounded-[10px] w-full h-full p-[6px]" textClassName="text-sm font-medium" iconStyle="mr-[5px] !w-[11px] !h-[13px]" desc={counters?.hotelNights ?? 0} icon={MoonIcon} color="#FE9A7A" />
                    </div>
                  </div>
                  <div className="hidden sm:flex w-[100%]">
                    <div className="flex flex-col w-[100%] justify-center mb-[.5vh]">
                      <div className="w-[100%] mx-2 flex justify-around text-[0.8vw]">
                        <div className="w-16 overflow-hidden pl-3 flex justify-start">
                          <div className=" h-3 w-3 bg-white rotate-45 transform origin-bottom-left"></div>
                        </div>
                        <div className="w-16 overflow-hidden  flex justify-center">
                          <div className=" h-3 w-3 bg-white rotate-45 transform origin-bottom-left"></div>
                        </div>
                        <div className="w-16 overflow-hidden flex justify-center">
                          <div className=" h-3 w-3 bg-white rotate-45 transform origin-bottom-left"></div>
                        </div>
                      </div>
                      <div className="w-[100%] justify-center px-2">
                        <div className="w-[100%] bg-[#fff] flex justify-around text-[0.8vw] py-2" style={{ borderRadius: '6px' }}>
                          <div>{t("TRIP_IDEAS.TRANSPORTS")}</div>
                          <div>{t("TRIP_IDEAS.DESTINATION")}</div>
                          <div>{t("TRIP_IDEAS.NIGHTS")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
              {
                data.counters?.transfers > 0 &&
                <div className="flex justify-start ml-4 w-[100%] mb-2 md:mb-2">
                  <div className="w-20 md:w-[50%] ml-4 min-h-[2.5rem] flex justify-around">
                    <Badge
                      className="text-xs text-bold bg-gradient-to-r from-[#FE9878] to-[#F75247] rounded-[10px] w-full h-full "
                      textClassName="!text-xs font-medium"
                      iconStyle="mr-[5px] !w-[11px] !h-[11px]"
                      desc={data?.ribbonText ?? 0}
                      icon={''}
                      color="#FE9A7A"
                    />
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="relative">
            <div className="pl-2 pr-2 pt-2 pb-4 sm:px-5 sm:py-4">
              <a onClick={() => OnTripIdea(data)} >
                <h5 className="text-[10px] sm:text-base font-semibold tracking-tight text-gray-900 dark:text-white">{name || country || data.city || pack || title}</h5>
              </a>
              {
                data.destinations &&
                <div className="inline-flex mt-2 sm:mt-3 sm:mr-3 items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1 max-w-[215px] translate-y-[2px]">
                  <span><LocationIcon color="#F75247" className="w-[15px] h-[15px]" /></span>
                </div>
              }
              <span className="flex-1 tracking-tight text-[9px] max-w-[200px] sm:text-sm text-[#666666] dark:text-[#DADBE8] pl-3 sm:pl-1 w-full md:w-auto">
                {data.destinations?.map((dest: any, idx: number) => (
                  <span className={`space-x-2 ${idx > 0 && 'ml-2'}`}>
                    <span>{dest.name}</span>
                    {idx < data.destinations.length - 1 && <i className="las text-[#F96254] la-arrow-right"></i>}
                  </span>
                ))
                }
              </span>
            </div>
            <div className="hidden md:inline-block absolute bottom-3 right-5">
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div

      className={` ${cardWrapperClassNames} trip-idea-card group relative w-[100%] h-[288px] md:min-h-[380px] bg-white dark:bg-neutral-900 border border-[#DADBE8] dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow
      ${currentURL.pathname == '/myprofile' ? 'mb-1' : 'mb-16'}
      ${className}`}
      data-nc-id="trip-idea-card"
    >
      {renderContent()}
    </div>
  );
};

export default TripIdeaCard;
