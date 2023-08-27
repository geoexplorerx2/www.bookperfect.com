import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";

import hotel from "../../images/hotel.png";
import popularhotel from "../../images/popularhotel.png";

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
export interface HotelCardProps {
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

const HotelCard: FC<HotelCardProps> = ({
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
    ratings
  } = data;

  // console.log({data});
  let words = hotelname?.split(" ").slice(0,3).join(" ");

  const dispatch = useDispatch();
  const [sourceMarket, setSourceMarket] = useState<any>('UK');
  const [destination, setDestination] = useState<any>(hotelname);
  const [searchedHotels, setSearchedHotels] = useState<any>();
  const [activeTab, setActiveTab] = useState<any>('hotel');

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const hotelInfo: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.hotelinfo);

  let rate = data && data.ratings && data?.ratings[1].score.split(" ")[0].split(".")[0];
  let ratingStr =  category && category.split(" ")[0];
  let rating = data.ratings ? Number(rate) : Number(ratingStr);
  
  
  let defaultGuest = {
    rooms: 1,
    adults: 2,
    children: 0,
  };

  // TODO: dynamic dates
  let date = new Date();
  let newDate = (new Date(date.getTime()+(5*24*60*60*1000)));

  const departureDate =  {
      date: formatDate(date)
  };

  const returnDate = {
    date: formatDate(newDate)
  };

  const destinationCountries: any[] = [];
  // useEffect(() => {
  //   $.ajax({
  //     url: BASE_URL_HOME + "/jsonp/locationSearch?callback=?&tripType=ONLY_HOTEL",
  //     dataType: "jsonp",
  //     data: {
  //         query: hotelname?.split(" ").slice(0,3).join(" "),
  //         micrositeId: 'bookperfect',
  //         languageId: 'EN',
  //         destinationCountries: destinationCountries
  //     },
  //     success: function (data: any) {
  //         if (!$.isEmptyObject(data)) {
  //           console.log(data);
  //           setSearchedHotels(data);
  //         }
  //     }
  //  })
  // }, [destination]);


  useEffect(() => {
    if(providerCode){
      dispatch(
        hotelByProvider(providerCode)
      )
    }
  }, [activeTab]);
  
  if(hotelInfo) console.log({hotelInfo});

  const distributions = defaultGuest.adults+"-"+defaultGuest.children;

  const handleHotel = () => {
    if(id) {
      var linkToBooking = urlBaseHotel + "&distribution=" + distributions + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket +"&displayCurrency=" + activeCurrency +"&carRental=false" + "&hotelDestination=Hotel::" + id + "&departureDate=" + (departureDate && departureDate.date) + "&arrivalDate=" + (returnDate && returnDate.date);
      window.open(linkToBooking, '_blank');
    }
  };

  // TODO: image fit content for different hotels images
  const renderContent = () => {
    return (
        <div className="w-[100%] h-[100%] bg-white rounded-2xl border border-[rgba(56,_66,_178,_0.2)] dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow">

            { cardType != 'popular-hotels' ?
              <>
                <a>
                  <img className="w-full max-h-[25vh] rounded-xl" src={imageUrls ? imageUrls[0] : hotel} alt="product image" />
                </a>

                {/* hotels tabs will be design from figma */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-3 ">
                  <div className="p-6">
                    <div className="relative">
                      <div className="relative  sm:overflow-hidden">
                        {/* <div className="pb-3"> */}
                          <div className="hidden sm:block">
                            <div className="border-b border-gray-200">
                              <nav
                                className="-mb-px flex space-x-40 overflow-x-auto"
                                aria-label="Tabs"
                              >
                                <a onClick={() => setActiveTab('hotel')} className={`whitespace-nowrap flex px-1 border-b-2 font-medium text-sm ${activeTab == 'hotel' ? 'border-[#F75847]' : 'border-transparent'} text-gray-500 hover:text-gray-700 hover:border-gray-200`}>
                                    Hotel
                                </a>

                                <a onClick={() => setActiveTab('moreinfo')}  className={`whitespace-nowrap flex px-1 border-b-2 font-medium text-sm ${activeTab == 'moreinfo' ? 'border-[#F75847]' : 'border-transparent'} text-gray-500 hover:text-gray-700 hover:border-gray-200`}>
                                    More infos
                                </a>
                              </nav>
                            </div>
                          </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-5 pb-5">
                  {
                    activeTab == 'hotel' ?
                     <>
                      <a>
                          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"> { hotelname ?? name } </h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        {
                          isNumber(rating) &&
                          [...Array(rating)].map((rate: number) =>  (
                              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          ))
                        }
                        {
                          isNumber(rating) &&
                          [...Array(5 - rating)].map((rating) => (
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.04894 1.92705C6.3483 1.00574 7.6517 1.00574 7.95106 1.92705L8.5716 3.83688C8.70547 4.2489 9.08943 4.52786 9.52265 4.52786H11.5308C12.4995 4.52786 12.9023 5.76748 12.1186 6.33688L10.494 7.51722C10.1435 7.77187 9.99681 8.22323 10.1307 8.63525L10.7512 10.5451C11.0506 11.4664 9.9961 12.2325 9.21238 11.6631L7.58778 10.4828C7.2373 10.2281 6.7627 10.2281 6.41221 10.4828L4.78761 11.6631C4.0039 12.2325 2.94942 11.4664 3.24878 10.5451L3.86932 8.63526C4.00319 8.22323 3.85653 7.77186 3.50604 7.51722L1.88144 6.33688C1.09773 5.76748 1.50051 4.52786 2.46923 4.52786H4.47735C4.91057 4.52786 5.29453 4.2489 5.4284 3.83688L6.04894 1.92705Z" fill="white" stroke="#FFC93E"/>
                            </svg>
                          ))
                        }
                        <span className="text-xs mr-2 px-2.5 py-0.5 ml-3 dark:text-white">Exceptional</span>  
                      </div>
                      <div className="flex">
                        <div className="">
                          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.875 9.34375H7.1875V18.6875H2.875C2.68438 18.6875 2.50156 18.6118 2.36677 18.477C2.23198 18.3422 2.15625 18.1594 2.15625 17.9688V10.0625C2.15625 9.87188 2.23198 9.68906 2.36677 9.55427C2.50156 9.41948 2.68438 9.34375 2.875 9.34375V9.34375Z" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.1875 9.34375L10.7812 2.15625C11.5437 2.15625 12.275 2.45915 12.8142 2.99832C13.3533 3.53748 13.6562 4.26875 13.6562 5.03125V7.1875H19.2176C19.4214 7.187 19.623 7.23012 19.8088 7.31397C19.9945 7.39782 20.1602 7.52045 20.2947 7.67364C20.4292 7.82682 20.5293 8.00701 20.5883 8.2021C20.6474 8.39718 20.664 8.60264 20.6371 8.80469L19.559 17.4297C19.5154 17.7759 19.3473 18.0945 19.0861 18.3259C18.8249 18.5574 18.4884 18.6859 18.1395 18.6875H7.1875" stroke="#F75847" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                         
                        </div>
                        <div className="text-[14px] dark:text-white">
                          Free cancellation
                        </div>
                      </div>
                     </> : 
                     <>
                     <div className="text-[12px] line-clamp-3">
                      <span className="text-[14px] font-semibold"> Description : </span> { description ?? (hotelInfo?.descriptions && hotelInfo?.descriptions[0] && hotelInfo?.descriptions[0].description.replace(/<\/?[^>]+(>|$)/g, "") )} 
                     </div>
                     
                     <div className="mt-2">
                      <span className="text-[14px] font-semibold">Hotel Services : </span>
                     </div>
                     </>
                  }

                    <div className="flex mt-4 items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                        <span className="">{typeof address == 'object' ?  (address.locationName + ',' + address.country) : address} </span>
                        <a onClick={() => handleHotel()}><i className="ml-3 las la-arrow-right text-xl absolute right-3"></i></a>
                    </div>
                </div> 

                
                </>  :
                
                <>
                    <a href="">
                      <img className="w-full" src={popularhotel} alt="product image" />
                    </a>
                    <div className="px-5 pb-6 mt-4">
                        <div className="flex items-center space-x-6">
                            <div className="flex-1 min-w-4">
                            {/* <TravelBetweenWrapper> */}
                                <p className="text-sm font-bold text-gray-500 truncate dark:text-gray-400">
                                Last Vegas                          
                                </p>
                            {/* </TravelBetweenWrapper> */}
                            {/* <DatesBetweenWrapper> */}
                                <p className="text-xs font-small text-gray-900 truncate dark:text-white">
                                USA
                                </p>
                            {/* </DatesBetweenWrapper> */}
                            </div>
                            {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            
                            </div> */}
                            <div className="min-w-0 text-end">
                            <PriceWrapper>
                                {/* <p className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"> */}
                                $410
                                {/* </p>  */}
                            </PriceWrapper>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400 text-end">                          
                                Price per night                     
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
  };
  return (
    <div className={`hotel-card group relative bg-white dark:bg-neutral-900 dark:border-neutral-800 ${className}`}>
      {/* <Link to={href}> */}
        { renderContent() }
      {/* </Link> */}
    </div>
  );
};

export default HotelCard;
