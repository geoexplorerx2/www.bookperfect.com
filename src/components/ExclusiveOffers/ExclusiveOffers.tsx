import React, { FC, useState } from 'react'
import { Book2 } from 'tabler-icons-react';
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'
import arrowRight from '../../images/arrowRight.svg';
import book1 from '../../images/book2.png';
import book4 from '../../images/book4.png';
import book5 from '../../images/book5.png';
import file from '../../images/file.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExclusiveOfferContent from './ExclusiveOfferContent';
import { useSelector } from 'react-redux';
import ExclusiveOffersHead from './ExclusiveOffersHead';

interface ExclusiveOffersProps {
  data?: any;
  statictext?: any;
  displayType?: string;
  showMobileNavigationButtons?: Boolean;

};

const NextArrow = () => {
  return (
    <>
      <span></span>
    </>
  )
};

const PrevArrow = () => {
  return (
    <>
      <span></span>
    </>
  )
};

const ExclusiveOffers: FC<ExclusiveOffersProps> = ({ data, statictext, displayType = '', showMobileNavigationButtons = false }) => {
  const [active, setActive] = useState<any>()
  const [item, setItem] = useState<any>(1)
  const [selectedTab, setSelectedTab] = useState();
  const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles)
  const LayoutReducer = useSelector((state: any) => state.LayoutReducer.status);
  const pathname = window.location.pathname.split('/')[1];

  const slider = React.useRef<Slider>(null);
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  const EXCLUSIVE_OFFERS_DATA = data && selectedTab && selectedTab != 'Best Offers' ? data.filter((offer: any) => offer.field_offer_promo_code !== '' && (offer.field_offer_category.length > 0 && offer.field_offer_category[0]?.name == selectedTab)) : data;

  const renderContent = (data: any) => {
    return <ExclusiveOfferContent data={data} />
  };
  const LayoutFix = (__pathname: any, __LayoutReducer: any) => {
    let __value = null;
    if (__pathname == '/offers' || __pathname == '/' || __pathname == '/hotels') {
      if (__LayoutReducer == 'multiStop') __value = 'mt-[150px]';
      if (__LayoutReducer == 'addTransport0') __value = 'mt-[300px]';
      if (__LayoutReducer == 'addTransport1') __value = 'mt-[380px]';
      if (__LayoutReducer == 'addTransport2') __value = 'mt-[450px]';
      if (__LayoutReducer == 'addTransport-1') __value = 'mt-[220px]';
      if (__LayoutReducer == 'accom0') __value = 'mt-[5px]';
      if (__LayoutReducer == 'accom1') __value = 'mt-[20px]';
      if (__LayoutReducer == 'accom2') __value = 'mt-[20px]';
      if (__LayoutReducer == 'accom3') __value = 'mt-[20px]';
      if (__LayoutReducer == 'Transfers') __value = 'mt-[0px]';
      if (__LayoutReducer == 'Rent a Car') __value = 'mt-[0px]';
    }
    return __value;
  }

  return (
    <div className={`w-[100%] px-5 xl:px-[10vw] ${LayoutFix(window.location.pathname, LayoutReducer)}`}>
      <div className='w-[100%]' >
        <ExclusiveOffersHead
          onSelectedTab={(tab: any) => setSelectedTab(tab)}
          statictext={statictext}
          displayType={displayType}
          pathname={pathname}
        />
        {
          displayType != 'all' ?
            <div className='w-[100%] relative flex justify-center items-center mt-3 md:mt-[12px]'>
              <div className='hidden xl:inline-flex items-center justify-center w-10 h-10 cursor-pointer  absolute left-0 z-10 -translate-x-[120%] top-[40%] bg-white dark:bg-transparent border border-neutral-200 rounded-full' onClick={() => slider?.current?.slickPrev()}>
                <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" />
              </div>
              <div className={`w-full ${EXCLUSIVE_OFFERS_DATA.length > 0 ? 'h-full' : 'h-[247px]'}`}>
                <Slider {...settings} ref={slider}>
                  {
                    EXCLUSIVE_OFFERS_DATA && EXCLUSIVE_OFFERS_DATA?.map((item: any, index: any) => {
                      return (
                        <>
                          {renderContent(item)}
                        </>
                      )
                    })
                  }
                  <div></div>
                  <div></div>
                </Slider>
              </div>
              <div onClick={() => slider?.current?.slickNext()} className='hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute right-0 top-[40%] z-10 translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full'>
                <Arrow className='rotate-180 right-arrow w-4 h-4 text-[#101828] dark:text-white' />
              </div>
              {
                showMobileNavigationButtons && (
                  <div className={`md:hidden w-full absolute -bottom-[3.75rem] flex justify-center space-x-2  h-10`}>
                    <div className='flex items-center justify-center w-10 h-10 cursor-pointer left-0 z-10 top-[40%] bg-white dark:bg-transparent border border-neutral-200 rounded-full' onClick={() => slider?.current?.slickPrev()}>
                      <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" />
                    </div>
                    <div onClick={() => slider?.current?.slickNext()} className='flex justify-center items-center w-10 h-10 cursor-pointer right-0 top-[40%] z-10 bg-white dark:bg-transparent border border-neutral-200 rounded-full'>
                      <Arrow className='rotate-180 right-arrow w-4 h-4 text-[#101828] dark:text-white' />
                    </div>
                  </div>
                )
              }

            </div> :
            <div className='grid grid-cols-1 gap-3 mt-3 md:mt-5 md:gap-[14px] sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 min-h-[400px]'>
              {
                EXCLUSIVE_OFFERS_DATA && EXCLUSIVE_OFFERS_DATA?.map((item: any, index: any) => {
                  return (
                    <>
                      {renderContent(item)}
                    </>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}

export default ExclusiveOffers;