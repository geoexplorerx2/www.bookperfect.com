import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {FC, Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import { ToTranslationFormat } from '../../helpers';

export interface GuideHeaderProps {
  heading: any;
  subHeading?: ReactNode;
  city?: string;
}

const GuideHeader: FC<GuideHeaderProps> = ({
  subHeading = "",
  heading,
  city
}) => {
  const cityData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.citydata);
  // @ts-ignore
  const {t, i18n} = useTranslation()
  return (
    <div className="flex flex-col mb-8 relative">
      <div className="flex items-center justify-between">
        <div className="max-w-2xl">
            <div className={`font-poppins text-lg md:text-2xl font-normal`}>
                <span className='text-[#F96254]'>
                    {/* { typeof heading === "string" && heading.substring(0, Math.round(heading.length / 2)) } */}
                    {/* { heading.data.city } */}
                </span> { " " }
                <span className='text-[#3842B2] dark:text-[#fff] md:mx-3'>
                  {  heading.hasOwnProperty('title') ? ( heading.title == 'Overview' ? t('TRAVEL_GUIDE.TRAVEL_GUIDE') :
                     i18n.exists(`TRAVEL_GUIDE.${ToTranslationFormat(heading.title)}`)  
                     ?  t(`TRAVEL_GUIDE.${ToTranslationFormat(heading.title)}`)
                     :  heading.title
                     ) 
                     : heading.field_st_title } { " " }
                </span>
                <span className='text-[#F96254]'>
                  { (city && capitalizeFirstLetter(city)) ??  ( heading.city_name ) }
                </span>  { " " }
                {/* { heading.data.objective.replaceAll(heading.data.city, " ").toLowerCase() } */}
                {/* { heading.data.title.replaceAll(heading.data.title, " ").toLowerCase() } */}
               
                {/* <span className='text-[#F96254]'>
                  { cityData[0].name }
                </span>  */}
                {/* { typeof heading === "string" && heading.substring(Math.round(heading.length / 2), heading.length) } */}
            </div>

            <span style = {{fontFamily: 'Poppins', fontSize: '14px'}} className="mt-2 md:mt-2 font-normal block text-base sm:text-xs text-neutral-500 dark:text-neutral-400">
                { subHeading }
            </span>

        </div>
      </div>
    </div>
  );
};

export default GuideHeader;
