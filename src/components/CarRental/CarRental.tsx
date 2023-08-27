import React, { FC, useEffect, useMemo, useState } from 'react'
import arrowLeft from '../../images/arrowLeft2.svg';
import arrowRight from '../../images/arrowRight2.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Car1 from '../../images/car1.svg';
import LikeSVG from '../../images/like.svg';
import People from '../../images/peopel.svg';
import bag from '../../images/bag.svg';
import CarRentalHead, { MoreCarRentalButton } from './CarRentalHead';
import CarCard from './CarCard';
import { useSelector } from 'react-redux';
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'

interface CarRentalProps {
    data?: any;
    tabs?: any;
    activeTab?: any;
    statictext?: any;
    ideasModel?: any;
    cardClassNames?: string;
    cardWidth?: number;
    showHeader?: boolean;
    showSliderButtonsForDesktop?: boolean;
    showSliderButtonsForMobile?: boolean;
};

const CarRental: FC<CarRentalProps> = ({data, tabs, activeTab, statictext, ideasModel = '', cardClassNames, cardWidth, showHeader= true, showSliderButtonsForDesktop = true, showSliderButtonsForMobile = true}) => {
    const [renderTab, setRenderTabContent] = useState<any>(activeTab);
    const LightMode: any = useSelector((state: any) => state.LightMode.mode);

    const svgLeft = (color: any) => {
      return (<>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
          <g clip-path="url(#clip0_6655_20133)">
            <path d="M25 32.5L12.5 20L25 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_6655_20133">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </>)
    }
    const svgRight = (color: any) => {
      return (<>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
          <g clip-path="url(#clip0_6655_20136)">
            <path d="M15 32.5L27.5 20L15 7.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_6655_20136">
              <rect width="40" height="40" fill="white" transform="matrix(-1 0 0 1 40 0)" />
            </clipPath>
          </defs>
        </svg>
      </>)
    }

    const slider = React.useRef<Slider>(null);

    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1280,
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                   
                }
            }
        ],
    };

    const renderContent = (car: any) => <CarCard data={car} cardClassNames={cardClassNames} cardWidth={cardWidth}/> ;

    const RENTAL_CAR = data && data.filter((car: any) => (new Date() < new Date(car.endDate) || (new Date(car.endDate).getTime() == new Date(car.endDate).getTime())) && car.transportType == 'CAR');

    const _RENTAL_CAR = useMemo(() => {
        return ( (renderTab && renderTab.name == 'Recommended') || !tabs ? RENTAL_CAR : '' )
    }, [data, renderTab]);
    
    useEffect(() => {
        // TODO: request data for current tab / active tab
    }, [renderTab]);
    
    return (
        <div className='w-[100%] mb-16'>
          {
            ideasModel !== "travelguidecitydeals" && showHeader &&
            <CarRentalHead 
              withTabs = { tabs } 
              selectedTab = { (tab: any) => setRenderTabContent(tab)} 
              statictext = { statictext }
            />
          }
            {/* <div className='w-[100%] h-[600px] mt-5'> */}
                {/* <div className='w-[100%] h-[590px] px-[5vw] flex'> */}
                    {/* <div onClick={() => slider?.current?.slickPrev()} className='w-[5%] h-[100%] flex items-center justify-end'><img src={arrowLeft} /></div> */}
                    
                    <div className='w-[100%] h-[100%] px-5 md:px-[10vw] mt-9'>
                        <div className='w-[100%] h-[100%] relative flex flex-row'>
                          {
                            ideasModel === "travelguidecitydeals" ? showHeader &&
                            
                              _RENTAL_CAR &&
                              _RENTAL_CAR.map((item:any,index:any)=>{
                                 return (
                                     <>
                                     { renderContent(item) }
                                     </>
                                 )
                             })
                             :
                              <>
                                <div onClick={() => slider?.current?.slickPrev()} className={`hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute left-0 top-1/2 z-10 -translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full ${!showSliderButtonsForDesktop && '!hidden'}`}> <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" /></div>
                                <div className='w-full md:w-full h-full'>
                                    <Slider {...settings} ref={slider}
                                    arrows={false}>
                                        {
                                        _RENTAL_CAR &&
                                        _RENTAL_CAR.map((item:any,index:any)=>{
                                            return (
                                                <>
                                                { renderContent(item) }
                                                </>
                                            )
                                        })}
                                    </Slider>
                                </div>
                                <div className={`hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute right-0 top-1/2 z-10 translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full ${!showSliderButtonsForDesktop && '!hidden'}`} onClick={() => slider?.current?.slickNext()}><Arrow className="arrow-left rotate-180 w-4 h-4 text-[#101828] dark:text-white" /></div>
                                {
                                  showSliderButtonsForMobile &&  
                                        <div className='mobile_buttons absolute bottom-0 translate-y-[130%] w-full flex justify-center'>
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
                            </>
                         }
                        </div>
                    </div>
                         <MoreCarRentalButton wrapperClassNames='md:hidden mt-16 px-5'/>
                    {/* <div className='w-[5%] h-[100%] flex items-center' onClick={() => slider?.current?.slickNext()}><img src={arrowRight} /></div> */}
                {/* </div> */}
            {/* </div> */}
        </div>
    )
}

export default CarRental;