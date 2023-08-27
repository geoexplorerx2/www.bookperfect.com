import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../common/formatDate';
import { goToPage } from '../../common/goToPage';
import Heading from '../../lib/Heading/Heading';
import { urlBaseActivities } from '../HeroInputSearch/ActivitiesSearchForm';
import { urlBaseFlight } from '../HeroInputSearch/FlightSearchForm';
import { urlBaseFlightHotel } from '../HeroInputSearch/FlightsHotelsSearchForm';
import { urlBaseHotel } from '../HeroInputSearch/HotelsSearchForm';
import { urlBaseRouting } from '../HeroInputSearch/RoutingSearchForm';
import { urlBaseTransfers } from '../HeroInputSearch/TransfersSearchForm';
import PopularCard from '../StayCard/PopularCard';

interface ProductDealsProps {
  className?: string;
  isHeadingCenter?: boolean;
  subHeading?: string;
  headingWrapperClassNames?: string;
  subheadingClassNames?: string;
  headingClassNames?: string;
  heading?: string;
  data?: any;
};

const ProductDeals: FC<ProductDealsProps> = ({ data, className, isHeadingCenter, subHeading, headingWrapperClassNames = '', subheadingClassNames = '', headingClassNames, heading }) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const [sourceMarket, setSourceMarket] = useState<any>('UK');

  let date = (new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)));
  let newDate = (new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000)));

  // TODO: get user cussrent location and find departure id
  const dynamicDeparture = {
    id: 'Destination::IST',
    transfers_id: 'TransportBase::IST'
  };

  const departureDate = {
    date: formatDate(date),
    time: '09:00'
  };

  const returnDate = {
    date: formatDate(newDate)
  };

  const handleDeals = (deal: any) => {
    let dealLink;

    if(!deal.id) return;
    if(deal.id == dynamicDeparture.id) return;

    switch (deal.type) {
      case 'flights':
        dealLink = urlBaseFlight + "&destination=" + (deal && deal.id) + "&departure=" + (dynamicDeparture && dynamicDeparture.id) + "&departureDate=" + (departureDate && departureDate.date) + "&arrivalDate=" + "&roundTripFlight=false" + "&distribution=2-0" + "&businessCabin=true" + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
        goToPage(dealLink, 'redirect');
        break;
      case 'hotels':
        dealLink = urlBaseHotel + "&distribution=2-0" + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency + "&carRental=false" + "&hotelDestination=" + deal.id + "&departureDate=" + (departureDate && departureDate.date) + "&arrivalDate=" + (returnDate && returnDate.date);
        goToPage(dealLink, 'redirect');
        break;
      case 'flightshotels':
        dealLink = urlBaseFlightHotel + "&destination=" + deal.id + "&departure=" + dynamicDeparture?.id + "&departureDate=" + departureDate.date + "&arrivalDate=" + returnDate.date + "&distribution=2-0" + "&businessCabin=true" + "&lang=" + activeLang.toUpperCase() + "&sourceMarket=" + sourceMarket + "&displayCurrency=" + activeCurrency;
        goToPage(dealLink, 'redirect');
        break;
      case 'activities':
        dealLink = urlBaseActivities + "&destination=" + deal?.id + "&departureDate=" + departureDate.date + "&arrivalDate=" + returnDate.date + "&distribution=2-0" + "&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
        goToPage(dealLink, 'redirect');
        break;
      case 'transfers':
        if(!deal.transfers_id) return;
        dealLink = urlBaseTransfers + "&departure=" + dynamicDeparture?.transfers_id + "&destination=" + deal?.transfers_id + "&departureDate=" + departureDate.date + "&departureTime=08:00" + "&arrivalDate=" + "&arrivalTime=09:00" + "&distribution=2-0" + "&oneWay=true&lang=" + activeLang.toUpperCase() + "&displayCurrency=" + activeCurrency;
        goToPage(dealLink, 'redirect');
        break;
      case 'routing':
        dealLink = urlBaseRouting + "&routingType=ONLY_RENT_CAR" + "&destination=" + deal?.id + "&departure=" + (dynamicDeparture?.id || "") + "&departureDate=" + departureDate.date + "&distribution=2-0&lang=EN";
        goToPage(dealLink, 'redirect');
        break;
      default:
        return;
    }
  };

  const renderDealButton = (data: any, index: any) => {
    return (
      <div className='font-poppins font-normal text-[14px] text-[#3944B3] dark:text-white leading-[21px] cursor-pointer flex flex-row justify-between ' onClick={() => handleDeals(data)}>
        <span> {data.name} </span>
        <span className='ml-3 mt-0.5'>
          <svg width="16" height="17" viewBox="0 0 16 17" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6538_28807)">
              <path d="M2.7832 8.5H13.218" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 4L13.5 8.5L9 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_6538_28807">
                <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </div>
    );
  };

  return (
    <div className={`popular relative z-10 md:-mt-[20px] ${className}`}>

      <div className={`px-5 md:px-[10.8vw]`}>
        <Heading
          isCenter={isHeadingCenter}
          desc={subHeading}
          headingWrapperClassNames={`${headingWrapperClassNames} !text-[18px] md:!text-[32px] font-normal`}
          subheadingClassNames={`${subheadingClassNames} text-[#15173F]  text-xs sm:!text-xs lg:!text-base  `}
          className={'mb-8 text-neutral-900 dark:text-neutral-50'}
        >
          <span className={`${headingClassNames} text-[#15173F] dark:text-white text-[18px] md:text-xl lg:text-2xl xl:text-[32px] font-normal`}>{heading}</span>
        </Heading>
      </div>

      <div className='grid gap-8 xl:gap-x-24 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-5 md:px-[10.8vw] grid-container'>
        {data && data?.map((data: any, index: number) => renderDealButton(data, index))} 
      </div>
    </div>
  )
};

export default ProductDeals;