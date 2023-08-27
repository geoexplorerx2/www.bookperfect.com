import React, { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";

import hotel from "../../images/hotel.png";
import popularhotel from "../../images/popularhotel.png";
import LikeSVG from '../../images/like.svg';
import styled from "styled-components";
import { urlBaseHotel } from "../HeroInputSearch/HotelsSearchForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import BASE_URL_HOME from "../../api/env";
import { formatDate } from "../../common/formatDate";

import $ from 'jquery';
import { goToPage } from "../../common/goToPage";
import { Tabs } from "../../lib/Tabs/Tabs";
import { hotelByProvider } from "../../store/actions";
import { isNumber } from "react-simple-timefield";
import StaticHotelCard from "./StaticHotelCard";
import ButtonSecondary from "../../lib/Button/ButtonSecondary";
import ThirdPartyRatingCard from "../ThirdPartyRatingCard/ThirdPartyRatingCard";
import LocationIcon from "../../images/icons/locationIcon";
import { useCurrencyPicker } from "../../hooks";
import { HotelsCardWidthAction } from "../../store/actions/HotelsCardWidthAction";
import useWindowSize from "../../hooks/useWindowSize";
import { TranslateIfExists } from "../../helpers";
import { useTranslation } from "react-i18next";


export interface HotelIdeaCardProps {
  className?: string;
  ratioClass?: string;
  data?: any;
  size?: "default" | "small";
  cardType?: string;
};

const PriceWrapper = styled.div`
  // position: absolute;
  width: 100%;
  height: 27px;
  // left: 314px;
  // top: 499px;
  // margin-left: 50%; 
  text-align: end;

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

export const HOTEL_SERVICES = [
  {
    name: 'Parking',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6365_23596)">
        <path d="M9.75 2.25H4.5V15.75H7.5V11.25H9.75C12.2325 11.25 14.25 9.2325 14.25 6.75C14.25 4.2675 12.2325 2.25 9.75 2.25ZM9.9 8.25H7.5V5.25H9.9C10.725 5.25 11.4 5.925 11.4 6.75C11.4 7.575 10.725 8.25 9.9 8.25Z" fill="#3944B3" />
      </g>
      <defs>
        <clipPath id="clip0_6365_23596">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  },
  {
    name: 'Wi-fi',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6365_23599)">
        <path d="M0.75 6.75031L2.25 8.25031C5.9775 4.52281 12.0225 4.52281 15.75 8.25031L17.25 6.75031C12.6975 2.19781 5.31 2.19781 0.75 6.75031ZM6.75 12.7503L9 15.0003L11.25 12.7503C10.0125 11.5053 7.995 11.5053 6.75 12.7503ZM3.75 9.75031L5.25 11.2503C7.32 9.18031 10.68 9.18031 12.75 11.2503L14.25 9.75031C11.355 6.85531 6.6525 6.85531 3.75 9.75031Z" fill="#3944B3" />
      </g>
      <defs>
        <clipPath id="clip0_6365_23599">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>,
  },
  {
    name: '',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6365_23602)">
        <path d="M6.41313 9.00047C5.61063 8.46797 4.72562 8.04797 3.76562 7.79297C4.72562 8.04797 5.61063 8.46797 6.41313 9.00047ZM14.2356 7.79297C13.2681 8.04797 12.3681 8.47547 11.5581 9.02297C12.3681 8.47547 13.2681 8.04797 14.2356 7.79297Z" fill="#3944B3" />
        <path d="M11.6175 7.2225C11.4825 5.13 10.635 3.09 9.045 1.5C7.44 3.105 6.555 5.145 6.3825 7.2225C7.3425 7.7325 8.2275 8.3925 9 9.195C9.7725 8.4 10.6575 7.74 11.6175 7.2225ZM6.7425 9.21C6.6375 9.135 6.5175 9.0675 6.405 8.9925C6.5175 9.075 6.6375 9.135 6.7425 9.21ZM11.5575 9.0225C11.46 9.09 11.355 9.1425 11.2575 9.2175C11.355 9.1425 11.46 9.09 11.5575 9.0225ZM9 11.5875C7.3875 9.1275 4.635 7.5 1.5 7.5C1.5 11.49 4.02 14.865 7.5225 16.1175C7.995 16.29 8.49 16.4175 9 16.5C9.51 16.41 9.9975 16.2825 10.4775 16.1175C13.98 14.865 16.5 11.49 16.5 7.5C13.365 7.5 10.6125 9.1275 9 11.5875Z" fill="#3944B3" />
      </g>
      <defs>
        <clipPath id="clip0_6365_23602">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  },
  {
    name: 'Restaurant',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_6365_23606)">
        <path d="M8.25 6.75H6.75V1.5H5.25V6.75H3.75V1.5H2.25V6.75C2.25 8.34 3.495 9.63 5.0625 9.7275V16.5H6.9375V9.7275C8.505 9.63 9.75 8.34 9.75 6.75V1.5H8.25V6.75ZM12 4.5V10.5H13.875V16.5H15.75V1.5C13.68 1.5 12 3.18 12 4.5Z" fill="#3944B3" />
      </g>
      <defs>
        <clipPath id="clip0_6365_23606">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  }
];

export const hotelTab: any = [
  {
    name: 'Hotel',
    icon: '',
    status: ''
  },
  {
    name: 'More infos',
    icon: '',
    status: ''
  }
];

const HotelIdeaCard: FC<HotelIdeaCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
  cardType
}) => {

  const {
    id,
    name,
    hotelname,
    address,
    category,
    providerCode,
    imageUrls,
    description,
    ratings,
    otherServices,
    basePrice,
    destination : HotelDestination
  } = data.main ?? data;
  
  let words = hotelname?.split(" ").slice(0, 3).join(" ");
  const dispatch = useDispatch();
  const [sourceMarket, setSourceMarket] = useState<any>('UK');
  const [destination, setDestination] = useState<any>(hotelname);
  const [searchedHotels, setSearchedHotels] = useState<any>();
  const [activeTab, setActiveTab] = useState<any>('hotel');
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const hotelInfo: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotelinfo);
  const theme :any = useSelector((state:any)=>state.LightMode.mode);


  const dynamicStyles = useSelector((state: any) => state.DynamicStyles)
  const cardInnerConteinaerRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const { t } = useTranslation()
  const windowSize = useWindowSize()
  // useEffect(() => {
  //     console.log('width task ::: dynamicStyles', dynamicStyles)
  // } ,[dynamicStyles])

  useEffect(()=>{ 
    // console.log('width task ::: useEffect from hotelscard triggered ')


      let hotelCardWidth = cardInnerConteinaerRef?.current?.getBoundingClientRect().width
      // console.log('width task ::: hotelCardWidth', hotelCardWidth)

      dispatch(HotelsCardWidthAction(hotelCardWidth ?? 0))
  },[windowSize
    // window.innerWidth, cardInnerConteinaerRef?.current?.getBoundingClientRect().width
  ])

  let rate = data && data.main.ratings && data.main?.ratings[1].score.split(" ")[0].split(".")[0];
  let ratingStr = category && category.split(" ")[0];
  let rating = data.main.ratings ? Number(rate) : Number(ratingStr);

  const currency = useCurrencyPicker(activeCurrency);

  let defaultGuest = {
    rooms: 1,
    adults: 2,
    children: 0,
  };

  // TODO: static dates
  let date = (new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)));
  let newDate = (new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000)));
  
  const departureDate = {
    date: formatDate(date)
  };

  const returnDate = {
    date: formatDate(newDate)
  };

  useEffect(() => {
    if (providerCode) {
      dispatch(
        hotelByProvider(providerCode)
      )
    }
  }, [activeTab]);

  if (hotelInfo) console.log({ hotelInfo });

  const distributions = defaultGuest.adults + "-" + defaultGuest.children;

  const handleHotel = (hotelId: any) => {
    if (hotelId) {
      var linkToBooking = urlBaseHotel + "&distribution=" + distributions + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency + "&carRental=false" + "&hotelDestination=Hotel::" + hotelId + "&departureDate=" + (departureDate && departureDate.date) + "&arrivalDate=" + (returnDate && returnDate.date);
      window.open(linkToBooking, '_blank');
    }
  };

  const ratePercentage = () => {
    return rating * 20 + "%";
  };

  // TODO: image fit content for different hotels images
  const renderContent = () => {
    return (
      // <div className="">
      <div className="flex flex-col xl:flex-row space-x-0 md:space-x-2 2xl:space-x-5 items-stretch">
        <div className="flex-1 min-w-[230px]" ref={cardInnerConteinaerRef} >
          <div className=" min-h-[545px] pb-8 bg-white relative rounded-2xl border border-[rgba(56,_66,_178,_0.2)] dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow">
            <a>
              <img className="w-full max-h-52 rounded-t-xl" src={(imageUrls && imageUrls[0]) ?? hotel } alt="product image" />
            </a>
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
              <div className="">
                <div className="relative">
                  <div className="relative  sm:overflow-hidden">
                    <div className="hidden sm:block">
                      <div className="border-b border-gray-200">
                        <nav
                          className="-mb-px flex"
                          aria-label="Tabs"
                        >
                          <a
                            onClick={() => setActiveTab('hotel')}
                            className={`whitespace-nowrap flex-1 flex flex-row justify-center space-x-2
                                                nav-link
                                                border-x-0 border-t-0 border-b-2 border-transparent
                                                px-6
                                                py-3
                                                focus:border-transparent ${activeTab == 'hotel' ? 'border-b-[#3944B3] dark:border-b-[#fff]' : 'bg-[#F4F8FF] border-transparent'}`}
                          >
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6364_23412)">
                                  <mask id="mask0_6364_23412" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                                    <rect width="48" height="48" fill="#D9D9D9" />
                                  </mask>
                                  <g mask="url(#mask0_6364_23412)">
                                    <path d="M6.275 16.65H7.275V15.1H16.725V16.65H17.725V12.825C17.725 12.375 17.575 11.9833 17.275 11.65C16.975 11.3167 16.6 11.125 16.15 11.075V9.5C16.15 9.05 15.9958 8.66667 15.6875 8.35C15.3792 8.03333 15 7.875 14.55 7.875H9.45C9 7.875 8.62083 8.03333 8.3125 8.35C8.00417 8.66667 7.85 9.05 7.85 9.5V11.075C7.4 11.125 7.025 11.3167 6.725 11.65C6.425 11.9833 6.275 12.375 6.275 12.825V16.65ZM7.275 14.075V12.825C7.275 12.5917 7.35 12.4042 7.5 12.2625C7.65 12.1208 7.84167 12.05 8.075 12.05H15.925C16.1583 12.05 16.35 12.1208 16.5 12.2625C16.65 12.4042 16.725 12.5917 16.725 12.825V14.075H7.275ZM8.85 11.05V9.2C8.85 9.11667 8.87917 9.04583 8.9375 8.9875C8.99583 8.92917 9.075 8.9 9.175 8.9H14.825C14.925 8.9 15.0042 8.92917 15.0625 8.9875C15.1208 9.04583 15.15 9.11667 15.15 9.2V11.05H8.85ZM3.95 21.5C3.55 21.5 3.20833 21.3583 2.925 21.075C2.64167 20.7917 2.5 20.45 2.5 20.05V3.95C2.5 3.55 2.64167 3.20833 2.925 2.925C3.20833 2.64167 3.55 2.5 3.95 2.5H20.05C20.45 2.5 20.7917 2.64167 21.075 2.925C21.3583 3.20833 21.5 3.55 21.5 3.95V20.05C21.5 20.45 21.3583 20.7917 21.075 21.075C20.7917 21.3583 20.45 21.5 20.05 21.5H3.95ZM3.95 20.375H20.05C20.1333 20.375 20.2083 20.3417 20.275 20.275C20.3417 20.2083 20.375 20.1333 20.375 20.05V3.95C20.375 3.86667 20.3417 3.79167 20.275 3.725C20.2083 3.65833 20.1333 3.625 20.05 3.625H3.95C3.86667 3.625 3.79167 3.65833 3.725 3.725C3.65833 3.79167 3.625 3.86667 3.625 3.95V20.05C3.625 20.1333 3.65833 20.2083 3.725 20.275C3.79167 20.3417 3.86667 20.375 3.95 20.375Z" fill={activeTab == 'hotel' ? `${theme=='dark'?'#fff':'#3944B3'}` : '#0E123D'} />
                                  </g>
                                </g>
                                <defs>
                                  <clipPath id="clip0_6364_23412">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span className={`mt-[2.5px] font-poppins font-normal text-[14px] ${activeTab == 'hotel' ? 'text-[#3944B3] dark:text-[#fff]' : 'text-[#0E123D]'} leading-[21px] opacity-90`}>{t('HOTEL')}</span>
                          </a>

                          <a
                            onClick={() => setActiveTab('moreinfo')}
                            className={`whitespace-nowrap flex-1 flex flex-row justify-center space-x-2
                                                nav-link
                                                border-x-0 border-t-0 border-transparent
                                                px-6
                                                py-3
                                                border-b-2 ${activeTab == 'moreinfo' ? 'border-b-[#3944B3] dark:border-[#F4F8FF]' : 'bg-[#F4F8FF] border-transparent'}`}
                          >
                            <span>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6354_22966)">
                                  <mask id="mask0_6354_22966" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                                    <rect width="48" height="48" fill="#D9D9D9" />
                                  </mask>
                                  <g mask="url(#mask0_6354_22966)">
                                    <path d="M11.5 16.75H12.625V11H11.5V16.75ZM12 9.4C12.1833 9.4 12.3417 9.3375 12.475 9.2125C12.6083 9.0875 12.675 8.925 12.675 8.725C12.675 8.525 12.6125 8.3625 12.4875 8.2375C12.3625 8.1125 12.2 8.05 12 8.05C11.8 8.05 11.6375 8.1125 11.5125 8.2375C11.3875 8.3625 11.325 8.525 11.325 8.725C11.325 8.925 11.3875 9.0875 11.5125 9.2125C11.6375 9.3375 11.8 9.4 12 9.4ZM12 21.5C10.6833 21.5 9.45 21.25 8.3 20.75C7.15 20.25 6.14583 19.5708 5.2875 18.7125C4.42917 17.8542 3.75 16.85 3.25 15.7C2.75 14.55 2.5 13.3167 2.5 12C2.5 10.6833 2.75 9.44583 3.25 8.2875C3.75 7.12917 4.42917 6.125 5.2875 5.275C6.14583 4.425 7.15 3.75 8.3 3.25C9.45 2.75 10.6833 2.5 12 2.5C13.3167 2.5 14.5542 2.75 15.7125 3.25C16.8708 3.75 17.875 4.425 18.725 5.275C19.575 6.125 20.25 7.12917 20.75 8.2875C21.25 9.44583 21.5 10.6833 21.5 12C21.5 13.3167 21.25 14.55 20.75 15.7C20.25 16.85 19.575 17.8542 18.725 18.7125C17.875 19.5708 16.8708 20.25 15.7125 20.75C14.5542 21.25 13.3167 21.5 12 21.5ZM12.025 20.375C14.3417 20.375 16.3125 19.5583 17.9375 17.925C19.5625 16.2917 20.375 14.3083 20.375 11.975C20.375 9.65833 19.5625 7.6875 17.9375 6.0625C16.3125 4.4375 14.3333 3.625 12 3.625C9.68333 3.625 7.70833 4.4375 6.075 6.0625C4.44167 7.6875 3.625 9.66667 3.625 12C3.625 14.3167 4.44167 16.2917 6.075 17.925C7.70833 19.5583 9.69167 20.375 12.025 20.375Z" fill={activeTab == 'moreinfo' ? theme=='dark'? '#fff':'#3944B3' : '#0E123D'} />
                                  </g>
                                </g>
                                <defs>
                                  <clipPath id="clip0_6354_22966">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <span className={`mt-[2.5px] font-poppins font-normal text-[14px] ${activeTab == 'moreinfo' ? 'text-[#3944B3] dark:text-[#fff]' : 'text-[#0E123D]'} leading-[21px] opacity-90`}>
                              {t('MORE_INFO')}
                            </span>
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="absolute right-0 top-64 bg-[#F75847] bg-opacity-10 rounded-tl-md rounded-bl-md text-xs py-[6px] px-[10px] text-[#F75847] flex items-center"> 
            <LocationIcon className="w-3 mr-2" />
             paris 
            </div> */}
          
            <div className="pl-5 mt-4">
              {
                activeTab == 'hotel' ?
                  <div className="space-y-2">
                    <div className="w-full flex justify-between items-center">

                    <a className="">
                      <span className="text-sm font-semibold  text-gray-900 dark:text-white"> {hotelname ?? name} </span>
                    </a>
                    {
                    HotelDestination?.name &&
                    <div className=" bg-[#F75847] dark:bg-transparent dark:text-[#fff] dark:border-[1px] dark:border-[#fff] bg-opacity-10 rounded-tl-md rounded-bl-md text-xs py-[6px] px-[10px] text-[#F75847] flex items-center"> 
                      <LocationIcon className="w-3 mr-2" />
                      {HotelDestination.name} 
                    </div>
                    }
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                      {
                        isNumber(rating) &&
                        [...Array(rating)].map((rate: number) => (
                          <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ))
                      }
                      {
                        isNumber(rating) &&
                        [...Array(5 - rating)].map((rating) => (
                          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.04894 1.92705C6.3483 1.00574 7.6517 1.00574 7.95106 1.92705L8.5716 3.83688C8.70547 4.2489 9.08943 4.52786 9.52265 4.52786H11.5308C12.4995 4.52786 12.9023 5.76748 12.1186 6.33688L10.494 7.51722C10.1435 7.77187 9.99681 8.22323 10.1307 8.63525L10.7512 10.5451C11.0506 11.4664 9.9961 12.2325 9.21238 11.6631L7.58778 10.4828C7.2373 10.2281 6.7627 10.2281 6.41221 10.4828L4.78761 11.6631C4.0039 12.2325 2.94942 11.4664 3.24878 10.5451L3.86932 8.63526C4.00319 8.22323 3.85653 7.77186 3.50604 7.51722L1.88144 6.33688C1.09773 5.76748 1.50051 4.52786 2.46923 4.52786H4.47735C4.91057 4.52786 5.29453 4.2489 5.4284 3.83688L6.04894 1.92705Z" fill="white" stroke="#FFC93E" />
                          </svg>
                        ))
                      }
                      <span className="text-xs mr-2 px-2.5 py-0.5 ml-3 dark:text-white">{t('HOTELS_CARD.EXCEPTIONAL')}</span>
                    </div>
                    <div className="font-poppins font-light text-[12px] text-[#000000] dark:text-[#F4F8FF] leading-[20px]">
                      <span className="">{typeof address == 'object' ? (address.locationName + ',' + address.country) : address} </span>
                    </div>
                    
                  </div> :
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <span className="text-[12px] text-[#0E123D] font-medium leading-[18px] dark:text-[#F4F8FF]"> Description </span>
                      <span className="text-[12px] text-[#666666] font-poppins font-normal leading-[18px] line-clamp-3 dark:text-[#F4F8FF]">{description ?? (hotelInfo?.descriptions && hotelInfo?.descriptions[0] && hotelInfo?.descriptions[0].description.replace(/<\/?[^>]+(>|$)/g, ""))}</span>
                    </div>

                    <div className="mt-2 flex flex-col space-y-2">
                      <span className="text-[12px] text-[#0E123D] font-medium leading-[18px] dark:text-[#F4F8FF]">Hotel Services </span>
                      <div className="flex flex-row space-x-4">
                        {
                          HOTEL_SERVICES?.map((service: any) => (
                            otherServices.includes(service.name) &&
                            <div className="p-0 w-[40px] h-[40px] rounded-[10px] bg-[#F4F8FF]">
                              <span className="flex items-center justify-center mt-3">{service.icon}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
              }
              {/* activeTab */}
              {activeTab == 'hotel' ?
                <div className="relative  w-[100%] h-32 flex mt-5  rounded-xl pt-2 pr-5">
                 
                 <ThirdPartyRatingCard ratings={ratings}/>
                  
                </div>
                :
                ''}

            </div>
            <div className={`px-5 pb-3 w-[100%] flex justify-center items-center `}>
              <div className="absolute bottom-4 px-5  w-[100%] flex justify-between text-neutral-500 dark:text-neutral-400 text-sm ">
                <ButtonSecondary onClick = { () => handleHotel(id) } className="xs:min-w-[230px] sm:min-w-[130px] !leading-none ml-92 !rounded-[10px] group border border-[#3944B3] dark:border-white dark:hover:border-[#3944B3] hover:border-[#F75847] md:w-full !h-[38px] lg:w-[167px] lg:!h-[40px] mt-[18px] mr-5 xl:mr-1 group">
                  <span className="text-[#3944B3] dark:text-[#fff] font- poppins font-medium group-hover:text-[#F75847]  dark:group-hover:text-[#3944B3] w-full uppercase whitespace-nowrap">{t('HOTELS_CARD.RESERVE_NOW')}</span>
                  <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-white dark:group-hover:text-[#3944B3] group-hover:text-[#F75847]"></i>
                </ButtonSecondary>
                <div className='flex flex-col mt-4'>
                  <span className='font-poppins font-normal text-[12px] text-[#3944B3] leading-[18px] dark:text-[#F4F8FF]'>{t('HOTELS_CARD.SINCE')}</span>
                  <span className='font-poppins  font-bold text-[20px] text-[#3842B2] leading-[24px] whitespace-nowrap dark:text-[#F4F8FF]'>
                    { basePrice ?? '100' } { currency }
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[230px] mt-6 xl:mt-0">
          <div className="grid grid-col-1 space-y-2">
            <span className="font-poppins font-normal text-[20px] text-[#3944B3] leading-[30px] dark:text-[#fff]">Featured</span>
           
            <span className="text-[#666666] font-poppins text-xs dark:text-[#fff]">Contrary to popular belief Ipsum is not.</span>
          </div>

          <div className="h-[88%] flex flex-col justify-between space-y-4 xl:space-y-0 mt-2">
            {data?.subHotels && data?.subHotels?.map((hotel: any) => <StaticHotelCard data = { hotel } onStaticClick = {(hotelId: any) => handleHotel(hotelId) } currency = { currency } />)}
          </div>
        </div>
      </div>

    );
  };
  return (
    <div
      className={`hotel-card  relative bg-white dark:bg-neutral-900 dark:border-neutral-800  mt-8 xl:mt-0 ${className}`}
    >
      {renderContent()}
    </div>
  );
};

export default HotelIdeaCard;
