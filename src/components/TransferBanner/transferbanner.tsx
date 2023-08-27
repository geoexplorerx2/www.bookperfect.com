import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { stripHtml } from '../../common/stripHtml';
import bannerBackground from '../../images/bannerBackground1.png';
import carbanner1 from '../../images/carbanner1.svg';
import carbanner2 from '../../images/carbanner2.svg';
interface CarBookingProps {
 statictext?: any;
};

const Transferbanner: FC<CarBookingProps> = ({statictext}) => {
  // @ts-ignore
  const {t} = useTranslation()
  return (
    <>
      <div className='relative w-[100%] min-h-[400px] xl:max-h-[400px]  mb-20 flex items-center'>
        <div className='w-[100%] overflow-hidden flex items-end xl:max-h-[350px] min-h-[420px] xl:min-h-[350px] bg-[#3944B3]  relative'>
          <img className='hidden xl:inline-block w-[75%]' src={bannerBackground} />
        </div>
        <div className='hidden lg:inline-block absolute z-1 top-0 right-[200px] w-[20%] '>
          <img className='w-[100%] h-[400px]' src={carbanner2} />
        </div>
        <div className='hidden xl:inline-block absolute z-2 top-[65px] right-[350px] w-[20%] opacity-[1]'>
          <img className='w-[70%] h-[340px] object-fill rounded-[400px]  border-[4px] border-[#fff]' src={carbanner1} />
        </div>
        <div className='absolute top-10 xl:ml-[190px] w-full xl:w-[50%] h-[80%] px-5 xl:px-0'>
          <div className='text-[28px] font-semibold text-[#fff] mt-[34px] uppercase'>{ statictext.about ?? 'ABOUT'}</div>
          <div className='w-full lg:w-[60%]  text-[16px] font-normal text-[#fff] mt-3'>
            { (statictext.about_description && stripHtml(statictext.about_description)) ?? 'ABOUT' }
            {/* VIPSER AIRPORT TRASNFERS five-star service provides 24/7 customer care with the help of our dedicated team.<br /><br />
            We aim to provide you with the service of your choice. You can call our staff and they can take care of your bookings and arrangements. */}
          </div>
          <div>
          <div className='w-[190px] px-3 mt-8 xl:mt-4 py-[10px] flex justify-between rounded-lg h-[80%] bg-[#fff] cursor-pointer'>
              <div className='h-[100%] flex items-center text-[#013372] text-[16px]'>{t("EXPLORE_MORE")}</div>
              <div className='h-[100%] pt-[2px] flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.125 10H16.875" stroke="#013372" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke="#013372" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transferbanner