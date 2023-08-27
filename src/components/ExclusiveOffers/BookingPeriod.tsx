import React, { FC , useState } from 'react';
import file from '../../images/file.svg';
import { useSelector } from 'react-redux';
interface BookingPeriodProps {
  bookingperiod?: any;
};



const BookingPeriod: FC<BookingPeriodProps> = ({ bookingperiod }) => {
  const theme = useSelector((state:any)=>state.LightMode.mode);
  const dateIcon = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_7102_26180)">
      <path d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z" stroke={theme=='dark'?'#fff':'#3944B3'} stroke-width="1.6" stroke-miterlimit="10" />
      <path d="M11 6.1875V11H15.8125" stroke={theme=='dark'?'#fff':'#3944B3'} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_7102_26180">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
  return (
    <div className='bg-[#F4F8FF] h-[116px] border-[1px] border-r-[#fff] rounded-[16px] dark:bg-[transparent]'>
      <div className='px-4 bigMd:px-10'>
        <div className='font-normal text-[16px] text-[#0E123D] mt-5 dark:text-white leading-[24px]'>Booking Period</div>
        <div className='flex justify-start mt-2 '>
          <div className='w-full sm:w-auto rounded-lg border border-r-[transparent] bg-[#FFFFFF] dark:bg-[transparent] dark:border-[#fff] flex justify-center items-center bigMd:mr-10 space-x-4 px-3 py-2'>
            <span> {dateIcon} </span>
            <span className='text-sm bigMd:text-base text-[#3944B3] font-normal dark:text-[#fff]'> {new Date(bookingperiod).toDateString() ?? 'Valid Till 30th Sept, 2022'} </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BookingPeriod;