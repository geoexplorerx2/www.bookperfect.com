import React from 'react';
import HeroInputSearch from '../../components/HeroInputSearch/HeroInputSearch';
import NotFound from '../../components/NotFound/NotFound';
import CustomDivider from '../../lib/Divider/CustomDivider';

const MyPurchaseAttempts = () => {
  return (
    <div className="box-border w-full min-h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
      <div className="text-base text-lg text-[#3944B3] font-poppins dark:text-[#fff]">My Purchase Attempts</div>

      <div className='w-full py-12'>
        <span className="text-[12px]  text-base font-poppins dark:text-[#fff]">Search purchase attempts</span>
        <HeroInputSearch searchStyle = "w-full" lengthStyle = "w-full" />
      </div>

      <CustomDivider />
    <NotFound />
    </div> 
  )
}

export default MyPurchaseAttempts