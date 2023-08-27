import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isNumber } from 'react-simple-timefield';
import { TranslateIfExists } from '../../helpers';
import LocationIcon from '../../images/icons/locationIcon';
import { urlBaseHotel } from '../HeroInputSearch/HotelsSearchForm';
import { useTranslation } from 'react-i18next';
interface StaticHotelCardProps {
  data?: any;
  onStaticClick?: (event: any) => void;
  currency?: string;
};

const StaticHotelCard: FC<StaticHotelCardProps> = ({data, onStaticClick, currency}) => {
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
    destination
  } = data;
  
  let rate = data && data.ratings && data?.ratings[1].score.split(" ")[0].split(".")[0];
  let ratingStr = category && category.split(" ")[0];
  let rating = data.ratings ? Number(rate) : Number(ratingStr);
  // @ts-ignore
  const {t} = useTranslation()

  return (
    <div className='hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] rounded-[10px] w-full mr-2 h-[106px] relative cursor-pointer border-2 dark:border-[#fff] border-[rgba(56,_66,_178,_0.2)]' onClick={() => onStaticClick && onStaticClick(id)}>
        <div className='flex flex-row justify-between' >
            <div className='basis-3/4'>
                <div className='space-y-[5px] ml-4'>
                    <span className='mt-2 font-poppins font-medium text-[14px] text-[#0E123D] leading-[21px] line-clamp-2 dark:text-[#fff]'>{name}</span>
                    <span className='flex items-center mt-2.5 mb-5'>
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
                    </span>
                    <span className='font-poppins font-light text-[12px] text-[#000000] dark:text-[#fff] leading-[20px] line-clamp-1'>
                      {typeof address == 'object' ? (address.locationName + ',' + address.country) : address}
                    </span>
                </div>
            </div>
            <div className='h-full flex flex-col justify-between mt-2'>
            {
                    destination?.name &&
                    <div className=" bg-[#F75847] dark:text-[#f8f4ff] dark:bg-[transparent] dark:border-t-[1px] dark:border-b-[1px] dark:border-l-[1px] dark:border-[#f8f4ff]  bg-opacity-10 rounded-tl-md rounded-bl-md text-xs py-[6px] px-[10px] text-[#F75847] flex items-center"> 
                      <LocationIcon className="w-3 mr-2 " />
                     <span className='line-clamp-1'>
                       {destination.name} 
                      </span>
                    </div>
                    }
                <div className='flex flex-col mt-5 text-center'>
                    <span className='font-poppins font-normal text-[12px] text-[#3944B3] leading-[18px] dark:text-[#f4f8ff]'>{t('HOTELS_CARD.SINCE')}</span>
                    <span className='font-poppins font-medium text-[16px] text-[#3842B2] leading-[24px] dark:text-[#f4f8ff]'>
                      { basePrice } { currency }
                    </span>
                </div>
            </div>

        </div>
        <div className='w-11/12 h-[3px] absolute left-1/2 -translate-x-1/2 bottom-0 mx-auto  bg-[#28C46F] rounded-t-sm'></div>
    </div>
  )
}

export default StaticHotelCard;