import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import { StayDataType } from "../../data/types";
import ActivitiesCard from "../StayCard/ActivitiesCard";
import FlightCard from "../StayCard/FlightCard";
import HotelCard from "../StayCard/HotelCard";
import StayCard from "../StayCard/StayCard";
import TopSearchResultHeader from "./TopSearchResultHeader";
import { useHistory as useHistoryHook } from 'react-router-dom'
import { TopActivities } from "../../data/TopActivities";
import { SPECIAL_TICKET } from "../../constants/triptypes";
import { urlBaseActivities } from "../HeroInputSearch/ActivitiesSearchForm";
import { formatDate } from "../../common/formatDate";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'

interface TopSearchResultProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  style?: object;
  showMoreButton?: boolean;
  listing?: number;
  searched?: string;
  cols?: number;
  cardType?: string;
  customStyles?: string;
  moreBtn?: string;
  isPopularHotelsSection?:boolean
  data?: any;
  ideasModel?: any;
  cardWidth?: number;
  isSlider?: boolean;
  showSliderButtonsForDesktop?: boolean;
  showSliderButtonsForMobile?: boolean;

};

const TopSearchResult: FC<TopSearchResultProps> = ({
  // stayListings = DEMO_DATA,
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
  style,
  showMoreButton,
  listing = 8,
  searched = 'flight',
  cols= 4,
  cardType,
  customStyles = "",
  moreBtn,
  isPopularHotelsSection,
  data = DEMO_STAY_LISTINGS,
  ideasModel = "",
  cardWidth,
  isSlider = false,
  showSliderButtonsForDesktop = true,
  showSliderButtonsForMobile = true
}) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const themeMode: any = useSelector((state: any) => state.LightMode.mode);

  // limit demo stay listing
  // const TOP_DATA: any = searched == 'activities' ? TopActivities : ( data && data?.filter((_: any, i: any) => i < listing) ) ;
  const TOP_DATA: any = data && data?.filter((_: any, i: any) => i < listing);

  let history = useHistoryHook();
  let isActivitiesPage = history.location.pathname == '/activities';

  // TODO: dynamic dates
  let date = (new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)));
  let newDate = (new Date(date.getTime() + (15 * 24 * 60 * 60 * 1000)));

  const departure = {
    date: formatDate(date)
  };

  const returned = {
    date: formatDate(newDate)
  };

  const defaultActivitiesDestination = {
    id: "Destination::IST"
  };

  // TODO: design flight card
  const renderCard = (stay: any) => {
    switch (searched) {
      case 'flight':
        return <FlightCard data = { stay } />
      case 'hotel':
        return <HotelCard cardType = { cardType } data = { stay } />  
      case 'activities':
        return <ActivitiesCard data = { stay } cardWidth={cardWidth}/>  
      default:
        break;
    }
    return <StayCard key = { stay.id } data = { stay } />;
  };

  const handleMore = () => {
    switch (searched) {
      case 'activities':
        var linkToAllActivities = urlBaseActivities + "&destination=" + defaultActivitiesDestination.id + "&departureDate=" + departure.date + "&arrivalDate=" + returned.date + "&distribution=2-0"+ "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
        window.open(linkToAllActivities, '_blank');
        break;
    
      default:
        break;
    }
  };

  const slider = React.useRef<Slider>(null);

  const settings = {
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    infinite: true,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
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
                slidesToScroll: 1,
                
            }
        }
    ],
};


  return (
    <div className={`cheapest-flights mx-5 md:mx-[10vw] relative ${customStyles}`}>
      {
        ideasModel !== "travelguidecitydeals" &&
        <TopSearchResultHeader
          onClick={ handleMore }
          subHeading={subHeading}
          heading={heading}
          showMoreButton = {showMoreButton}
          moreBtn = { moreBtn }
          isPopularHotelsSection
          headingWrapperClassNames="md:!text-[32px]"
          subheadingClassNames="md:!text-lg !mt-1"
        />
      }

      <div></div>
     {isSlider 
            ?  
            <>
              <div onClick={() => slider?.current?.slickPrev()} className={`hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute left-0 top-1/2 z-10 -translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full ${!showSliderButtonsForDesktop && '!hidden'}`}> <Arrow className="arrow-left w-4 h-4 text-[#101828] dark:text-white" /></div>
              <div className='w-full md:w-full h-full'>
                  <Slider {...settings} ref={slider}>
                      
                    {  TOP_DATA && TOP_DATA?.map((top_data: any) => renderCard(top_data) ) } 
                    <div></div>
                    <div></div>
                            
                  </Slider>
              </div>
              <div className={`hidden xl:inline-flex justify-center items-center w-10 h-10  cursor-pointer absolute right-0 top-1/2 z-10 translate-x-[120%] bg-white dark:bg-transparent border border-neutral-200 rounded-full ${!showSliderButtonsForDesktop && '!hidden'}`} onClick={() => slider?.current?.slickNext()}><Arrow className="arrow-left rotate-180 w-4 h-4 text-[#101828] dark:text-white" /></div>
            </>
            :
            <div
              className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${cols} ${gridClass}`}
            > 
              { TOP_DATA && TOP_DATA?.map((top_data: any) => renderCard(top_data) ) }
            </div>
      
    }

            {
              showSliderButtonsForMobile &&  
                    <div className='mobile_buttons absolute bottom-0 translate-y-[120%] w-full flex justify-center'>
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

    </div>
  );
};



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


export default TopSearchResult;

