import React, { FC, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowSignLeft from '../../images/arrowSignRight.svg';
import AirportCard from '../StayCard/AirportCard';
import { useSelector } from 'react-redux';
import { goToPage } from '../../common/goToPage';
import { urlBaseTransfers } from '../HeroInputSearch/TransfersSearchForm';
import { formatDate } from '../../common/formatDate';
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'
import { useTranslation } from 'react-i18next';

interface PopularAirportsProps {
  data?: any;
  statictext?: any;
  ideasModel?: any;
  cardWidth?: number;
  showHeader?: boolean;
  showSliderButtonsForDesktop?: boolean;
  showMoreButton?: boolean;
  showSliderButtonsForMobile?: boolean;
  
};

const PopularAirports: FC<PopularAirportsProps> = ({ data, statictext, ideasModel = "", cardWidth,  showHeader = true, showSliderButtonsForDesktop = true, showMoreButton = true, showSliderButtonsForMobile = true}) => {
  const LightMode = useSelector((state: any) => state.LightMode.mode);
  const slider = useRef<Slider>(null);
  // @ts-ignore
  const {t} = useTranslation()
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  // TODO: geocode base deaprture
  const allTransfersDeparture = {
    id: "TransportBase::IST"
  };

  // TODO: geocode base destionation
  const allTransfersDestination = {
    id: "Hotel::20069"
  };

  const departureDate = formatDate(new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 4,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
         
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
         
        }
      }
    ]
  };

  const svgLeft = (color: any) => {
    return (
      <>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6655_20133)">
            <path d="M25 32.5L12.5 20L25 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_6655_20133">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </>
    )
  };
  
  const svgRight = (color: any) => {
    return (
      <>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6655_20136)">
            <path d="M15 32.5L27.5 20L15 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_6655_20136">
              <rect width="40" height="40" fill="white" transform="matrix(-1 0 0 1 40 0)" />
            </clipPath>
          </defs>
        </svg>
      </>
  )
  };

  const handleAllTransfers = () => {
    //  var allTransfersDl = "https://bookperfect.paquetedinamico.com/home?directSubmit=true&tripType=ONLY_TRANSFER&departure=TransportBase::IST&destination=Hotel::20069&departureDate=19/12/2022&departureTime=12:00&arrivalDate=&arrivalTime=&distribution=2-0-1&oneWay=true&lang=EN&displayCurrency=EUR";
    var allTransfersDl =  urlBaseTransfers + "&departure=" + allTransfersDeparture?.id + "&destination=" + allTransfersDestination?.id + "&departureDate=" + departureDate + "&departureTime=12:00" + "&arrivalDate=&arrivalTime=&distribution=2-0&oneWay=true&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
    goToPage(allTransfersDl, 'redirect');
  };

  const renderContent = (transfer: any, index: number) => <AirportCard key = { index } data={transfer} cardWidth={cardWidth} />;

  return (
    <div className='w-[100%] relative'>
      {
        ideasModel !== "travelguidecitydeals" && showHeader && 
        <div className='w-[100%] px-5 md:px-[10vw]'>
          <div className='text-[#15173F] text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[28px] font-normal dark:text-[#fff]'>{ (statictext && statictext.many_desktop_publishing_packages) ?? 'Many desktop publishing packages'}</div>
          <div className='text-[#15173F] text-xs md:text-sm xl:text-[16px] font-light mt-1 dark:text-[#fff]'>{ (statictext && statictext.many_desktop_publishing_packages_description) ?? 'There are many variations of passages of Lorem Ipsum available, but the'}</div>
        </div>
      }
      <div className='w-[100%] h-[100%] mt-5'>
        <div className={`w-[100%] h-[100%] relative px-5 md:px-[10vw] flex flex-row  ${ideasModel == "travelguidecitydeals" && "space-x-5" }`}>
          {
            ideasModel !== "travelguidecitydeals" ?
            <>          
            <div onClick={() => slider?.current?.slickPrev()} className={`absolute top-1/2 left-[9vw] -translate-x-[120%] -translate-y-1/2 hidden md:flex cursor-pointer items-center justify-end px-2 ${!showSliderButtonsForDesktop && '!hidden'}`}>{svgLeft(LightMode == 'dark' ? '#fff' : "#3944B3")}</div>
            <div className={`w-full  h-[100%]` }>
              <Slider {...settings} ref={slider}>
                {
                data &&
                data?.map((item: any, index: any) => (
                    <>
                    { renderContent(item, index) }                   
                    </>
                  )
                )}
              </Slider>
            </div>
            <div onClick={() => slider?.current?.slickNext()} className={`absolute top-1/2 right-0 -translate-x-[120%] -translate-y-1/2 hidden md:flex cursor-pointer w-[5%] items-center justify-end px-2 ${!showSliderButtonsForDesktop && '!hidden'}`}>{svgRight(LightMode == 'dark' ? '#fff' : "#3944B3")}</div>
            {
               showSliderButtonsForMobile &&  
                    <div className='mobile_buttons absolute bottom-0 -translate-x-[5vw] translate-y-[120%] w-full flex justify-center'>
                      <div className={`md:hidden w-full  bottom-0 flex justify-center space-x-2  h-10`}>
                        <div className='flex items-center justify-center w-10 h-10 cursor-pointer left-0 z-10 top-[40%] bg-white dark:bg-transparent border border-neutral-200 rounded-full' onClick={() => slider?.current?.slickPrev()}>
                          <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" />
                        </div>
                        <div onClick={() => slider?.current?.slickNext()} className='flex justify-center items-center w-10 h-10 cursor-pointer right-0 top-[40%] z-10 bg-white dark:bg-transparent border border-neutral-200 rounded-full'>
                          <Arrow className='rotate-180 right-arrow w-4 h-4 text-[#101828] dark:text-white' />
                        </div>
                      </div>
                    </div>
            }
            </> :                
            data &&
            data?.map((item: any, index: any) => (
                <>
                { renderContent(item, index) }                   
                </>
              )
            )
          }
        </div>

        {
          ideasModel !== "travelguidecitydeals" && showMoreButton &&
          <div className='w-[100%] flex justify-center'>
            <div className='w-[220px] mt-16 px-7 h-[44px] border-2 border-[#fff] flex justify-between items-center rounded-[16px] cursor-pointer blueShadow bg-[#3944B3] dark:bg-[#171926]'>
              <div className='text-[16px] h-[100%] flex items-center text-[#fff] font-normal' onClick={() => handleAllTransfers()}>{t("SEE_ALL_TRANSFERS")}</div>
              <div className='h-[100%] flex items-center'><img src={arrowSignLeft} /></div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default PopularAirports;
